package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Shashwatpog/bearcal/backend/db"
	"github.com/Shashwatpog/bearcal/backend/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("init commit lol")

	err := godotenv.Load()
	if err != nil {
		log.Println(".env file not found")

	}

	db.Connect()

	r := gin.Default()
	routes.SetupRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("PORT not set in environment variables")
	}
	log.Println("Server running on port", port)
	r.Run(":" + port)
}
