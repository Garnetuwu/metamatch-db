import { createStore } from "redux";

const initialState = {
  name: "",
  role: "",
  type: "",
  image: "",
  weakness: "",
  strength: "",
  relationships: [
    {
      hero: {
        id: "",
        name: "",
        role: "",
      },
      name: "",
      score: 0,
      special: false,
      comment: "",
    },
  ],
};

const newHeroReducer = (state = initialState, action) => {
  if (action.type === "UPDATE") {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === "CLEAR_HERO") {
    return {
      ...initialState,
    };
  }
  return state;
};

export const store = createStore(newHeroReducer);
