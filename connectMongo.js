
const mongoose = require('mongoose');

const connectDB = async () => {
try{
   // await mongoose.connect('mongodb://localhost:27017/node_mongodb')
    
   await mongoose.connect('mongodb://0.0.0.0:27017/node_mongodb')
   console.log("connect ")
}
catch (error){
    console.log("connect fail");
}

}

module.exports = connectDB