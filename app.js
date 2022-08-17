require('dotenv').config()
const router = require('./routes')
const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
// const Controller = require('./controller')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'rahasia', // harus ada // untuk ngamankan session kita
  resave: false, // save jika ada perubahan di session kalo gak ada perubahan gak di save
  saveUninitialized: false,
  cookie: { 
    secure: false,//karena masih proses development          // https
    sameSite:true }  // untuk security dari serangan csrf attack
}))
app.use(router)
// app.use('/',Controller.home)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})