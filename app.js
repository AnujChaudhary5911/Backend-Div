import express from 'express'
import path from 'path'
import User from './user.js'
import userMid1 from "./userMID"
import find from './userFind.js'

const app=express()
const ab=path.resolve('web')
app.use(express.static(ab))
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.get("/",(req,resp)=>{
    resp.render('home')
})
app.get("/adduser",(req,resp)=>{
    resp.render('add')
})
app.get("/find",(req,resp)=>{
    resp.render('findUser')
})
app.post("/find1",find)
app.post("/addingUser",User)
app.listen(2100)