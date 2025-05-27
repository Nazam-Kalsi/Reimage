import { ApiRes } from "../utils/apiRes";
import { handler } from "../utils/handler";
import { ApiErr } from "../utils/apiErr";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { cloudinaryConfig } from "../utils/cloudinaryUpload";

export const imageTransformation = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { height, width, public_id, radius, filter } = req.body;
    if(!public_id)
      return next(new ApiErr(400, "public id is required."));
    let transformation:any = [
      {fetch_format: "auto"},
      {quality: "auto"}
      ]
    if (height && width ) transformation.push({ width, height });    
    if(filter) transformation.push({effect:filter});
    if(radius) transformation.push({ radius});
    console.log(transformation)
    
    const modifiedImage = await cloudinary.v2.image(public_id, {transformation});
    console.log(modifiedImage);

  const match = modifiedImage.match(/src=['"]([^'"]+)['"]/);
  const imageUrl = match ? match[1] : "";

  res.status(200).json(ApiRes(200, "File modified successfully", imageUrl ));

  });
