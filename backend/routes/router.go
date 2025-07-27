package routes

import (
	"github.com/Shashwatpog/bearcal/backend/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/test", Test)
		api.GET("/terms", handlers.GetTerms)
		api.GET("/course", handlers.GetCourseByCRN)
		api.GET("/filter", handlers.GetCoursesBySubjectAndClass)
		api.GET("/search", handlers.GetCoursesBySearch)
		api.POST("/generate", handlers.GenerateICSFile)
	}
}

// handler to test
func Test(c *gin.Context) {
	c.JSON(200, gin.H{"message": "test works"})
}
