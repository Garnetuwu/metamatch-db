import CustomRadio from "../UI/CustomRadio";
import { roleList } from "../../utils/heroTraits";

const RelationFilter = ({ currentRole, onFilter }) => {
  const content = roleList.map((role) => (
    <CustomRadio
      className="w-1/2 text-white rounded-none place-self-center hover:bg-indigo"
      sort="role"
      value={role}
      key={role}
      checkedValue={currentRole}
      onChange={() => onFilter(role)}
    >
      {role}
    </CustomRadio>
  ));

  return (
    <div className="col-span-full flex mb-5 border-2 border-sand rounded-md overflow-hidden">
      {content}
    </div>
  );
};

export default RelationFilter;
