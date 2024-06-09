import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});



export const cloudinaryImageUploadMethod = async (file: Buffer): Promise<{ success: boolean, url?: string, msg?: string }> => {

  return new Promise((resolve, reject) => {
    let uploader = cloudinary.uploader.upload_stream({ folder: "ist-hub" }, (err, res) => {
      if (!err && res)
        resolve({
          success: true,
          msg: "Successfully uploaded",
          url: res?.url
        })
    })
    streamifier.createReadStream(file).pipe(uploader)
  })

}