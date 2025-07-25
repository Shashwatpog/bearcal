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
