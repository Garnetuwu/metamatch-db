import { forwardRef } from "react";

const Input = forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
      className={`${className} my-2 py-2 px-3 text-metal outline-none rounded w-full bg-slate-500 bg-opacity-70`}
      {...rest}
      ref={ref}
    />
  );
});

export default Input;
