const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const router = require('./router')

const app = express()
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'build')))

router.router(app)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080, () => {
    console.log('Film Score API listening on port 8080')
})