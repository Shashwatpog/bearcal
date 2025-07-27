package utils

import (
	"strconv"
	"strings"
	"time"

	"github.com/Shashwatpog/bearcal/backend/models"
	ics "github.com/arran4/golang-ical"
)

func GenerateICS(courses []models.Course) *ics.Calendar {
	cal := ics.NewCalendar()
	cal.SetMethod(ics.MethodRequest)

	for _, course := range courses {

		startTime, endTime, days := ParseMeetingTime(course.Time)
		if startTime.IsZero() || endTime.IsZero() || len(days) == 0 {
			continue
		}
		if course.Time == "" || strings.Contains(strings.ToLower(course.Time), "tba") || strings.Contains(strings.ToLower(course.Time), "asynchronous") {
			continue
		}
		if course.Dates == "" || strings.Contains(strings.ToLower(course.Dates), "tba") {
			continue
		}
		startDate, endDate, err := ParseDates(course.Dates)
		if err != nil {
			continue
		}
		firstMeetingDate := AlignStartDateWithDay(startDate, days)
		eventStart := time.Date(firstMeetingDate.Year(), firstMeetingDate.Month(), firstMeetingDate.Day(), startTime.Hour(), startTime.Minute(), 0, 0, time.Local).UTC()
		eventEnd := time.Date(firstMeetingDate.Year(), firstMeetingDate.Month(), firstMeetingDate.Day(), endTime.Hour(), endTime.Minute(), 0, 0, time.Local).UTC()

		until := time.Date(endDate.Year(), endDate.Month(), endDate.Day(), 23, 59, 59, 0, time.UTC).Format("20060102T150405Z")

		crnStr := strconv.Itoa(course.CRN)
		event := cal.AddEvent(crnStr)
		event.SetSummary(course.Title)
		event.SetDescription(course.Instructor + " - " + course.Mode)
		event.SetLocation(course.Room)
		event.SetStartAt(eventStart)
		event.SetDuration(eventEnd.Sub(eventStart))

		rrule := "FREQ=WEEKLY;BYDAY=" + strings.Join(days, ",") + ";UNTIL=" + until
		event.AddRrule(rrule)
	}

	return cal
}

// parse meeting function cuz our db stores start date, end date and days in a single string sad spongebob
// example - "MoWeFr 12:00PM - 12:50PM"

var dayMap = map[string]string{
	"Mo": "MO",
	"Tu": "TU",
	"We": "WE",
	"Th": "TH",
	"Fr": "FR",
}

func ExtractDays(raw string) []string {
	var days []string
	for i := 0; i < len(raw)-1; i += 2 {
		code := raw[i : i+2]
		if val, ok := dayMap[code]; ok {
			days = append(days, val)
		}
	}

	return days
}

func ParseMeetingTime(input string) (time.Time, time.Time, []string) {

	if input == "" {
		return time.Time{}, time.Time{}, nil
	}

	elements := strings.Split(input, " ")
	if len(elements) < 3 {
		return time.Time{}, time.Time{}, nil
	}

	days := ExtractDays(elements[0])
	startStr := elements[1]
	endStr := elements[3]

	layout := "3:04PM"
	startTime, err := time.Parse(layout, startStr)
	if err != nil {
		return time.Time{}, time.Time{}, nil
	}
	endTime, err := time.Parse(layout, endStr)
	if err != nil {
		return time.Time{}, time.Time{}, nil
	}

	base := time.Now()
	start := time.Date(base.Year(), base.Month(), base.Day(), startTime.Hour(), startTime.Minute(), 0, 0, base.Location())
	end := time.Date(base.Year(), base.Month(), base.Day(), endTime.Hour(), endTime.Minute(), 0, 0, base.Location())

	return start, end, days
}

func ParseDates(dateRange string) (time.Time, time.Time, error) {
	elements := strings.Split(dateRange, " - ")
	if len(elements) != 2 {
		return time.Time{}, time.Time{}, nil
	}

	startDate, err := time.Parse("01/02/2006", strings.TrimSpace(elements[0]))
	if err != nil {
		return time.Time{}, time.Time{}, nil
	}

	endDate, err := time.Parse("01/02/2006", strings.TrimSpace(elements[1]))
	if err != nil {
		return time.Time{}, time.Time{}, nil
	}

	return startDate, endDate, nil
}

func AlignStartDateWithDay(startDate time.Time, days []string) time.Time {
	dayMap := map[string]time.Weekday{
		"MO": time.Monday,
		"TU": time.Tuesday,
		"WE": time.Wednesday,
		"TH": time.Thursday,
		"FR": time.Friday,
	}

	for i := 0; i < 7; i++ {
		current := startDate.AddDate(0, 0, i)
		for _, d := range days {
			if current.Weekday() == dayMap[d] {
				return current
			}
		}
	}

	return startDate
}
