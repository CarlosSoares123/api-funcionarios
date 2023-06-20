const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'containers-us-west-178.railway.app',
  user: 'root',
  password: 'Fp8Jo49nNb2D3UrWqM99',
  database: 'railway',
  port: 7039,
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('\0' + 'Fp8Jo49nNb2D3UrWqM99')
  }
})

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err)
    return
  }
  console.log('Conexão bem-sucedida ao banco de dados!')
})

app.get('/', (req, res) => {
  res.send({ message: 'Chegaste Carlos' })
})

app.post('/criar', (req, res) => {
  const nome = req.body.nome
  const idade = req.body.idade
  const pais = req.body.pais
  const cargo = req.body.cargo
  const anos = req.body.anos

  db.query(
    'INSERT INTO empregados(nome,idade,pais,cargo,anos) VALUES(?,?,?,?,?)',
    [nome, idade, pais, cargo, anos],
    (err, resultado) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Empregado registrado com sucesso!!!')
      }
    }
  )
})

app.get('/empregados', (req, res) => {
  db.query('SELECT * FROM empregados', (err, resultado) => {
    if (err) {
      console.log(err)
    } else {
      res.send(resultado)
    }
  })
})

app.put('/actualizar', (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const idade = req.body.idade
  const pais = req.body.pais
  const cargo = req.body.cargo
  const anos = req.body.anos

  db.query(
    'UPDATE empregados SET nome=?,idade=?,pais=?,cargo=?,anos=? WHERE id=?',
    [nome, idade, pais, cargo, anos, id],
    (err, resultado) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Empregado actualizado com sucesso!!!')
      }
    }
  )
})

app.delete('/deletar/:id', (req, res) => {
  const id = req.params.id

  db.query('DELETE FROM empregados WHERE id=?', id, (err, resultado) => {
    if (err) {
      console.log(err)
    } else {
      res.send(resultado)
    }
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando (http://localhost:${PORT})`)
})
