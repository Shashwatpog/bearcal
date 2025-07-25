package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	var err error
	DB, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error connecting to DB", err)
	}
	if err = DB.Ping(); err != nil {
		log.Fatal("Error pinging DB", err)
	}
	log.Println("Connected to supabase DB")
}
