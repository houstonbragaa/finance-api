import express from 'express'

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${3001}`)
})
