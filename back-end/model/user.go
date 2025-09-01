package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID    string `gorm:"primaryKey;type:char(36)"` // UUID
	Nome  string
	Email string `gorm:"uniqueIndex"` // evita emails duplicados
	Senha string
}

// Gera UUID antes de criar o usuário
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}
