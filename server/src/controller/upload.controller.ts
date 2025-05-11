import { Uploads } from "../models/uploads.model";
import { ApiErr } from "../utils/apiErr"
import { ApiRes } from "../utils/apiRes"
import { cloudinaryUpload } from "../utils/cloudinaryUpload";
import { handler } from "../utils/handler"

export const uploadImage = handler(async (req, res, next)=>{
    const file = req.file;
    const {title, description} = req.body;
    if(!file){
        return next(new ApiErr(400, "Please upload a file"));
    }
    if(!title || !description){
        return next(new ApiErr(400, "Please provide title and description"));
    }    
    const uploadingToCloudinary = await cloudinaryUpload(file.path, 'image');
    console.log("uploadingToCloudinary : ",uploadingToCloudinary);
    if(!uploadingToCloudinary){
        return next(new ApiErr(500, "Error uploading to cloudinary"));
    }

    const newFile = await Uploads.create({
        title,
        description,
        fileURL: uploadingToCloudinary.secure_url,
        type:"image"
    })

    if(!newFile){
        return next(new ApiErr(400,"Error while creating new record"));
    }

    return res.status(200).json("yeat");
}) 

export const uploadVideo = handler(async (req, res, next)=>{
    const file = req.file;
    const {title, description} = req.body;
    if(!file){
        return next(new ApiErr(400, "Please upload a file"));
    }
    if(!title || !description){
        return next(new ApiErr(400, "Please provide title and description"));
    }    
    const uploadingToCloudinary = await cloudinaryUpload(file.path, 'video');
    console.log("uploadingToCloudinary : ",uploadingToCloudinary);
    if(!uploadingToCloudinary){
        return next(new ApiErr(500, "Error uploading to cloudinary"));
    }

    const newFile = await Uploads.create({
        title,
        description,
        fileURL: uploadingToCloudinary.secure_url,
        type:"video"
    })

    if(!newFile){
        return next(new ApiErr(400,"Error while creating new record"));
    }

    return res.status(200).json("yeat");
}) 