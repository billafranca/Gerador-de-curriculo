package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// model para pegar os valores do input no html
type User struct {
	ID string `gorm:"type:uuid;primarykey" json:"id"`
	Nome string `joson:"nome"`
	Email string `json:"email"`
	Senha string `json:"senha"`
}

// hook do GORM para gera o uuid antes de criar a struct
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String() // gerar o uuid
	return
}
/*
No GORM você pode definir métodos especiais (BeforeCreate, AfterCreate,
BeforeSave, etc.) que são executados automaticamente em 
determinados momentos do ciclo de vida do objeto.
*/
