package models

type Course struct {
	CRN         int    `json: "crn"`
	Subject     string `json: "subject"`
	ClassNumber string `json: "class_number"`
	Title       string `json: "title"`
	Section     string `json: "section"`
	Credits     string `json: "credits"`
	Instructor  string `json: "instructor"`
	Campus      string `json: "campus"`
	Time        string `json: "time"`
	Mode        string `json: "mode"`
	Room        string `json: "room"`
	Dept        string `json: "dept"`
	Dates       string `json: "dates"`
}
