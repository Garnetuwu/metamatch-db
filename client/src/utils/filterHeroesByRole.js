const filterHeroesByRole = (data) => {
  const supportHeroes = data.filter((el) => el.role === "support");
  const dpsHeroes = data.filter((el) => el.role === "dps");
  const tankHeroes = data.filter((el) => el.role === "tank");
  return { supportHeroes, dpsHeroes, tankHeroes };
};

export default filterHeroesByRole;
