package handlers

import (
	"net/http"

	"github.com/Shashwatpog/bearcal/backend/db"
	"github.com/gin-gonic/gin"
)

func GetCoursesBySearch(c *gin.Context) {
	term := c.Query("term")
	query := c.Query("query")

	if term == "" || query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "term and search query are required"})
		return
	}

	courses, err := db.FetchCoursesBySearch(term, query)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "no matching courses found"})
		return
	}

	c.JSON(http.StatusOK, courses)
}
