import { useDispatch } from "react-redux";
import { supports, tanks, dps } from "../../utils/heroList";
import Button from "../UI/Button";
import Divider from "../UI/Divider";
import RelationSegment from "./RelationSegment";

const HeroRelations = ({ onCancel, relations }) => {
  const dispatch = useDispatch();
  const cancelButtonHandler = () => {
    dispatch({ type: "UPDATE", payload: relations });
    onCancel();
  };
  return (
    <form className="grid grid-cols-8 p-3 w-full">
      <RelationSegment roleName="support" heroes={supports} />
      <RelationSegment roleName="tanks" heroes={tanks} />
      <RelationSegment roleName="dps" heroes={dps} />
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
