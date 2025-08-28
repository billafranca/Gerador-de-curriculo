// Iniciar o servidor web
package db

import (
	"database/sql"

	"backend/model"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"github.com/google/uuid"
)


// passar o input do html para o .db
type InputHTMLToDB struct {
	ID_User string
	Nome string
	Email string
	Senha string
}

func CreateInputHtmlToDB() *InputHTMLToDB{
	return &InputHTMLToDB{
		ID_User: uuid.New().String(),
		Nome: model.UserInputHtml.Nome,
		Email: model.UserInputHtml.Email,
		Senha: model.UserInputHtml.Senha,
	}
}

// ------------------------------ Operações com o DB para admin -----------------------------


