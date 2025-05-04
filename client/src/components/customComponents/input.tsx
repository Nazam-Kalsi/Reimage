import { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  type?: string;
  label: string;
  placeHolder?: string;
  className?: string;
  error:string;
}& InputHTMLAttributes<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = "text", placeHolder, className = "", label, error, ...props }, ref) => {
    return (
      <>
        <label htmlFor={label} className="w-full block mb-1 font-medium">
          {label}
        </label>
        <input
          id={label}
          ref={ref}
          type={type}
          placeholder={placeHolder}
          className={`${className} w-full border p-2 rounded-lg ${error ? 'border-red-500' : ''}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
