import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OTPverifySchema } from "@/schema/OTPverification.schame";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from "react-router";


export default function OTPverification() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<z.infer<typeof OTPverifySchema>>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(OTPverifySchema),
  });

  const watchedVal = watch("code");
  useEffect(()=>{
    if(watchedVal.length==6)
    submit({code:watchedVal});
    },[watchedVal])
  


  const submit = async(data: z.infer<typeof OTPverifySchema>) => {
    console.log("data : ", data);
  
      if (!isLoaded) return
  
      try {
        // Use the code the user provided to attempt verification
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code: data.code,
        })
        if (signUpAttempt.status === 'complete') {
          await setActive({ session: signUpAttempt.createdSessionId })
          navigate('/')
        } else {
          console.error(JSON.stringify(signUpAttempt, null, 2))
        }
      } catch (err) {
        console.error('Error:', JSON.stringify(err, null, 2))
      }
    

  };

  return (
    <div className="flex w-full h-screen overflow-hidden justify-center items-center">
      <Controller
        name="code"
        control={control}
        rules={{ validate: (value:string) => value.length === 6 }}
        render={({ field }:{field:any}) => {
          return (
            <form onSubmit={handleSubmit(submit)} {...field}>
              <InputOTP maxLength={6} >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {errors.code && <p>{errors.code?.message}</p>}
              <Button>Send</Button>
            </form>
          );
        }}
      />
    </div>
  );
}
