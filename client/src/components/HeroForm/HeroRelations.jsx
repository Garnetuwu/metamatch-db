import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Divider from "../UI/Divider";
import RelationSegment from "./RelationSegment";
import filterHeroesByRole from "../../utils/filterHeroesByRole";

const HeroRelations = ({
  onCancel,
  onUpdateRelation,
  relations: originalRelations,
}) => {
  const dispatch = useDispatch();
  const relations = useSelector((state) => state.relationships);
  const heroRelations = useSelector((state) => state.relationships);
  const { supportHeroes, dpsHeroes, tankHeroes } = filterHeroesByRole(
    heroRelations.map((relation) => relation.hero)
  );

  const cancelButtonHandler = () => {
    dispatch({ type: "UPDATE", payload: originalRelations });
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
      <RelationSegment roleName="support" relations={supportHeroes} />
      <RelationSegment roleName="tanks" relations={tankHeroes} />
      <RelationSegment roleName="dps" relations={dpsHeroes} />
      <Divider className="col-span-8" />
      <Button type="submit" className="col-span-4 w-3/4 place-self-center h-10">
        Submit
      </Button>
      <Button
        type="button"
        onClick={cancelButtonHandler}
        className="col-span-4 w-3/4 place-self-center h-10"
      >
        Cancel
      </Button>
    </form>
  );
};

export default HeroRelations;
