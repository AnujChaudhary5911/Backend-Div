import express from 'express'
import path from 'path'
import {loginExist, Registor,delete1,update,findU} from './employ.js'
const app=express()
const ab=path.resolve('dev')
app.use(express.static(ab))
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.get("/",(req,resp)=>{
    resp.render("login")
})
app.get("/register",(req,resp)=>{
    resp.render('add1')
})
app.get("/home",(req,resp)=>{
    resp.render('home')
})
app.get("/delete",(req,resp)=>{
    resp.render('delete')
})
app.get("/update1",(req,resp)=>{
    resp.render('update')
})
app.get("/find",(req,resp)=>{
    resp.render('findShow')
})
app.post("/find1",findU)
app.post("/update",update)
app.delete("/deleteE1",delete1);
app.post("/login1",loginExist);
app.post("/add-employee",Registor);

app.listen(3100);
