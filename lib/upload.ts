import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './uploads/')
  },
  filename: (_req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${Date.now()}.${ext}`)
  },
})

const upload = multer({ storage: multerStorage })


export const cloudinaryImageUploadMethod = async (file: Buffer) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload_stream(file, (_err: any, res: any) => {
      resolve({
        res: res,
      })
    })
  })
}