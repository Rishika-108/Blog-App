import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rishikathakur334:Rishi123@cluster0.gqcjm.mongodb.net/Blog-Website')
    console.log("DB Connected")
}