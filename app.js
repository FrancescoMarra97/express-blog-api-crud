const express = require('express')
const app = express()
const postsRouter = require('./routes/posts.js')
const notFoundMiddleware = require("./middlewares/notFound.js")
const PORT = process.env.PORT
const HOST = process.env.HOST

app.use(express.json())
app.use(express.static('public'))

app.use('/posts', postsRouter)

app.listen(PORT, (req, res) => {
	console.log(`Server is running in ${HOST}:${PORT}`)
})
app.use(notFoundMiddleware)