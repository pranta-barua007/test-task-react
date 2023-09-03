import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils/cn";

export type FormInputProps = {
  label: string;
  name: string;
  errorMessage?: string | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<FormInputProps> = forwardRef<
  HTMLInputElement,
  FormInputProps
>(({ label, name, errorMessage, ...otherProps }, ref) => {
  return (
    <div>
      <label
        htmlFor={name}
        className={
          cn(`
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        `,
        errorMessage && 'text-rose-600')
        }
      >
        {errorMessage ? errorMessage : label}
      </label>
      <div className="mt-2">
        <input
          className={cn(
            `form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-3
            pl-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-0.5 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-lg 
            sm:leading-6`,
            errorMessage && "focus:ring-rose-500",
            otherProps.disabled && "opacity-50 cursor-default"
          )}
          name={name}
          ref={ref}
          {...otherProps}
        />
      </div>
    </div>
  );
});

export default Input;
