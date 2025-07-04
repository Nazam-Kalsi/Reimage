import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageUploadSchema } from "@/schema/imageUploadSchema";
import { z } from "zod";
import { Input, Loading, FormatSelector, Selector } from "@/components/customComponents";
import { apiHandler } from "@/lib/apiHandler";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Download } from "lucide-react";
import { download } from "@/lib/download";

type Props = {};

type ImageDataT = {
  localUpload: {
    [key: string]: string;
  };
  cloudinaryUpload: {
    [key: string]: string;
  };
};

type modifiedImageT = {
  url: string;
  height: number | null;
  width: number | null;
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

const filterData = {
  art: [
    "daguerre",
    "eucalyptus",
    "fes",
    "frost",
    "al_dente",
    "athena",
    "audrey",
    "aurora",
    "artistic",
    "hairspray",
    "hokusai",
    "incognito",
    "linen",
    "peacock",
    "primavera",
    "quartz",
    "red_rock",
    "refresh",
    "sizzle",
    "sonnet",
    "ukulele",
    "zorro",
  ],
  filters: ["cartoonify", "sepia", "vignette", "improve"],
};

const radiusData = [
  {key:'10%',value:10},
  {key:'20%',value:20},
  {key:'30%',value:30},
  {key:'40%',value:40},
  {key:'50%',value:50},
  {key:'60%',value:60},
  {key:'70%',value:70},
  {key:'80%',value:80},
  {key:'90%',value:90},
  {key:'100%',value:'full'},
  ];

function ImageUpload({}: Props) {
  const [imageData, setImageData] = useState<ImageDataT | undefined>({
    localUpload: {
      title: "qwe",
      description: "rewq",
      type: "image",
      fileURL:
        "https://res.cloudinary.com/nzm/image/upload/v1748024467/reimage/gnvbjsfznt4wvpliik36.jpg",
      _id: "6830bc8d147378ebc7856dde",
      createdAt: "2025-05-23T18:21:01.660Z",
      updatedAt: "2025-05-23T18:21:01.660Z",
      __v: "0",
    },
    cloudinaryUpload: {
      asset_id: "92f8152b8db63a5425aa93db74c5b14c",
      public_id: "reimage/gnvbjsfznt4wvpliik36",
      version: "1748024467",
      version_id: "9fb92401e448698536cec369abd516f0",
      signature: "2264808b5c0f665eb6ae5478993db484bf7b9ed2",
      width: "1920",
      height: "1080",
      format: "jpg",
      resource_type: "image",
      created_at: "2025-05-23T18:21:07Z",
      type: "upload",
      etag: "f8eb50bcc4ad671f87764bddca29fa8b",
      url: "http://res.cloudinary.com/nzm/image/upload/v1748024467/reimage/gnvbjsfznt4wvpliik36.jpg",
      secure_url:
        "https://res.cloudinary.com/nzm/image/upload/v1748024467/reimage/gnvbjsfznt4wvpliik36.jpg",
      folder: "reimage",
      original_filename: "file",
      api_key: "743384798964899",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [modifiedImage, setModifiedImage] = useState<modifiedImageT | undefined>(undefined);
  const [format, setFormat] = useState<string>("");

  const {
    register: imageUploadRegister,
    handleSubmit: imageUploadHandleSubmit,
    formState: { errors: imageUploadErrors },
    watch:imageUploadWatch
  } = useForm<z.infer<typeof imageUploadSchema>>({
    defaultValues: {
      file: undefined,
      title: "",
      description: "",
    },
    resolver: zodResolver(imageUploadSchema),
  });

  const {
    register: imageTransformRegister,
    handleSubmit: imageTransformHandleSubmit,
    control: imageTransformControl,
    formState: { errors: imageTransformErrors },
    watch: imageTransformWatch,
  } = useForm({
    defaultValues: {
      format: "",
      filter: "",
      radius: "",
    },
    // resolver: zodResolver(imageUploadSchema),
  });
  // const imageTransformWatchFormat = imageTransformWatch("format");

  const submit = async (data: z.infer<typeof imageUploadSchema>) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    const res = await apiHandler("/upload/upload-image", "post", {
      data: formData,
    });
    if (!res.success) {
      setLoading(false);
      console.log(res.message);
      toast.error(res.message);
      return;
    }
    console.log(res);
    if (!res.res) return;
    setImageData(res.res.data.data);
    setLoading(false);
  };

  const transform = async (data: any) => {
    console.log(data);
    let dataToSend: Record<string, any> = {public_id: imageData?.cloudinaryUpload?.public_id}; 
    let height:number | null = null;
    let width:number | null = null;
    // setLoading(true);
    if(data.format != ""){      
      const heightWidth = data.format.split("-")[2];
       height = Number(heightWidth.split("x")[1]);
       width = Number(heightWidth.split("x")[0]);
      setModifiedImage((prev) => {
          if(prev)return { ...prev, height, width };
            else return { url:"", height, width };            
            });

            dataToSend.height=height;
            dataToSend.width=width;
      }

      if(data.filter != ""){
        dataToSend.filter = data.filter;
      }
      
      if(data.radius != ""){
        dataToSend.radius = Number(data.radius);
      }
      
      console.log(dataToSend);
      const res = await apiHandler("/modify/image-transformation", "post", {
        data:dataToSend,
      });

      if (!res.success) {
        console.log(res.message);
        toast.error(res.message);
        setLoading(false);
        return;
      }

      console.log(res);
      setModifiedImage((prev) => {
        if(prev){
          return { ...prev, url: res.res?.data.data };
        }
      else{
        return { height:0,width:0, url: res.res?.data.data };
      }
      });
      setLoading(false);
  };
  console.log(modifiedImage);

  // useEffect(() => {
  //   (async () => {
  //     if (!imageTransformWatchFormat) return;
  //     console.log(imageTransformWatchFormat);
  //     setLoading(true);
  //     const heightWidth = imageTransformWatchFormat.split("-")[2];
  //     const height = Number(heightWidth.split("x")[1]);
  //     const width = Number(heightWidth.split("x")[0]);
  //     setModifiedImage((prev) => {
  //       if(prev){
  //         return { ...prev, height: height, width: width };
  //       }
  //       else{
  //         return { url:"", height: height, width: width };
  //       }

  //     });

  //     console.log(height, width);

  //     const res = await apiHandler("/modify/image-transformation", "post", {
  //       data: {
  //         height,
  //         width,
  //         public_id: imageData?.cloudinaryUpload?.public_id,
  //       },
  //     });

  //     if (!res.success) {
  //       console.log(res.message);
  //       toast.error(res.message);
  //       setLoading(false);
  //       return;
  //     }

  //     console.log(res);
  //     setModifiedImage((prev) => {
  //       if(prev){
  //         return { ...prev, url: res.res?.data.data };
  //       }
  //     else{
  //       return { height:0,width:0, url: res.res?.data.data };
  //     }
  //     });
  //     setLoading(false);
  //   })();
  // }, [imageTransformWatchFormat]);
  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col items-center justify-center gap-4 w-full min-h-screen">
        <img
        src="../src/assets/grad2.jpg"
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale z-[-9] hidden dark:block"
      />
        <div className="w-1/2">
          <form
            onSubmit={imageUploadHandleSubmit(submit)}
            className="flex flex-col gap-4 w-full  border p-4 rounded-lg"
          >
            <h2 className="font-bold text-3xl text-center p-3">Upload Image</h2>
            <div className="h-fit flex items-center w-full overflow-hidden justify-center">
              <label
                htmlFor="file"
                className="cursor-pointer w-full dark:bg-[#333] py-8 px-16 rounded-md border border-dashed border-[#666] shadow-[0_0_200px_-50px_rgba(0,0,0,0.5)] text-[#eee]"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg viewBox="0 0 640 512" height="50" className="fill-[#666] mb-2">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                { (imageUploadWatch("file")==undefined  || Object.keys(imageUploadWatch("file")).length==0) &&  <span className="dark:text-white text-black">
                    Click to upload Image 
                  </span>}
                </div>
                <input id="file" type="file"  className="w-full hidden" {...imageUploadRegister("file")}/>
                {
                  (imageUploadWatch("file") && Object.keys(imageUploadWatch("file")).length>0) && (
                    <p className="text-center">
                      { (imageUploadWatch("file")[0]?.name as string).slice(0,4)}
                      { (imageUploadWatch("file")[0]?.name as string).length>=4?"....":""}
                      { (imageUploadWatch("file")[0]?.name as string).split('.').pop()}
                    </p>
                  )
                }
              </label>
            </div>
            {/* <Input
              type="file"
              label="Upload image"
              error={imageUploadErrors.file?.message as string}
              {...imageUploadRegister("file")}
            /> */}
            <Input
              label="Title"
              error={imageUploadErrors.title?.message as string}
              {...imageUploadRegister("title")}
            />
            <Input
              label="Description"
              error={imageUploadErrors.description?.message as string}
              {...imageUploadRegister("description")}
            />
            <Button>Submit</Button>
          </form>
        </div>

        {imageData && (
          <div className="w-1/2 p-4 border rounded-lg flex flex-col gap-4">
            <form
              onSubmit={imageTransformHandleSubmit(transform)}
              className="space-y-2 flex flex-col"
            >
              <div className="w-full">
                <h2 className="font-medium text-sm pb-1">Select Format</h2>
                <Controller
                  name="format"
                  control={imageTransformControl}
                  defaultValue=""
                  render={({ field }) => (
                    <FormatSelector
                      data={socialMediaImageFormats}
                      value={field.value}
                      onChange={field.onChange}
                      placeHolder="Select the format"
                    />
                  )}
                />
              </div>
              <div className="flex w-full gap-4 ">
                <div className="w-full">
                  <h2 className="font-medium text-sm pb-1">Select Filter</h2>
                  <Controller
                    name="filter"
                    control={imageTransformControl}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(filterData).map(([title, filter],index) => {
                            return (
                              <div key={index}>
                                <SelectGroup>
                                  <SelectLabel>{title}</SelectLabel>
                                  {filter.map((item: string,index:number) => {
                                    return (
                                      <SelectItem key={index} value={title=='art'?`art:${item}`:item}>
                                        {item}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectGroup>
                                <SelectSeparator />
                              </div>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="w-full">
                  <h2 className="font-medium text-sm pb-1">Radius</h2>
                  <Controller
                    name="radius"
                    control={imageTransformControl}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                        <SelectLabel>Radius</SelectLabel>
                          {
                            radiusData.map((x,index)=>(
                              <SelectItem key={index} value={(x.value as string)}>{x.key}</SelectItem>                              
                            ))
                          }
                          </SelectGroup>
                          
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <Button>submit</Button>
            </form>
            {!imageData && !modifiedImage && (
              <div className="relative rounded-md overflow-hidden mx-auto">
                <img src={imageData.cloudinaryUpload.secure_url || `../src/assets/base.png`} alt="preview image" />
              </div>
            )}
            {modifiedImage && (
              <div
                className="relative rounded-md overflow-hidden mx-auto flex justify-center items-center"
                style={{
                  width: `${(modifiedImage.width as number) / 3}px`,
                  height: `${(modifiedImage.height as number) / 2}px`,
                }}
              >
                <img
                  src={modifiedImage.url || `../src/assets/base.png`}
                  className="max-w-full max-h-full object-contain"
                  alt="modified image"
                />
                <Button className="absolute z-[999999] right-3 bottom-3" onClick={()=>download(modifiedImage.url)}><Download /></Button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <img src={modifiedImage.url} alt="img" height={modifiedImage.height/2} width={modifiedImage.width/2} className="border mx-auto"/> */}
    </>
  );
}

export default ImageUpload;
