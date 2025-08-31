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

	// Servir estáticos (css, js, imagens etc.)
	fs := http.FileServer(http.Dir("../projeto/front-end/page_login"))
	http.Handle("/page_login/", http.StripPrefix("/page_login/", fs))

	// Página inicial
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "../projeto/front-end/page_login/loginOne.html")
	})

	// Rota para processar o formulário
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			// Process form data
			r.ParseForm()
			nome := r.FormValue("nome")
			email := r.FormValue("email")
			senha := r.FormValue("senha")

			// Aqui você pode fazer o que quiser com os dados, como salvá-los no banco de dados
			fmt.Fprintf(w, "Nome: %s\nEmail: %s\nSenha: %s\n", nome, email, senha)
		} else {
			http.ServeFile(w, r, "../projeto/front-end/page_login/loginOne.html")
		}
	})

	// fs2 := http.FileServer(http.Dir("../projeto_sistema/front-end/page_explicativa/index.html"))
	// http.Handle("/page_explicativa/", http.StripPrefix("/page_explicativa/", fs2))



	fmt.Println("Servidor rodando em http://localhost:8000")
	log.Fatal(http.ListenAndServe(PORTA, nil)) // -> server mux está como nil
	// NÃO MEXE QUE TA RODANDO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}







