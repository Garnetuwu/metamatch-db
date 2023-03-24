import { Link } from "react-router-dom";
import transformGoogleImage from "../../utils/transformGoogleImage";
import Button from "../UI/Button";
import HeroCard from "../UI/HeroCard";

const HeroItem = ({ image, name, id, onDeleteHero }) => {
  return (
    <HeroCard>
      <div>
        <img
          className="w-[100px] h-[100px]"
          src={transformGoogleImage(image)}
        />
      </div>
      <div className="text-gray-300">{name}</div>

      <Link to={`/heroes/${id}`} className="contents">
        <Button className="mt-2">view </Button>
      </Link>

      <Button className="mt-2" onClick={() => onDeleteHero(id)}>
        delete
      </Button>
    </HeroCard>
  );
};

export default HeroItem;
