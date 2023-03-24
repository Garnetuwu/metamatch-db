import Label from "../UI/Label";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Title from "./Title";
import RadioGroup from "../UI/RadioGroup";
import Divider from "../UI/Divider";
import ValidationMessage from "./ValidationMsg";

import {
  roleList,
  typeList,
  weaknessList,
  strengthList,
} from "../../utils/heroTraits";

import capitalize from "../../utils/capitalize";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const imageRegex =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const HeroBasicInfo = ({ onSubmit, isLoading, isError, error, title }) => {
  const name = useSelector((state) => state.name);
  const role = useSelector((state) => state.role);
  const type = useSelector((state) => state.type);
  const image = useSelector((state) => state.image);
  const weakness = useSelector((state) => state.weakness);
  const strength = useSelector((state) => state.strength);

  const [nameError, setNameError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [weaknessError, setWeaknessError] = useState(null);
  const [strengthError, setStrenghError] = useState(null);

  const dispatch = useDispatch();

  const nameChangeHandler = (e) => {
    const name = capitalize(e.target.value);
    dispatch({ type: "UPDATE", payload: { name } });
  };

  const urlChangeHandler = (e) => {
    const url = e.target.value;
    dispatch({ type: "UPDATE", payload: { image: url } });
  };

  const formHandler = (e) => {
    e.preventDefault();

    //validate
    if (name.trim() === "") {
      setNameError("Name cannot be empty");
      return;
    } else {
      setNameError(null);
    }
    if (!imageRegex.test(image)) {
      setImageError("Invalid or empty image");
      return;
    } else {
      setImageError(null);
    }
    if (role === "") {
      setRoleError("Role cannot be empty");
      return;
    } else {
      setRoleError(null);
    }
    if (type === "") {
      setTypeError("Type cannot be empty");
      return;
    } else {
      setTypeError(null);
    }
    if (weakness === "") {
      setWeaknessError("Weakness cannot be empty");
      return;
    } else {
      setWeaknessError(null);
    }
    if (strength === "") {
      setStrenghError("Strength cannot be empty");
      return;
    } else {
      setStrenghError(null);
    }
    //submit
    const hero = {
      name,
      image,
      role,
      type,
      weakness,
      strength,
    };
    onSubmit(hero);
  };

  return (
    <form action="/" onSubmit={formHandler} className="m-3">
      <Title>{title}</Title>

      <div className="grid grid-cols-6 gap-4 place-items-center p-3">
        {/* name */}
        <Label htmlFor="name">Name*</Label>
        <Input
          id="name"
          type="text"
          value={name}
          className={`col-span-3 ${nameError ? "outline-dirty-pink" : ""}`}
          onChange={nameChangeHandler}
        />

        {!nameError ? (
          <span className="col-span-2" />
        ) : (
          <ValidationMessage className="col-span-2 place-self-stretch">
            {nameError}
          </ValidationMessage>
        )}

        {/* image url */}
        <Label htmlFor="image">Image URL*</Label>
        <Input
          id="image"
          type="url"
          value={image}
          className={`col-span-3  ${imageError ? "outline-dirty-pink" : ""}`}
          onChange={urlChangeHandler}
        />

        {!imageError ? (
          <span className="col-span-2" />
        ) : (
          <ValidationMessage className="col-span-2 place-self-stretch">
            {imageError}
          </ValidationMessage>
        )}

        {/* role */}
        <RadioGroup
          choices={roleList}
          data={role}
          groupName="role"
          className="grid-cols-6 w-full place-self-start gap-3"
        />
        {!roleError ? (
          ""
        ) : (
          <ValidationMessage className="col-span-full text-center">
            {roleError}
          </ValidationMessage>
        )}

        {/* type */}
        <RadioGroup
          choices={typeList}
          groupName="type"
          data={type}
          className="grid-cols-6 w-full place-self-start gap-3"
        />

        {!typeError ? (
          ""
        ) : (
          <ValidationMessage className="col-span-2 place-self-stretch">
            {typeError}
          </ValidationMessage>
        )}

        <Divider className="col-span-6" />

        {/* weakness */}
        <RadioGroup
          className="grid-cols-3 gap-3"
          titleClassName="col-span-full text-center"
          choices={weaknessList}
          groupName="weakness"
          data={weakness}
        />

        {!weaknessError ? (
          ""
        ) : (
          <ValidationMessage className="col-span-2 place-self-stretch">
            {weaknessError}
          </ValidationMessage>
        )}

        {/* strength */}
        <RadioGroup
          className="grid-cols-3 gap-3"
          titleClassName="col-span-full text-center"
          choices={strengthList}
          groupName="strength"
          data={strength}
        />
        {!strengthError ? (
          ""
        ) : (
          <ValidationMessage className="col-span-2 place-self-stretch">
            {strengthError}
          </ValidationMessage>
        )}
      </div>

      <div className="w-1/3 m-auto">
        <Button
          className="py-2 mt-1 disabled:bg-gray-700"
          type="submit"
          disabled={isLoading}
        >
          Submit
        </Button>
        {isError && (
          <p className="text-dirty-pink font-semibold">{error.response.data}</p>
        )}
      </div>
    </form>
  );
};

export default HeroBasicInfo;
