import { Input } from "@/components/customComponents";
import { Button } from "@/components/ui/button";
import { apiHandler } from "@/lib/apiHandler";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


function RemoveBg() {
    const[removedBgImage,setRemovedBgImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const {register, handleSubmit} = useForm({
        defaultValues:{
            imageFile:undefined
        }
    })

    const removeBg = async (data:any) => {
         const formData = new FormData();
        formData.append("image", data.file);
        console.log("Data: ",data);
        console.log("formData: ",formData);
        // setLoading(true);
        // const res = await apiHandler('/modify/remove-bg','post',{data:formData});
        // console.log(res);
        // if(!res.res || !res.success){
        //     setLoading(false);
        //     toast.error(res.message)
        //     return;
        // }        
        // setLoading(false);
        // setRemovedBgImage(res.res.data.data.secure_url);
        toast.success("Background removed succcessfully.");
    }


  return (
    <div>
      <div className="w-full">
        <div className="w-1/2 mt-2 mx-auto">
          <form
        onSubmit={handleSubmit(removeBg)}
            className="flex flex-col gap-4 w-full  border p-4 rounded-lg"
          >
            <h2 className="font-bold text-3xl text-center p-3">Upload Image</h2>
          {/* <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG or JPG 
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" {...register('imageFile')}/>
            </label>
          </div> */}
          <Input
              type="file"
              label="Upload image"
              // error={imageUploadErrors.file?.message as string}
              {...register("imageFile")}
            />
          <Button>Remove BG</Button>
        </form>
      </div>
      </div>

    </div>
  );
}

export default RemoveBg;
