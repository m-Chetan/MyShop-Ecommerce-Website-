import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import connectDB from './config/database.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

const app=express()
app.use(express.json()) 

//For connecting server to database
connectDB()

//Application middlware app.use()
//routes
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

//GET 
app.get('/api/config/paypal', (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use('/api/upload',uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}
else{
    app.get('/', (req,res) => {
        res.send("Api is running")
    });
}

//middleware for not found
app.use(notFound)
//middleware for error
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));