import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import noteRoutes from './routes/note.route.js'
import cors from 'cors'


dotenv.config()
const app = express()
const port = process.env.PORT || 4002

//database connection code
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database')
    })
    .catch((error) => {
        console.log('error connecting to database:', error.message)
        console.log('Please check your MONGO_URL in .env file')
    })
   
//middleware
app.use(express.json())
app.use(cors())
app.use('/api/v1/notes', noteRoutes)

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
