const Button = ({ children, className, onClick, ...rest }) => {
  return (
    <button
      className={`${className} bg-indigo text-white px-4 w-full rounded-md hover:bg-metal hover:shadow-md`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
