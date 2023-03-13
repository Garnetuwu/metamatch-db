export const traits = [
  ["mobility", ["low mobility", "high mobility"]],
  ["damage", ["low damage", "high damage"]],
  ["sustain", ["low sustain", "high sustain"]],
  ["range", ["short range", "long range"]],
  ["accuracy", ["low accuracy", "high accuracy"]],
  ["burst", ["easy to get bursted", "high burst damage"]],
];

let strength = [];
let weakness = [];

traits.filter((trait) => weakness.push(trait[1][0]));
traits.filter((trait) => strength.push(trait[1][1]));

export { weakness, strength };

export const role = ["tank", "support", "DPS"];

export const type = ["dive", "brawl", "spam", "flex"];
