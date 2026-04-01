const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lmsystem');
        console.log("MongoDb is Connected");
    } catch (error) {
        console.error("Error",error);
       
    }
};

module.exports = connectDB;
