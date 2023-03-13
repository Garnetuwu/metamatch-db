const ValidationMessage = ({ className, children }) => {
  return (
    <div className={`${className} flex items-center`}>
      <p className={`text-sm font-semibold text-sand`}>{children}</p>
    </div>
  );
};

export default ValidationMessage;
