import { useEffect, useState } from "react";

const imageRegex =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const useValidator = ({ name, image, role, type, weakness, strength }) => {
  const [nameError, setNameError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [weaknessError, setWeaknessError] = useState(null);
  const [strengthError, setStrenghError] = useState(null);

  const validate = () => {
    console.log(name);
    if (name.trim() === "") {
      setNameError("Name cannot be empty");
    }
    if (!imageRegex.test(image)) {
      setImageError("Invalid or empty image");
    }
    if (role === "") {
      setRoleError("Role cannot be empty");
    }
    if (type === "") {
      setTypeError("Type cannot be empty");
    }
    if (weakness === "") {
      setWeaknessError("Weakness cannot be empty");
    }
    if (strength === "") {
      setStrenghError("Strength cannot be empty");
    }
  };

  return {
    validate,
    imageError,
    nameError,
    typeError,
    roleError,
    strengthError,
    weaknessError,
  };
};

export default useValidator;
