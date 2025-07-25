package handlers

import (
	"net/http"

	"github.com/Shashwatpog/bearcal/backend/db"
	"github.com/gin-gonic/gin"
)

func GetTerms(c *gin.Context) {
	terms, err := db.FetchTerms()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch terms"})
		return
	}

	c.JSON(http.StatusOK, terms)
}
