import React, { InputHTMLAttributes } from "react";

type Props = {
  type?: string;
  label: string;
  placeHolder?: string;
  className?: string;
  error:string;
}& InputHTMLAttributes<HTMLInputElement>;

function Input({
  type = "text",
  placeHolder,
  className,
  label,
  error,
  ...props    
}: Props) {
  return (
    <>
      <label htmlFor={label} className="w-full">{label}</label>
      <input
        id={label}
        type={type}
        placeholder={placeHolder}
        className={`${className} w-full border p-2 rounded-lg`}
        {...props}
      />   
      <p className="text-red-500 text-xs">{error}</p>   
    </>
  );
}

export default Input;
