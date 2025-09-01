package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/db"
)

var PORTA string = ":8000"

func main() {
	// Inicializa o banco
	db.CreateDB()

	mux := http.NewServeMux()

	// Serve arquivos estáticos (CSS, JS, imagens)
	fs := http.FileServer(http.Dir("../projeto/front-end/page_login"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// Rota de login/cadastro
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			// Processa formulário
			if err := r.ParseForm(); err != nil {
				http.Error(w, "Erro ao processar formulário", http.StatusBadRequest)
				return
			}

			nome := r.FormValue("nome")
			email := r.FormValue("email")
			senha := r.FormValue("senha")

			// Cria usuário no banco
			user, err := db.CreateUser(db.DB, nome, email, senha)
			if err != nil {
				http.Error(w, fmt.Sprintf("Erro ao criar usuário: %v", err), http.StatusInternalServerError)
				return
			}

			// Resposta enviada ao navegador
			fmt.Fprintf(w, `<h2>Usuário criado com sucesso!</h2>
				<p>ID: %s<br>Nome: %s<br>Email: %s</p>
				<a href="/login">Voltar</a>`, user.ID, user.Nome, user.Email)
			return
		}

		// Serve apenas o HTML específico
		http.ServeFile(w, r, "../projeto/front-end/page_login/loginOne.html")
	})

	// Redireciona a raiz para /login
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
	})

	fmt.Println("Servidor rodando em http://localhost" + PORTA)
	if err := http.ListenAndServe(PORTA, mux); err != nil {
		log.Fatal(err)
	}
}
