import CustomRadio from "./CustomRadio";
import capitalize from "../../utils/capitalize";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const RadioGroup = ({
  className,
  choices,
  groupName,
  data,
  titleClassName,
}) => {
  const [checkedValue, setCheckedValue] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setCheckedValue(data);
  }, [data]);

  const changeValueHandler = (e) => {
    const value = e.target.value;
    setCheckedValue(value);
    if (groupName === "role") {
      dispatch({ type: "UPDATE", payload: { role: value } });
      return;
    } else if (groupName === "type") {
      dispatch({ type: "UPDATE", payload: { type: value } });
      return;
    } else if (groupName === "weakness") {
      dispatch({ type: "UPDATE", payload: { weakness: value } });
    } else {
      dispatch({ type: "UPDATE", payload: { strength: value } });
    }
  };

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
    <div className={`${className} col-span-full grid`}>
      <p className={`text-md text-center ${titleClassName}`}>
        {capitalize(groupName)}*
      </p>
      {content}
    </div>
  );
};

export default RadioGroup;
