import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'

import AuthRoute from './routes/Auth.js'

const app=express()
dotenv.config()

const port = process.env.PORT || 8000

//middlewares
app.use(express.json()) 
app.use(cors())

app.use('/',AuthRoute)


//errorHandling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});


app.listen(port,()=>{
    connectDB()
    console.log(`Server started on port:${port}`)
})