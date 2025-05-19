import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageUploadSchema } from "@/schema/imageUploadSchema";
import { z } from "zod";
import { Input, Selector } from "@/components/customComponents";
import { apiHandler } from "@/lib/apiHandler";

type Props = {};

type ImageData = {
  publicId: string;
  [key: string]: string;
};

const socialMediaImageFormats = {
  instagram: {
    post: {
      size: "1080x1080",
      aspectRatio: "1:1",
      formats: ["JPEG", "PNG"],
    },
    story: {
      size: "1080x1920",
      aspectRatio: "9:16",
      formats: ["JPEG", "PNG"],
    },
    reelCover: {
      size: "1080x1920",
      aspectRatio: "9:16",
      formats: ["JPEG"],
    },
  },
  facebook: {
    post: {
      size: "1200x630",
      aspectRatio: "1.91:1",
      formats: ["JPEG", "PNG"],
    },
    story: {
      size: "1080x1920",
      aspectRatio: "9:16",
      formats: ["JPEG", "PNG"],
    },
    coverPhoto: {
      size: "820x312",
      aspectRatio: "2.63:1",
      formats: ["JPEG", "PNG"],
    },
  },
  youtube: {
    thumbnail: {
      size: "1280x720",
      aspectRatio: "16:9",
      formats: ["JPEG", "PNG"],
    },
    channelArt: {
      size: "2560x1440",
      safeArea: "1546x423 center",
      aspectRatio: "16:9",
      formats: ["JPEG", "PNG"],
    },
  },
  twitter: {
    post: {
      size: "1200x675",
      aspectRatio: "16:9",
      formats: ["JPEG", "PNG"],
    },
    profileBanner: {
      size: "1500x500",
      aspectRatio: "3:1",
      formats: ["JPEG", "PNG"],
    },
  },
  linkedin: {
    post: {
      size: "1200x627",
      aspectRatio: "1.91:1",
      formats: ["JPEG", "PNG"],
    },
    banner: {
      size: "1584x396",
      aspectRatio: "4:1",
      formats: ["JPEG", "PNG"],
    },
  },
};

function ImageUpload({}: Props) {
  const [imageData, setImageData] = useState<ImageData | undefined>(undefined);
  const [modifiedImage, setModifiedImage] = useState<{url:string,height:number,width:number}>({
    url:"",
    height:0,
    width:0
  });


  const [format, setFormat] = useState<string>("");
  const fileUrl =
    "https://res.cloudinary.com/nzm/image/upload/v1747550492/reimage/ylnronkfievmjafc1sev.jpg";
  const public_url = "reimage/cdpe9pulwrnjxqfas2oo";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof imageUploadSchema>>({
    defaultValues: {
      file: undefined,
      title: "test",
      description: "testDescription",
    },
    resolver: zodResolver(imageUploadSchema),
  });

  const submit = async (data: z.infer<typeof imageUploadSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    const res = await apiHandler("/api/upload/upload-image", "post", {
      data: formData,
    });
    if (!res.success) {
      console.log(res.message);
      return;
    }
    console.log(res);
    if (!res.res) return;
    setImageData(res.res.data.data);
  };

  useEffect(() => {
    (async () => {
      if (!format) return;
      console.log(format);

      const heightWidth = format.split("-")[2];
      const height = Number(heightWidth.split("x")[1]);
      const width = Number(heightWidth.split("x")[0]);
      setModifiedImage((prev)=>{return {...prev,height:height,width:width}});

      console.log(height, width);

      const res = await apiHandler("/api/modify/image-transformation", "post", {
        data: { height, width, public_url },
      });

      if (!res.success) {
        console.log(res.message);
        return;
      }

      console.log(res);
      setModifiedImage((prev)=>{return {...prev,url:res.res?.data.data}});
    })();
  }, [format]);
  return (
    <>
    <div className="w-1/2 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4 ">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4  border p-4 rounded-lg"
        >
          <Input
            type="file"
            label="Upload image"
            error={errors.file?.message as string}
            {...register("file")}
          />
          <Input
            label="Title"
            error={errors.title?.message as string}
            {...register("title")}
          />
          <Input
            label="Description"
            error={errors.description?.message as string}
            {...register("description")}
          />
          <Button>Submit</Button>
        </form>
        <div className="w-full">
          <Selector
            data={socialMediaImageFormats}
            onChange={setFormat}
            value={format}
            placeHolder="Select the format"
          />
        </div>
        <div className="p-4 border rounded-lg flex flex-col">
          <img src={fileUrl} alt="img" />
        </div>
      </div>
    </div>
        <img src={modifiedImage.url} alt="img" height={modifiedImage.height/2} width={modifiedImage.width/2} className="border mx-auto"/>
    </>
  );
}

export default ImageUpload;
