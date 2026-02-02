import express from 'express'
import movie from './movie.js'
import movieU from './movieU.js'
import booking from './booking.js'
const app=express()
app.use(express.json())
app.post("/movie",movie)
app.post('/user',movieU)
app.post('/book',booking)
app.listen(8000)