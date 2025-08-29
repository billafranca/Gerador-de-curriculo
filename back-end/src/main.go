// arquivo para fazer a integração do html com Golang
// e outros

package main

import (
	"net/http"
	"fmt"
	"log"
	"encoding/json"

	"backend/db"
	"backend/model"
)



// Retorno de nome email e senha
// func ReturnInputHtml() *model.UserInputHtml{
// 	return &model.UserInputHtml {
// 		Nome: ,
// 		Email: , 
// 		Senha: ,
// 	}
// }

var PORTA string = ":8080"

func main() {
	db.CreateDB() // Cria o banco de dados
	
	// Passar o caminho do index.html principal
	http.Handle("/", http.FileServer(http.Dir("./projeto_sistema/login")))

	fmt.Println("Servidor rodando em http://localhost:8080")
	log.Fatal(http.ListenAndServe(PORTA, nil)) // -> server mux está como nil
}







