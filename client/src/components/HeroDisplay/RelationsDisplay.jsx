import { useSelector } from "react-redux";
import Button from "../UI/Button";
import RelationDisplayCard from "./RelationDisplayCard";

const RelationsDisplay = ({ onEditRelations, currentRole }) => {
  const relations = useSelector((state) => state.relationships);
  const filteredRelations = relations.filter(
    (relation) => relation.hero.role === currentRole
  );
  const content = filteredRelations.map((relation) => (
    <RelationDisplayCard
      key={relation.hero._id}
      id={relation.hero._id}
      name={relation.hero.name}
      score={relation.score}
      special={relation.special}
      comment={relation.comment}
    />
  ));
  return (
    <div className="grid grid-cols-3 gap-3 place-items-center">
      {content}
      <Button
        className="col-span-full h-9 w-1/4 place-self-center"
        onClick={onEditRelations}
      >
        Edit relations
      </Button>
    </div>
  );
};

export default RelationsDisplay;
