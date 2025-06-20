import { ApiRes } from "../utils/apiRes";
import { handler } from "../utils/handler";
import { ApiErr } from "../utils/apiErr";
import { NextFunction, Request, Response } from "express";
import { Upload } from "../models/uploads.model";

export const getUploadedImages = handler(async(req,res,next)=>{    
    const {page,limit,type} = req.query;
    const imagesData = await Upload.aggregate([
        {$match:{
            type: type || "image",
        }},
        {$sort: {createdAt: -1
        }},
        {$skip: (parseInt(page as string) - 1) * (parseInt(limit as string) || 10)},
        {$limit: parseInt(limit as string) || 10},
    ])

    console.log(imagesData);
    if(!imagesData || imagesData.length === 0){
        return next(new ApiErr(404, "No images found"));
    }

    return res.status(200).json(ApiRes(200, "Images data fetched successfully", imagesData));
    
})