import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		console.log(process.env.MONGO_URI);
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
