import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageUploadSchema } from "@/schema/imageUploadSchema";
import { z } from "zod";
import { Input } from "@/components/customComponents";
import { apiHandler } from "@/lib/apiHandler";
type Props = {};

type ImageData = {
  publicId: string;
  [key: string]: string;
};
function Home({}: Props) {
  const [imageData,setImageData ] = useState<ImageData | undefined>(undefined);
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
  // const sendReq = async () => {
  //   console.log("hello");
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/test`, {
  //     credentials: "include",
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };

  const submit = async (data: z.infer<typeof imageUploadSchema>) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    const res = await apiHandler(
      "/api/upload/upload-image",
      'post',
      {data : formData}
    );
    if(!res.success){
      console.log(res.message);
      return;
    };
    console.log(res);
    if(!res.res) return;

    setImageData(res.res.data.data);

    
    // try {
      
    //   const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload/upload-image`, formData, {withCredentials:true});
    //   console.log(res);
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header> 
      <form onSubmit={handleSubmit(submit)}>
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
    </div>
  );
}

export default Home;
