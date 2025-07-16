
import mongoose from 'mongoose';

const ATLAS_URI = process.env.ATLAS_URI;

// Gracefully handle missing ATLAS_URI
if (!ATLAS_URI) {
  console.warn(
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n" +
    "!!! ATLAS_URI environment variable is not defined. !!!\n" +
    "!!! The application will run without database      !!!\n" +
    "!!! functionality. Please create a .env.local file !!!\n" +
    "!!! and add your MongoDB connection string.        !!!\n" +
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // If URI is not provided, don't attempt to connect
  if (!ATLAS_URI) {
    return null;
  }
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(ATLAS_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
