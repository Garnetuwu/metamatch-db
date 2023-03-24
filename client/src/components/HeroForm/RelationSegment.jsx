import RelationCard from "./RelationCard";

const RelationSegment = ({ relations }) => {
  return (
    <ul className="contents">
      {relations.map((relation) => (
        <RelationCard
          score={relation.score}
          special={relation.special}
          comment={relation.comment}
          name={relation.hero.name}
          key={relation._id}
          className="col-span-2"
        />
      ))}
    </ul>
  );
};

export default RelationSegment;
