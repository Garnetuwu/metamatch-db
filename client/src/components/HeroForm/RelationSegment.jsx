import { useState } from "react";
import capitalize from "../../utils/capitalize";
import Divider from "../UI/Divider";
import RelationCard from "./RelationCard";

const RelationSegment = ({ roleName, relations }) => {
  const [showExpansion, setShowExpansion] = useState(false);
  return (
    <>
      <Divider className="col-span-8" />
      <div className="contents">
        <button
          type="button"
          onClick={() => setShowExpansion((prev) => !prev)}
          className="col-span-8 text-md text-center p-1 bg-dirty-pink text-white rounded-md hover:bg-onyx"
        >
          <span> {capitalize(roleName)} </span>
          {showExpansion ? "-" : "+"}
        </button>
        {showExpansion && (
          <ul className="contents">
            {relations.map((relation) => (
              <RelationCard
                name={relation.name}
                key={relation._id}
                className="col-span-2"
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default RelationSegment;
