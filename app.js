import express from 'express'
import dotenv from 'dotenv'
import Apirouter from './router/movieRouter.js'

dotenv.config()

const app = express()
const PORT = 4000

app.use(express.json())

// Use the movies routes
app.use('/api/v1/movies', Apirouter)
app.get('', (req,res)=>{
    res.send("Welcome to the Movie API Server <br><br> /api/v1/movies <br> /api/v1/movies/add <br> /api/v1/movies/search <br> /api/v1/movies/filter <br> /api/v1/movies/language <br> /api/v1/movies/delete/:id <br> /api/v1/movies/get/:id <br> /api/v1/movies/update/:id");

})

app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`)
})