import { Link } from "react-router-dom";
import Tag from "../UI/Tag";

const RelationDisplayCard = ({ id, name, score, special, comment }) => {
  return (
    <div className="place-self-stretch flex flex-col p-2 rounded-lg  bg-indigo border-2 border-sand">
      <Link
        to={`/heroes/${id}`}
        className="font-semibold hover:underline hover:font-bold underline-offset-4"
      >
        {name}
      </Link>
      {special && <Tag className="bg-dirty-pink">special</Tag>}
      {!special && <p className="font-semibold">score: {score}</p>}
      <p className="whitespace-pre-wrap">
        {comment === "" && "no comment"}
        {comment}
      </p>
    </div>
  );
};

export default RelationDisplayCard;
