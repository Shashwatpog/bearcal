package db

import "github.com/Shashwatpog/bearcal/backend/models"

func FetchTerms() ([]models.Term, error) {
	rows, err := DB.Query("SELECT DISTINCT term from courses ORDER BY term DESC")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var terms []models.Term

	for rows.Next() {
		var t models.Term
		if err := rows.Scan(&t.Term); err != nil {
			return nil, err
		}
		terms = append(terms, t)
	}

	return terms, nil
}

func FetchCourseByCRN(term string, crn int) (models.Course, error) {
	var course models.Course
	err := DB.QueryRow(`	
		SELECT crn, subject, class_number, title, section, credits, instructor, campus, time, mode, room, dept, dates
		FROM courses 
		WHERE term = $1 AND crn = $2
	`, term, crn).Scan(
		&course.CRN, &course.Subject, &course.ClassNumber, &course.Title, &course.Section, &course.Credits, &course.Instructor,
		&course.Campus, &course.Time, &course.Mode, &course.Room, &course.Dept, &course.Dates,
	)
	return course, err
}

func FetchCoursesBySubjectAndClass(term string, subject string, classNumber string) ([]models.Course, error) {
	rows, err := DB.Query(`
		SELECT crn, subject, class_number, title, section, credits, instructor, campus, time, mode, room, dept, dates
		FROM courses 
		WHERE term = $1 AND subject = $2 AND class_number = $3
	`, term, subject, classNumber)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var courses []models.Course
	for rows.Next() {
		var c models.Course
		if err := rows.Scan(
			&c.CRN, &c.Subject, &c.ClassNumber, &c.Title, &c.Section, &c.Credits,
			&c.Instructor, &c.Campus, &c.Time, &c.Mode, &c.Room, &c.Dept, &c.Dates,
		); err != nil {
			return nil, err
		}
		courses = append(courses, c)
	}
	return courses, nil
}

func FetchCoursesBySearch(term string, query string) ([]models.Course, error) {
	rows, err := DB.Query(`
		SELECT crn, subject, class_number, title, section, credits, instructor, campus, time, mode, room, dept, dates,
		similarity(title, $2) as score
		FROM courses
		WHERE term = $1
		AND title % $2
		ORDER BY score DESC
		LIMIT 50
	`, term, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var courses []models.Course
	var score float64
	for rows.Next() {
		var c models.Course
		if err := rows.Scan(
			&c.CRN, &c.Subject, &c.ClassNumber, &c.Title, &c.Section, &c.Credits,
			&c.Instructor, &c.Campus, &c.Time, &c.Mode, &c.Room, &c.Dept, &c.Dates,
			&score,
		); err != nil {
			return nil, err
		}
		courses = append(courses, c)
	}

	return courses, nil
}
