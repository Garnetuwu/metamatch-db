const Card = ({ children, className }) => {
  return (
    <div className={`${className} p-3 bg-dark-blue rounded-md`}>{children}</div>
  );
};

export default Card;
