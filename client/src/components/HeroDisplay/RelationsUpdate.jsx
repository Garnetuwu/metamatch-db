import HeroRelations from "../HeroForm/HeroRelations";

const RelationsUpdate = ({ onEditRelations, heroData }) => {
  return (
    <HeroRelations onCancel={onEditRelations} relations={heroData.relations} />
  );
};

export default RelationsUpdate;
