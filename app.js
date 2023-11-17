const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const port = 3000

app.use(express.static('public'))

app.set('views', './src/views/partials')
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({extended :true}))

const newsRouter = require('./src/routes/news')
app.use('/', newsRouter)
app.use('/article', newsRouter)

app.listen(port,()=>{
    console.log(`listning on port ${port}`)
})