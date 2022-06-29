import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const mongo_uri = process.env.MONGO_URI || "mongodb+srv://admin-chetan:Test123@cluster0.00ggm.mongodb.net/Ecommerce"
        const conn = await mongoose.connect(mongo_uri)
        console.log(`Mongodb connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB