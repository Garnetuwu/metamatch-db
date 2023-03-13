import { supports, tanks, dps } from "../../utils/heroList";
import RelationSegment from "./RelationSegment";

const HeroRelations = () => {
  return (
    <div className="grid grid-cols-8 p-3">
      <RelationSegment roleName="support" heroes={supports} />
      <RelationSegment roleName="tanks" heroes={tanks} />
      <RelationSegment roleName="dps" heroes={dps} />
    </div>
  );
};

export default HeroRelations;
