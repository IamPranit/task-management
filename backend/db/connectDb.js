import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DbConnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `Database successfully connected: ${DbConnection.connection.host}`
    );
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
