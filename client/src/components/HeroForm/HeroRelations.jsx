import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Divider from "../UI/Divider";
import RelationSegment from "./RelationSegment";
const HeroRelations = ({
  isError,
  isLoading,
  error,
  onCancel,
  onUpdateRelation,
  relations: originalRelations,
  currentRole,
}) => {
  const dispatch = useDispatch();
  const relations = useSelector((state) => state.relationships);
  const heroRelations = useSelector((state) => state.relationships);
  const filteredRelations = heroRelations.filter(
    (relation) => relation.hero.role === currentRole
  );

  const cancelButtonHandler = () => {
    dispatch({ type: "UPDATE", payload: { relationships: originalRelations } });
    onCancel();
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const touchedRelations = relations.filter((relation) => relation.touched);
    let relationsData = [];
    touchedRelations.map((relation) => {
      const { touched, ...relationData } = relation;
      relationsData.push(relationData);
    });
    onUpdateRelation(relationsData);
  };

  return (
    <form
      className="grid grid-cols-8 p-3 w-full gap-3"
      action="/"
      onSubmit={submitFormHandler}
    >
      <RelationSegment roleName={currentRole} relations={filteredRelations} />
      <Divider className="col-span-8" />
      <Button type="submit" className="col-span-4 w-3/4 place-self-center h-10">
        Submit
      </Button>
      <Button
        disabled={isLoading}
        type="button"
        onClick={cancelButtonHandler}
        className="col-span-4 w-3/4 place-self-center h-10"
      >
        Cancel
      </Button>
      {isError && <p className="text-dirty-pink font-semibold">{error}</p>}
    </form>
  );
};

export default HeroRelations;
