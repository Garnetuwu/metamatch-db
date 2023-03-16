const HeroCard = ({ children, onClick }) => {
  return (
    <div
      className="flex flex-col items-center p-2 rounded-md bg-dirty-pink m-4 hover:scale-110 hover:outline outline-metal "
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default HeroCard;
