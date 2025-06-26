import { Input, Loading } from "@/components/customComponents";
import { Button } from "@/components/ui/button";
import { apiHandler } from "@/lib/apiHandler";
import { download } from "@/lib/download";
import { Download, UploadCloudIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function RemoveBg() {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [animation,setAnimation] = useState<boolean>(false);
  const { register, handleSubmit, watch,setValue } = useForm({
    defaultValues: {
      imageFile: undefined,
    },
  });

  const removeBg = async (data: any) => {
    const formData = new FormData();
    formData.append("image", data.imageFile[0]);
    console.log("Data: ", data);
    console.log("formData: ", formData);
    setLoading(true);
    const res = await apiHandler('/modify/remove-bg','post',{data:formData});
    console.log(res);
    if(!res.res || !res.success){
        setLoading(false);
        toast.error(res.message)
        return;
    }
    setLoading(false);
    setPreviewUrl(res.res.data.data);
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 5000);
    toast.success("Background removed succcessfully.");
  };

  const handleDemoImageClick = async (imgName: string) => {
    const imgPath = `../src/assets/${imgName}`;
    const response = await fetch(imgPath);
    const blob = await response.blob();

    const file = new File([blob], imgName, { type: blob.type });

    setValue("imageFile", [file]);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const imageFile = watch("imageFile");

  useEffect(() => {
    if (imageFile && Object.keys(imageFile).length > 0) {
      const file = imageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
         <img
        src="../src/assets/grad2.jpg"
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale z-[-9] hidden dark:block"
      />
        <div className="w-1/2 mt-2 mx-auto">
          <form
            onSubmit={handleSubmit(removeBg)}
            className="flex flex-col gap-4 w-full  border p-4 rounded-lg"
          >
            <h2 className="font-bold text-3xl text-center p-3">Remove BG</h2>
            {previewUrl ? (
              <>
              <div className="relative my-4 rounded-md overflow-hidden ">
              {loading && <>
                <Loading/>
                  </>
              }
              {!animation && (
                <div className="absolute w-full h-full flex items-center justify-center animate-pulse bg-gray-900 rounded-lg p-6 text-white">
                  Let him cook, vro😎
                </div>

              )}
                <div className="size-64 flex justify-center items-center w-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="rounded shadow object-fit"
                  />
                  </div>
                <div className="absolute z-[9] bottom-3 right-3 space-x-4">
                  <Button type="button">
                    <label htmlFor="file" className="">
                      <input type="file" id="file" {...register("imageFile")} accept="image/*" hidden />
                    <UploadCloudIcon/>
                    </label>
                  </Button>
                  <Button onClick={()=>download(previewUrl)} type="button">
                    <Download />
                  </Button>
                </div>
              </div>
              </>
            ) : (
              <div className="h-fit flex items-center w-full overflow-hidden justify-center">
                <label
                  htmlFor="file"
                  className="cursor-pointer w-full dark:bg-[#333] py-8 px-16 rounded-md border border-dashed border-[#666] shadow-[0_0_200px_-50px_rgba(0,0,0,0.5)] "
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      viewBox="0 0 640 512"
                      height="50"
                      className="fill-[#666] mb-2"
                    >
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                    </svg>
                    {(watch("imageFile") == undefined ||
                      Object.keys(watch("imageFile")).length == 0) && (
                      <span className="">Click to upload Image</span>
                    )}
                  </div>
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    className="w-full hidden"
                    {...register("imageFile")}
                  />
                  { watch("imageFile") && Object.keys(watch("imageFile")).length > 0 &&
                    (() => {
                      const fileName = watch("imageFile")[0]?.name as string;
                      const [baseName, extension] =
                        fileName.split(/\.(?=[^\.]+$)/);
                      const shortName =
                        baseName.length > 10
                          ? baseName.slice(0, 10) + "..."
                          : baseName;
                      return (
                        <p className="text-center">
                          {shortName}.{extension}
                        </p>
                      );
                    })()}
                </label>
              </div>
            )}
            <Button>Remove BG</Button>
          </form>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-xl text-center p-3">No image? Try these:</h2>
          <div className="flex justify-around w-full">
          {  ['humanDemo.jpg','demo3.jpg','humanDemo2.jpg'].map((x,index)=>{
              return(
                <button onClick={()=>handleDemoImageClick(x)} key={index} className="rounded-md overflow-hidden">
                  <img src={'../src/assets/'+x} alt='demo' className="object-contain size-48 "/>
                </button>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveBg;
