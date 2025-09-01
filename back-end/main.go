// arquivo para fazer a integração do html com Golang
// e outros

package main

import (
    "fmt"
    "log"
    "net/http"

    "backend/db"
)

var PORTA string = ":8000"

func main() {
    db.CreateDB() // Cria o banco de dados

    mux := http.NewServeMux() // Cria um novo ServeMux

    // Servir estáticos (css, js, imagens etc.)
    fs := http.FileServer(http.Dir("../projeto/front-end/page_login"))
    mux.Handle("/login/", http.StripPrefix("/login/", fs))

    // Página inicial redireciona para /login
    mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "../projeto/front-end/page_login/index.html")
    })

    // // Rota para processar o formulário e servir a página de login
    // mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
    //     if r.Method == http.MethodPost {
    //         // Process form data
    //         r.ParseForm()
    //         nome := r.FormValue("nome")
    //         email := r.FormValue("email")
    //         senha := r.FormValue("senha")

    //         // Aqui você pode fazer o que quiser com os dados, como salvá-los no banco de dados
    //         fmt.Fprintf(w, "Nome: %s\nEmail: %s\nSenha: %s\n", nome, email, senha)
    //     } else {
    //         http.ServeFile(w, r, "../projeto/front-end/page_login/loginOne.html")
    //     }
    // })

    fmt.Println("Servidor rodando em http://localhost:8000")
    err := http.ListenAndServe(PORTA, mux) // Passa o ServeMux como argumento
    if err != nil {
        log.Fatal(err)
    }
}