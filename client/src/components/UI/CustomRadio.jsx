import { forwardRef } from "react";

const CustomRadio = forwardRef(
  ({ children, sort, value, checkedValue, onChange, className }, ref) => {
    return (
      <label
        htmlFor={value}
        className={`radio-label ${
          checkedValue === value ? "bg-dirty-pink text-black" : " bg-slate-500"
        } ${className}`}
      >
        <span>{children}</span>
        <input
          checked={checkedValue === value ? true : false}
          className="hidden"
          ref={ref}
          id={value}
          type="radio"
          value={value}
          name={sort}
          onChange={onChange}
        />
      </label>
    );
  }
);

export default CustomRadio;
