import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
	// console.log("Mongo URI:", process.env.MONGO_DB_URI);
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
