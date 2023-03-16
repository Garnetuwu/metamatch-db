import Label from "../UI/Label";
import Input from "../UI/Input";
import RadioGroup from "../UI/RadioGroup";
import Button from "../UI/Button";
import { role, type, traits } from "../../utils/heroTraits";
import { useState } from "react";
import Divider from "../UI/Divider";
import { useDispatch } from "react-redux";
import ValidationMessage from "./ValidationMsg";
import capitalize from "../../utils/capitalize";

const HeroBasicInfo = () => {
  const [isTraitClear, setIsTraitClear] = useState(true);
  const [nameError, setNameError] = useState(null);
  const [urlError, setUrlError] = useState(null);
  const dispatch = useDispatch();
  const radioChangeHandler = () => {
    setIsTraitClear(false);
  };

  const nameHandler = (e) => {
    const name = capitalize(e.target.value);
    //validate
    const validName = name.trim() !== "";
    if (!validName) {
      return setNameError("name field must not be empty");
    }
    setNameError(null);
    dispatch({ type: "UPDATE", payload: { name } });
  };

  const urlHandler = (e) => {
    const url = e.target.value;
    console.log(url);
    //validate
    const validURL =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
        url
      ) && url.includes("https://drive.google.com");
    if (!validURL) {
      return setUrlError("invalid or empty url");
    }
    const id = url.split("/")[5];
    console.log(id);
    dispatch({ type: "UPDATE", payload: { image: id } });
  };

  return (
    <div className="grid grid-cols-6 gap-4 place-items-center p-3">
      {/* name */}
      <Label htmlFor="name">Name*</Label>
      <Input
        id="name"
        type="text"
        className={`col-span-3 ${nameError ? "outline-dirty-pink" : ""}`}
        onBlur={nameHandler}
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
        className={`col-span-3  ${urlError ? "outline-dirty-pink" : ""}`}
        onBlur={urlHandler}
      />

      {urlError ? (
        <span className="col-span-2" />
      ) : (
        <ValidationMessage className="col-span-2 place-self-stretch">
          {urlError}
        </ValidationMessage>
      )}

      {/* role */}
      <RadioGroup choices={role} groupName="role" />
      <span className="col-span-2" />

      {/* type */}
      <RadioGroup choices={type} groupName="type" />
      <span className="col-span-1" />

      <Divider className="col-span-6" />

      {/* traits */}
      <div className="col-span-6 text-sand underline underline-offset-4">
        You must pick at least one strength and one weakness
      </div>
      {traits.map((trait) => (
        <RadioGroup
          choices={trait[1]}
          groupName={trait[0]}
          key={trait[0]}
          onMakeChange={radioChangeHandler}
          isTraitClear={isTraitClear}
        />
      ))}

      <Button
        type="button"
        className="col-start-2 col-span-4 p-1"
        onClick={() => setIsTraitClear(true)}
      >
        Reset Traits
      </Button>
      <span className="col-span-1" />
    </div>
  );
};

export default HeroBasicInfo;
