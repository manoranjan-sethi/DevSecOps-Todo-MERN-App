import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv to read from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

console.log("Attempting to connect to MongoDB...");
// Log a masked version of the URI to verify it's being read
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("FAILURE: MONGO_URI is not defined in .env");
  process.exit(1);
}
console.log(`URI starts with: ${uri.substring(0, 15)}...`);

// Set connection timeout to 10 seconds
const options = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("SUCCESS: Connected to MongoDB Atlas!");
    // Optional: List collections to verify read access
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log("Available collections:");
    collections.forEach(collection => console.log(` - ${collection.name}`));
    console.log("Connection verified with read access.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("FAILURE: Could not connect to MongoDB.");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    if (err.cause) console.error("Error cause:", err.cause);
    process.exit(1);
  });
