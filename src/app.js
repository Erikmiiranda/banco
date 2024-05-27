import express from 'express'
import conexao from '../infra/conexao.js'

const app = express()

//indicar para o express ler o body com json
app.use(express.json())


//ROTAS
app.get('/usuario',(req,res) => {
    const sql = "SELECT  * FROM usuario;"
    conexao.query(sql, (erro,resultado) => {
        if(erro) {
            console.log(erro)
            res.status(404).json({'erro': erro})
        } else {
            res.status(200).json(resultado)
        }

    })
})
app.get('/usuario/:id',(req, res) => {  
    const id = req.params.id
    const sql = "SELECT * FROM usuario WHERE id=?;"
    conexao.query(sql, id, (erro, resultado) => {
        const linha = resultado[0]
        if(erro) {
            res.status(404).json({ 'erro': erro})
        } else {
            res.status(200).json(linha)
        }
    })
})

    
app.post('/usuario', (req, res) => {
    const usuario = req.body
    const sql = "INSERT INTO usuario SET ?"
    conexao.query(sql, usuario, (erro, resultado) => {
        if(erro) {
            res.status(404).json({ 'erro': erro})
        } else {
            res.status(201).json(resultado)
        }
    })
})

app.delete('/usuario/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM usuario WHERE id=?;"
    conexao.query(sql, id, (erro, resultado) => {
        const linha = resultado[0]
        if(erro) {
            res.status(404).json({ 'erro': erro})
        } else {
            res.status(200).json(linha)
        }
    })
})


app.put('/usuario/:id', (req, res) => {
    const id = req.params.id
    const usuario = req.body
    const sql = "UPDATE usuario SET ? WHERE id=?;"
    conexao.query(sql, [usuario, id], (erro, resultado) => {
        if(erro) {
            res.status(404).json({ 'erro': erro})
        } else {
            res.status(200).json(resultado)
        }
    })
})

export default app