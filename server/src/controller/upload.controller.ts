import { ApiErr } from "../utils/apiErr"
import { ApiRes } from "../utils/apiRes"
import { handler } from "../utils/handler"

export const uploadImage = handler(async (req, res, next)=>{
    const file = req.file;
    const data = req.body;
    console.log("file and data: ",file, data);

    

    return res.status(200).json("yeat");
}) 

export const uploadVideo = handler(async (req, res, next)=>{
    return res.status(200).json("yeat");
}) 