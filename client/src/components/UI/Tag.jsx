const Tag = ({ children, className }) => {
  return (
    <span
      className={`${className} font-semibold rounded-md py-1 px-2 mx-1 leading-4 inline-block`}
    >
      {children}
    </span>
  );
};

export default Tag;
