import { useSelector } from "react-redux";
import capitalize from "../../utils/capitalize";
import Tag from "../UI/Tag";
import Button from "../UI/Button";
import transformGoogleImage from "../../utils/transformGoogleImage";

const BasicInfoDisplay = ({ onEditProfile }) => {
  const heroData = useSelector((state) => state);

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        className="w-[100px] h-[100px] rounded-md shadow-md"
        src={transformGoogleImage(heroData.image)}
      />
      <p className="text-lg">{heroData.name}</p>
      <div>
        <Tag className="bg-sand text-slate-500">
          {capitalize(heroData.type)}
        </Tag>
        <Tag className="bg-sand text-slate-500">
          {capitalize(heroData.role)}
        </Tag>
      </div>
      <div>
        <Tag className="bg-dirty-pink text-onyx">{heroData.weakness}</Tag>
        <Tag className="bg-light-blue text-onyx">{heroData.strength}</Tag>
      </div>
      <Button className="py-1" onClick={onEditProfile}>
        Edit profile
      </Button>
    </div>
  );
};

export default BasicInfoDisplay;
