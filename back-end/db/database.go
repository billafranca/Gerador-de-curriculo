package db

import (
	"log"

	"golang.org/x/crypto/bcrypt"

	"backend/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func CreateDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("users.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Erro ao abrir o banco:", err)
	}

	// Cria tabela se não existir
	if err := DB.AutoMigrate(&model.User{}); err != nil {
		log.Fatal("Erro ao migrar o banco:", err)
	}
}

// Cria um usuário no banco já usando UUID e hash da senha
func CreateUser(db *gorm.DB, name, email, senha string) (*model.User, error) {
	// Gerar hash da senha
	hash, err := bcrypt.GenerateFromPassword([]byte(senha), 14)
	if err != nil {
		return nil, err
	}

	usuario := &model.User{
		Nome:  name,
		Email: email,
		Senha: string(hash),
	}

	if err := db.Create(usuario).Error; err != nil {
		return nil, err
	}

	return usuario, nil
}



// Hash da senha
func HashSenha(senha string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(senha), 14)
	return string(bytes), err
}

// Verificar senha
func VerificarSenha(hash, senha string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(senha))
	return err == nil
}