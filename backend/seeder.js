import mongoose from "mongoose"
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'
import connectDB from './config/database.js'
import products from './data/products.js' 
import users from './data/users.js'
import dotenv from "dotenv"
 
dotenv.config()
await connectDB()

const importData = async () => {
    try{
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)

        const admin = createdUsers[0]._id

        const sampleProducts=products.map( product => {
            return {...product,user:admin}
        })
        await Product.insertMany(sampleProducts)
        console.log("Data imported");
        process.exit()
    }
    catch (error){
        console.log(`${error.message}`);
        process.exit(1)
    }

}

const deleteData = async () => {
    try{
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()
        console.log("Data deleted");
        process.exit()
    }
    catch(error){
        console.log(`${error.message}`);
        process.exit(1)
    }

}

if(process.argv[2] === "-d"){
    deleteData()
}
else{
    importData()
}