import { ApiRes } from "../utils/apiRes";
import { handler } from "../utils/handler";
import { ApiErr } from "../utils/apiErr";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { cloudinaryConfig } from "../utils/cloudinaryUpload";

export const imageTransformation = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { height, width, public_id } = req.body;
    if (!height || !width || !public_id) 
      return next(new ApiErr(400, "Height and width are required"));
    console.log(req.body);

    const modifiedImage = await cloudinary.v2.image(public_id, {transformation: [
  { width,height },
  {fetch_format: "auto"}
  ]});

  const match = modifiedImage.match(/src=['"]([^'"]+)['"]/);
  const imageUrl = match ? match[1] : "";

  res.status(200).json(ApiRes(200, "File modified successfully", imageUrl ));

  });
