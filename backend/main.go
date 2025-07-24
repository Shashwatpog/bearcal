package main

import (
	"fmt"
	"log"

	"github.com/Shashwatpog/bearcal/backend/db"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("init commit lol")

	err := godotenv.Load()
	if err != nil {
		log.Println(".env file not found")

	}

	db.Connnect()
}
