import mongoose from "mongoose";

const uri = process.env.uri;

const connectDB = async () => {
    await mongoose.connect(uri);
}

const database = mongoose.connection;
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id
    }
})

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('database connected');
})

export default connectDB;