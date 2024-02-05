import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: any
    promise: any
  };
}

global.mongoose = {
  conn: null,
  promise: null,
};

const connectDB = async () => {
  try {
    if (global.mongoose && global.mongoose.conn) {
      console.log(`MongoDB Connected: ${global.mongoose.conn.host}`);
    } else {
      const connection = await mongoose.connect(process.env.MONGO_URI!);
      global.mongoose = {
        conn: connection,
        promise: connection
      };
    }
  } catch (error: any) {
    console.log(`Error Message: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
