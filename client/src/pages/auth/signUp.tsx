import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Loading } from "@/components/customComponents";
import { Link } from "react-router";
import {  GalleryVerticalEnd } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/schema/signUp.schema";
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";

export default function SignUp() {
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState<boolean>(false);
const navigate = useNavigate();

  const user = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      username: "nazamkalsi",
      email: "nazamkalsi69@gmail.com",
      password: "nnzzmmnnzzmm",
    },
    resolver: zodResolver(signUpSchema),
  });

  const submit = async(data: z.infer<typeof signUpSchema>) => {
    console.log(data);
    try {
      setLoading(true);
      console.log(data);
     if (!isLoaded) return;

     const creatingUser = await signUp.create({
      emailAddress:data.email,
      password:data.password,
      username:data.username,
    })

    if(!creatingUser){
      console.log("user not created");return;
    }
    
    console.log("creatingUser : ",creatingUser)
    const verifiationCode =  await signUp.prepareEmailAddressVerification({
      strategy: 'email_code',
    })
    if(!verifiationCode){
      console.log("Verification Code error");return;      
    }
    console.log("verifiationCode : ",verifiationCode)
    navigate('/verify')
      
    } catch (error) {
      console.log("error occur (catch block): ",error)
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading/> }
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Reimage
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              className={cn("flex flex-col gap-6")}
              onSubmit={handleSubmit(submit)}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your details below to sign up
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <Input
                    label="Username"
                    {...register("username")}
                    error={errors.username?.message as string}
                  />
                  <Input
                    label="Email"
                    {...register("email")}
                    error={errors.email?.message as string}
                  />
                  <Input
                    label="Password"
                    {...register("password")}
                    error={errors.password?.message as string}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign-in with Google
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
