import { v2 as cloudinary } from 'cloudinary';
import Image from 'next/image';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});

export function uploadImage(image) {
  return new Promise((resolve, reject) => {
    
    cloudinary.uploader.upload(
      image.name,
      { width: 400, height: 300, crop: "fill" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
}