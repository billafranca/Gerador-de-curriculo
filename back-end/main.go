// arquivo para fazer a integração do html com Golang
// e outros

package main

// "backend/model"
// "encoding/json"
import (
	"net/http"
	"fmt"
	"log"

	"backend/db"
)



// Retorno de nome email e senha
// func ReturnInputHtml() *model.UserInputHtml{
// 	return &model.UserInputHtml {
// 		Nome: ,
// 		Email: , 
// 		Senha: ,
// 	}
// }

var PORTA string = ":8000"

func main() {
	db.CreateDB() // Cria o banco de dados

	// fileServer := http.FileServer(http.Dir("../projeto_sistema/front-end/login"))
	// Passar o caminho do index.html principal
	// http.Handle("/login/", http.StripPrefix("/login/",fileServer))

	// /static/ -> é um prefixo da rota que você configura no Go para servir arquivos static 

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "../projeto_sistema/front-end/login/loginOne.html")
	})

	fmt.Println("Servidor rodando em http://localhost:8000")
	log.Fatal(http.ListenAndServe(PORTA, nil)) // -> server mux está como nil
	// NÃO MEXE QUE TA RODANDO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}







