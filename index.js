const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const snippitController = require('./controllers/snippits')
const authController = require('./controllers/authorization')

const app = express()

// Middleware
app.use(express.json())
app.use(
  cors({
    // TODO: Change to only allow frontend app
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)

// Routes
app.get('/snippits', snippitController.getAllSnippits)
app.get('/snippits/:snippitId', snippitController.getOneSnippit)
app.post('/snippits', snippitController.createSnippit)
app.patch('/snippits/:snippitId', snippitController.updateSnippit)
app.delete('/snippits/:snippitId', snippitController.deleteSnippit)

app.post('/register', authController.register)
app.post('/login', authController.login)

// API establishment and Database connection
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT)
  })
  .catch((error) => {
    console.log(new Error(error))
  })
