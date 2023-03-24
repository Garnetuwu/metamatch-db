const filterHeroesByRole = (data, isRelations = false) => {
  if (isRelations) {
    const supportHeroes = data.filter((el) => el.hero.role === "support");
    const dpsHeroes = data.filter((el) => el.hero.role === "dps");
    const tankHeroes = data.filter((el) => el.hero.role === "tank");
    return { supportHeroes, dpsHeroes, tankHeroes };
  }
  const supportHeroes = data.filter((el) => el.role === "support");
  const dpsHeroes = data.filter((el) => el.role === "dps");
  const tankHeroes = data.filter((el) => el.role === "tank");
  return { supportHeroes, dpsHeroes, tankHeroes };
};

export default filterHeroesByRole;
