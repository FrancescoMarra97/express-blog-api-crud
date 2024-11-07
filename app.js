const express = require('express')
const app = express()
const postsRouter = require('./routes/posts.js')
const notFoundMiddleware = require("./middlewares/notFound.js")
const loggerMiddleware = require('./middlewares/loggerMiddleware')
const PORT = process.env.PORT
const HOST = process.env.HOST

app.use('/posts', loggerMiddleware)
app.use(express.json())
app.use(express.static('public'))
app.use('/posts', (req, res, next) => {
	throw new Error("You broke everything dude! 💥");
  }); 
app.use('/posts', postsRouter)

app.listen(PORT, (req, res) => {
	console.log(`Server is running in ${HOST}:${PORT}`)
})
app.use(notFoundMiddleware)