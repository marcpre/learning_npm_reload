const express = require('express')
const path = require('path')
const reload = require('reload')
const bodyParser = require('body-parser')
const logger = require('morgan')

const app = express()

const publicDir = path.join(__dirname, '/views')

app.use(express.static(path.join(__dirname, '/../node_modules'))) // public folder!
app.use(logger(process.env.LOG_ENV))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

// Servier
const port = process.env.APP_PORT || 8080
const host = process.env.APP_HOST || 'localhost'

// Reload code here
reload(app)

app.listen(port, () => {
  console.log(`Listening on ${host}:${port}`)
})

module.exports = app
