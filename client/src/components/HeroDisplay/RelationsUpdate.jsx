import useHeroRequests from "../../hooks/useHeroRequests";
import HeroRelations from "../HeroForm/HeroRelations";

const RelationsUpdate = ({ onEditRelations, heroData }) => {
  const token = localStorage.getItem("token");
  const { editHeroMutation } = useHeroRequests();

  const updateRelationHandler = (data) => {
    editHeroMutation.mutate({
      hero: { relationships: data, heroId: heroData._id },
      token,
    });
  };
  return (
    <HeroRelations
      onCancel={onEditRelations}
      onUpdateRelation={updateRelationHandler}
      relations={heroData.relationships}
    />
  );
};

export default RelationsUpdate;
