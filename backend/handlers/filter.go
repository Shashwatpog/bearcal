package handlers

import (
	"net/http"

	"github.com/Shashwatpog/bearcal/backend/db"
	"github.com/gin-gonic/gin"
)

func GetCoursesBySubjectAndClass(c *gin.Context) {
	term := c.Query("term")
	subject := c.Query("subject")
	classNumber := c.Query("classNumber")

	if term == "" || subject == "" || classNumber == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "term, subject and classNumber are required"})
		return
	}

	courses, err := db.FetchCoursesBySubjectAndClass(term, subject, classNumber)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "course not found"})
		return
	}

	c.JSON(http.StatusOK, courses)
}
