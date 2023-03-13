import { createStore } from "redux";
import { weakness, strength } from "../utils/heroTraits";

const initialState = {
  name: "",
  role: "",
  type: "",
  image: "",
  traits: [
    { name: "mobility", value: "" },
    { name: "sustain", value: "" },
    { name: "accuracy", value: "" },
    { name: "damage", value: "" },
    { name: "range", value: "" },
    { name: "burst", value: "" },
  ],
  weakness: [],
  strength: [],
  // relations: [
  //   {
  //     name: "",
  //     score: 0,
  //     special: false,
  //     comment: "",
  //   },
  // ],
};

const newHeroReducer = (state = initialState, action) => {
  if (action.type === "UPDATE") {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === "UPDATE_TRAIT") {
    const { traitType, value } = action.payload;
    //create a new array excluding the target element
    const updatedTraits = state.traits.filter(
      (trait) => trait.name !== traitType
    );

    const newTraitsArr = [...updatedTraits, { name: traitType, value }];
    console.log(newTraitsArr);

    let heroWeakness = [];
    let heroStrength = [];
    for (let trait of newTraitsArr) {
      if (weakness.includes(trait.value)) {
        heroWeakness.push(trait.value);
      } else if (strength.includes(trait.value)) {
        heroStrength.push(trait.value);
      }
    }
    console.log(heroWeakness, heroStrength);

    return {
      ...state,
      traits: newTraitsArr,
      strength: heroStrength,
      weakness: heroWeakness,
    };
  } else if (action.type === "CLEAR_TRAIT") {
    return {
      ...state,
      traits: [
        { name: "mobility", value: "" },
        { name: "sustain", value: "" },
        { name: "accuracy", value: "" },
        { name: "damage", value: "" },
        { name: "range", value: "" },
        { name: "burst", value: "" },
      ],
      weakness: [],
      strength: [],
    };
  } else if (action.type === "CLEAR_HERO") {
    return {
      ...initialState,
    };
  }
  return state;
};

export const store = createStore(newHeroReducer);
