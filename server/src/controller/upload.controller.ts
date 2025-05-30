import mongoose from "mongoose";
import { Upload } from "../models/uploads.model";
import { ApiErr } from "../utils/apiErr"
import { ApiRes } from "../utils/apiRes"
import { cloudinaryUpload } from "../utils/cloudinaryUpload";
import { handler } from "../utils/handler"

interface SaveOptionsWithEditor extends mongoose.SaveOptions {
  editor?: any;
}

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

    const newFile = new Upload({
        title,
        description,
        fileURL: uploadingToCloudinary.secure_url,
        type:"image"
    })

    await newFile.save({editor:req.user} as SaveOptionsWithEditor);

    if(!newFile){
        return next(new ApiErr(400,"Error while creating new record"));
    }

    return res.status(200).json(ApiRes(200, "File uploaded successfully", {localUpload:newFile,cloudinaryUpload:uploadingToCloudinary}));
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

    const newFile = new Upload({
        title,
        description,
        fileURL: uploadingToCloudinary.secure_url,
        type:"video"
    });

    await newFile.save({editor:req.user._id} as any);

    if(!newFile){
        return next(new ApiErr(400,"Error while creating new record"));
    }

    return res.status(200).json("yeat");
}) 