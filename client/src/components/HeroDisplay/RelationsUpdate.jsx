import { useEffect } from "react";
import useHeroRequests from "../../hooks/useHeroRequests";
import HeroRelations from "../HeroForm/HeroRelations";

const RelationsUpdate = ({
  onEditRelations,
  heroId,
  allRelations,
  currentRole,
}) => {
  const token = localStorage.getItem("token");
  const { editHeroMutation } = useHeroRequests();
  const { isSuccess, isError, isLoading, error } = editHeroMutation;

  const updateRelationHandler = (data) => {
    editHeroMutation.mutate({
      hero: { relationships: data, heroId },
      token,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onEditRelations();
    }
  }, [isSuccess]);

  return (
    <HeroRelations
      isLoading={isLoading}
      isError={isError}
      error={error}
      onCancel={onEditRelations}
      onUpdateRelation={updateRelationHandler}
      relations={allRelations}
      currentRole={currentRole}
    />
  );
};

export default RelationsUpdate;
