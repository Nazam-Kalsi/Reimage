import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Input from "@/components/customComponents/input";
import { useForm } from "react-hook-form";
import { LucideDog, LucideEye, LucideEyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signInSchema } from "@/schema/signIn.schema";
import { Loading, Noise } from "@/components/customComponents";
import { useSignIn } from '@clerk/clerk-react'
import { useAppSelector,useAppDispatch } from "@/store/store";
import { toast } from "sonner";
import { signIn as storeSignIn } from "@/store/user.slice";

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, signIn, setActive } = useSignIn()
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
      identifier: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    console.log(data)
  try{
    setLoading(true);  
      if (!isLoaded) return  
      
        const signInAttempt = await signIn.create({
          identifier: data.identifier,
          password:data.password,
        })
        console.log("signInAttempt :",signInAttempt)
  
        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId })
          const dataToDispatch = {
            id:signInAttempt.id,
          }
          dispatch(storeSignIn(dataToDispatch));
          navigate('/dashboard');
          
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2))
        }
  }catch(err){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast.error((err as any).message)
    console.log("Error while sign-in :",err)
  }finally{
    setLoading(false)
  }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
       <img
        src={`./src/assets/grad2.jpg`}
        alt="svg"
        width={500}
        height={500}
        className="absolute object-cover inset-0 size-full opacity-40 z-[-99]"
      />
            {loading && <Loading/> }

      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-2")}>
          <Card className="relative overflow-hidden p-0">
            <LucideDog className="absolute top-2 left-2"/>
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="p-6 md:p-8 relative" onSubmit={handleSubmit(onSubmit)}>
                 <Noise className="opacity-10 "/>
                <div className="flex flex-col gap-4 ">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">                      
                      Login to your Reimage account
                    </p>
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Email/Username"
                      {...register("identifier")}
                      error={errors.identifier?.message as string}
                    />
                  </div>
                  <div className="">
                    <div className="relative">
                      <div className="absolute right-2 bottom-1 z-1">
                        {isPasswordVisible 
                        ? (<LucideEyeOff onClick={() => setIsPasswordVisible(false)}/>) 
                        : (<LucideEye onClick={() => setIsPasswordVisible(true)}/>)}
                      </div>
                      <Link to="/" className=" absolute right-2 z-1 ml-auto text-sm underline-offset-2 hover:underline">
                        Forgot your password?
                      </Link>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        label="Password"
                        {...register("password")}
                        error={errors.password?.message as string}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or
                    </span>
                  </div>
                  <div className="">
                    <Button variant="outline" className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                      </svg>
                     Login with Google
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="underline underline-offset-4">
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="./src/assets/frame2.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <p className="text-4xl relative z-[99] top-[40%] left-[35%] opacity-10">REIMAGE</p>
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
