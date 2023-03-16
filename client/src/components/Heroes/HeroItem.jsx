import { Link } from "react-router-dom";
import Button from "../UI/Button";
import HeroCard from "../UI/HeroCard";

const HeroItem = ({ image, name, id, onDeleteHero }) => {
  return (
    <HeroCard>
      <div>
        <img
          className="w-[100px] h-[100px]"
          src={`https://drive.google.com/uc?export=view&id=${image}`}
        />
      </div>
      <div className="text-gray-300">{name}</div>
      <Button className="mt-2">
        <Link to={`/heroes/${id}`}>view</Link>
      </Button>
      <Button className="mt-2" onClick={() => onDeleteHero(id)}>
        delete
      </Button>
    </HeroCard>
  );
};

export default HeroItem;
