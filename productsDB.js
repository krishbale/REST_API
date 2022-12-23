require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/schema');
const productjson = require('./products.json');
const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        await Product.deleteMany();
        await Product.create(productjson);
        console.log('success')
    }catch(e){
        console.log(e);
    }

}

start();
