package db

import (
	"log"

	"backend/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Cria ou conecta com o .db
func CreateDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("users.db"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	// AutoMigrate cria a tabela se ela não existir
	DB.AutoMigrate(&model.User{})
}