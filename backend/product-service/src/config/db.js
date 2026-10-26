const moongose = require('mongoose');

const connectDB = async () => {
    try {
        await moongose.connect(process.env.MONGO_URI);
        console.log(`Product service connected to MongoDB`);
    } catch (error) {
        console.error(`Error connecting to MongoDb: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;