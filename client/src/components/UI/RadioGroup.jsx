import CustomRadio from "./CustomRadio";
import capitalize from "../../utils/capitalize";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const RadioGroup = ({ choices, groupName, onMakeChange, isTraitClear }) => {
  const [checkedValue, setCheckedValue] = useState(null);
  const dispatch = useDispatch();

  const changeValueHandler = (e) => {
    const value = e.target.value;
    setCheckedValue(value);
    if (groupName === "role") {
      dispatch({ type: "UPDATE", payload: { role: value } });
      return;
    } else if (groupName === "type") {
      dispatch({ type: "UPDATE", payload: { type: value } });
      return;
    } else {
      onMakeChange(); //setIsTraitClear(false)
      dispatch({
        type: "UPDATE_TRAIT",
        payload: { traitType: groupName, value },
      });
    }
  };

  useEffect(() => {
    if (isTraitClear) {
      setCheckedValue(null);
      dispatch({ type: "CLEAR_TRAIT" });
    }
  }, [isTraitClear, dispatch]);

  const content = choices.map((choice) => (
    <CustomRadio
      sort={groupName}
      value={choice}
      key={choice}
      checkedValue={checkedValue}
      onChange={changeValueHandler}
    >
      {capitalize(choice)}
    </CustomRadio>
  ));
  return (
    <>
      <p className="text-md">
        {capitalize(groupName)}{" "}
        {groupName === "role" || groupName === "type" ? "*" : ""}
      </p>
      {content}
    </>
  );
};

export default RadioGroup;
