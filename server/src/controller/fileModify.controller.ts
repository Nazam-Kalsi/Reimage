import { ApiRes } from "../utils/apiRes";
import { handler } from "../utils/handler";
import { ApiErr } from "../utils/apiErr";
import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { cloudinaryConfig, cloudinaryUpload } from "../utils/cloudinaryUpload";

export const imageTransformation = handler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { height, width, public_id, radius, filter } = req.body;
    if (!public_id) return next(new ApiErr(400, "public id is required."));
    let transformation: any = [{ fetch_format: "auto" }, { quality: "auto" }];
    if (height && width) transformation.push({ width, height });
    if (filter) transformation.push({ effect: filter });
    if (radius) {
      radius == "full"
        ? transformation.push({ radius })
        : transformation.push({ radius: Number(radius) });
    }
    console.log(transformation);

    const modifiedImage = await cloudinary.v2.image(public_id, {
      transformation,
    });
    console.log(modifiedImage);

    const match = modifiedImage.match(/src=['"]([^'"]+)['"]/);
    const imageUrl = match ? match[1] : "";

    res.status(200).json(ApiRes(200, "File modified successfully", imageUrl));
  }
);
type pairT = {
  [key: string]: string | boolean | number;
};

type videoTransformataT = {
  publicId: string;
  [key: string]: string | boolean | number;
};

export const videoTransformation = handler(async (req, res, next) => {
  const data: videoTransformataT = req.body;
  if (!data.publicId)
    return next(new ApiErr(400, "PLease provide Public ID of your video file"));
  let transformation: pairT[] = [];

  const sizeObj: pairT = {};
  if (data.height) sizeObj.height = Number(data.height);
  if (data.width) sizeObj.width = Number(data.width);
  if (data.resize) {
    if (data.resize == "Pad" || data.resize == "Limit Pad") {
      const background = (data.backGround as string).toUpperCase();
      sizeObj.background = background;
    }
    sizeObj.crop = (data.resize as String).toLowerCase();
  } else sizeObj.crop = "scale";
  if (Object.keys(sizeObj).length) transformation.push(sizeObj);

  const trimObj: pairT = {};
  if (data.startOffset) trimObj.start_offset = data.startOffset;
  if (data.startOffset) trimObj.end_offset = data.endOffset;
  if (Object.keys(trimObj).length) transformation.push(trimObj);

  if (data.rotate) {
    if (
      (data.rotate as string).startsWith("h") ||
      (data.rotate as string).startsWith("v")
    ) {
      transformation.push({ angle: data.rotate });
    } else transformation.push({ angle: Number(data.rotate) });
  }

  if (data.borderSize)
    transformation.push({
      border: `${Number(data.borderSize)}px_solid_rgb:${(
        data.borderColor as string
      )
        .slice(1)
        .toUpperCase()}`,
    });

  if (data.saturation)
    transformation.push({ effect: `saturation:${data.saturation}` });
  if (data.contrast)
    transformation.push({ effect: `contrast:${data.contrast}` });
  if (data.brightness)
    transformation.push({ effect: `brightness:${data.brightness}` });
  if (data.gamma) transformation.push({ effect: `gamma:${data.gamma}` });
  if (data.borderRadius)
    transformation.push({ radius: Number(data.borderRadius) });

  if (data.blur) transformation.push({ effect: `blur:${data.blur}` });
  if (data.vignette)
    transformation.push({ effect: `vignette:${data.vignette}` });
  if (data.speed) transformation.push({ effect: `accelerate:${data.speed}` });
  if (data.reverse) transformation.push({ effect: `reverse` });
  if (data.boomerang) transformation.push({ effect: "boomerang" });
  if (data.noise) transformation.push({ effect: `noise:${data.noise}` });
  if (data.fadeIn) transformation.push({ effect: `fade:${data.fadeIn}` });
  if (data.fadeOut) transformation.push({ effect: `fade:-${data.fadeout}` });

  console.log(transformation);

  const modifiedVideo = await cloudinary.v2.url(data.publicId, {
    resource_type: "video",
    transformation,
  });

  console.log("modifiedVideo", modifiedVideo);

  return res
    .status(200)
    .json(ApiRes(200, "Video modified successfully.", modifiedVideo));
  return res.status(200).json(ApiRes(200, "Video modified successfully."));
});

export const removeBg = handler(async (req, res, next) => {
  const file = req.file;
  if (!file) return next(new ApiErr(400, "Please upload a file."));

  const uploadToCloudinary = await cloudinaryUpload(file.path, 'image');
  if (!uploadToCloudinary)
    return next(new ApiErr(500, "Error uploading to cloudinary."));

  const removeBg = await cloudinary.v2.url(uploadToCloudinary.public_id,{effect: "background_removal:fineedges_y"})
  console.log(removeBg);

  return res.status(200).json(ApiRes(200, "Background removed successfully.", removeBg));




})
