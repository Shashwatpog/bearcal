package routes

import "github.com/gin-gonic/gin"

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/test", Test)
	}
}

// handler to test
func Test(c *gin.Context) {
	c.JSON(200, gin.H{"message": "test works"})
}
