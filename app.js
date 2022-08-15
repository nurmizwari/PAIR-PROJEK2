const router = require('./routes')
const express = require('express')
const app = express()
const port = 3000
// const Controller = require('./controller')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(router)
// app.use('/',Controller.home)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})