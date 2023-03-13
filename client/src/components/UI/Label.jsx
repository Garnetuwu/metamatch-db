const Label = ({ children, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} whitespace-nowrap text-md`}
    >
      {children}
    </label>
  );
};

export default Label;
