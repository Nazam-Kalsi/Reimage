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
    if(radius) {
      radius=='full'? transformation.push({ radius}):transformation.push({ radius:Number(radius)})
    }
    console.log(transformation)
    
    const modifiedImage = await cloudinary.v2.image(public_id, {transformation});
    console.log(modifiedImage);

  const match = modifiedImage.match(/src=['"]([^'"]+)['"]/);
  const imageUrl = match ? match[1] : "";

  res.status(200).json(ApiRes(200, "File modified successfully", imageUrl ));

  });

  type videoTransformataT = {
    publicId:string,
    [key:string] : string | boolean | number,
  }
export const videoTransformation = handler(async (req,res,next)=>{
  const data:videoTransformataT =req.body;
  if(!data.publicId)return next(new ApiErr(400,"PLease provide Public ID of your video file"))
  let transformation: { [key: string]: string | number | boolean }[] = [];

        // height:null,
        // width:null,
        // backGround:null,
        // startOffset:null,
        // endOffset:null,
        // boomarang:null,

        
        if(data.backGround) {
          const background = (data.backGround as string).slice(1).toUpperCase(); 
          transformation.push({ background:"chocolate" });
        }          
        if(data.height) transformation.push({ height: Number(data.height) });
        if(data.width) transformation.push({ width: Number(data.width) });
        if((data.width || data.height)) transformation.push({ crop: "pad" });
        if(data.startOffset) transformation.push({ start_offset: data.startOffset });
        if(data.endOffset) transformation.push({ end_offset: data.endOffset });
        if(data.boomerang) transformation.push({ effect: 'boomerang' });



console.log(transformation);

const modifiedVideo = await cloudinary.v2.url(data.publicId,
  {resource_type: "video",
  transformation
})

console.log('modifiedVideo',modifiedVideo)

return res.status(200).json(ApiRes(200,"Video modified successfully.",modifiedVideo));
}  
)

