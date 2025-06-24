import { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  type?: string;
  label?: string;
  placeHolder?: string;
  className?: string;
  error?:string;
}& InputHTMLAttributes<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = "text", placeHolder, className = "", label, error, ...props }, ref) => {
    return (
      <div className=" relative mb-1">
        <label htmlFor={label} className="w-full">
          {label}
        </label>
        <input
          id={label}
          ref={ref}
          type={type}          
          placeholder={placeHolder}
          className={`${className} w-full focus:outline focus:outline-violet-700  border p-2 py-1 rounded-md ${error ? 'border-red-500' : ''}`}
          {...props}
        />
        {error && <p className=" text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
