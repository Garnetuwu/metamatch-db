import Label from "../UI/Label";
import Input from "../UI/Input";
import { useDispatch, useSelector } from "react-redux";

const RelationCard = ({ name, score, special, comment, className }) => {
  const dispatch = useDispatch();

  const scoreChangeHandler = (e) => {
    const score = e.target.value;
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { score } },
    });
  };

  const stateChangeHandler = (e) => {
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { special: e.target.checked } },
    });
  };

  const commentChangeHandler = (e) => {
    dispatch({
      type: "UPDATE_RELATION",
      payload: { name, relation: { comment: e.target.value } },
    });
  };

  return (
    <li className={`${className} bg-indigo p-3 m-2 rounded-md`}>
      <p className="text-md">{name}</p>
      <div className="flex flex-col items-center">
        <Label htmlFor={name + "Score"} className="text-sm">
          Score:
        </Label>
        <Input
          className="bg-sand"
          onChange={scoreChangeHandler}
          type="range"
          min={-100}
          max={100}
          value={score}
          id={name}
          disabled={special}
        />
        <Input
          disabled={special}
          type="number"
          value={score}
          min="-100"
          max="100"
          onChange={scoreChangeHandler}
          className=" text-white w-[40%] text-center rounded-lg disabled:bg-metal disabled:text-gray-400"
        />
      </div>
      <div className="flex justify-between">
        <Label htmlFor={name + "Special"} className="text-sm">
          Special hero?
        </Label>
        <Input
          checked={special}
          type="checkbox"
          onChange={stateChangeHandler}
          id={name + "Special"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={name + "Comment"} className="text-sm">
          Comment:
        </Label>
        <textarea
          onChange={commentChangeHandler}
          value={comment}
          id={name + "Comment"}
          className="outline-none bg-slate-500/70 text-white p-2 rounded-md"
        />
      </div>
    </li>
  );
};

export default RelationCard;
