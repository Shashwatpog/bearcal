package handlers

import (
	"net/http"

	"github.com/Shashwatpog/bearcal/backend/db"
	"github.com/Shashwatpog/bearcal/backend/models"
	"github.com/Shashwatpog/bearcal/backend/utils"
	"github.com/gin-gonic/gin"
)

func GenerateICSFile(c *gin.Context) {
	var req models.GenerateRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	var courses []models.Course

	for _, crn := range req.CRNs {
		course, err := db.FetchCourseByCRN(req.Term, crn)
		if err == nil {
			courses = append(courses, course)
		}
	}

	cal := utils.GenerateICS(courses)
	c.Header("Content-Disposition", "attachment; filename=calendar.ics")
	c.Header("Content-Type", "text/calendar")
	c.String(http.StatusOK, cal.Serialize())
}
