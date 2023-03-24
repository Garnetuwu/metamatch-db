import HeroItem from "./HeroItem";
import filterHeroesByRole from "../../utils/filterHeroesByRole";

const displayTitle =
  " text-center py-2 text-md col-span-5 border-b-2 border-dotted border-dirty-pink";

const HeroesList = ({ heroes }) => {
  const displayHeroesByRole = (heroesArray) => {
    const content = heroesArray.map((hero) => (
      <HeroItem
        name={hero.name}
        image={hero.image}
        key={hero._id}
        id={hero._id}
      />
    ));

    return content;
  };

  const { supportHeroes, dpsHeroes, tankHeroes } = filterHeroesByRole(heroes);
  const supportContent = displayHeroesByRole(supportHeroes);
  const dpsContent = displayHeroesByRole(dpsHeroes);
  const tankContent = displayHeroesByRole(tankHeroes);

  return (
    <>
      <p className={displayTitle}>Support</p>
      {supportContent}
      <p className={displayTitle}>DPS</p>
      {dpsContent}
      <p className={displayTitle}>Tanks</p>
      {tankContent}
    </>
  );
};

export default HeroesList;
