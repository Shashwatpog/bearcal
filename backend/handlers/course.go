package handlers

import (
	"net/http"
	"strconv"

	"github.com/Shashwatpog/bearcal/backend/db"
	"github.com/gin-gonic/gin"
)

func GetCourseByCRN(c *gin.Context) {
	term := c.Query("term")
	crnStr := c.Query("crn")
	if term == "" || crnStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "term and crn are required"})
		return
	}
	crn, err := strconv.Atoi(crnStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "crn must be an int"})
		return
	}
	course, err := db.FetchCourseByCRN(term, crn)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "course not found"})
		return
	}
	c.JSON(http.StatusOK, course)
}
