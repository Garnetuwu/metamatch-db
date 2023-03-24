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
  } else if (action.type === "UPDATE_RELATION") {
    let filteredHero = state.relationships.filter(
      (relation) => relation.hero.name === action.payload.name
    )[0];
    filteredHero = {
      ...filteredHero,
      ...action.payload.relation,
      touched: true,
    };
    let newRelations = [];
    state.relationships.map((relation) =>
      relation.hero.name === action.payload.name
        ? newRelations.push(filteredHero)
        : newRelations.push(relation)
    );

    return {
      ...state,
      relationships: [...newRelations],
    };
  }
  return state;
};

export const store = createStore(newHeroReducer);
