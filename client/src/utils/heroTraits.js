export const traits = [
  { name: "mobility", value: ["low mobility", "high mobility"] },
  { name: "damage", value: ["low damage", "high damage"] },
  { name: "sustain", value: ["low sustain", "high sustain"] },
  { name: "range", value: ["short range", "long range"] },
  { name: "accuracy", value: ["low accuracy", "high accuracy"] },
  { name: "burst", value: ["easy to get bursted", "high burst damage"] },
];

let strengthList = [];
let weaknessList = [];

traits.filter((trait) => weaknessList.push(trait.value[0]));
traits.filter((trait) => strengthList.push(trait.value[1]));

export { weaknessList, strengthList };

export const roleList = ["tank", "support", "dps"];

export const typeList = ["dive", "brawl", "spam", "flex"];
