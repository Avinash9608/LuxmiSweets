
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
};

if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    console.error("Cloudinary configuration is missing. Make sure CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set in your .env.local file.");
} else {
    cloudinary.config(cloudinaryConfig);
}

export default cloudinary;
