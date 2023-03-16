import HeroItem from "./HeroItem";

const HeroesList = ({ heroes, onDeleteHero }) => {
  const content = heroes.map((hero) => (
    <HeroItem
      name={hero.name}
      image={hero.image}
      key={hero._id}
      id={hero._id}
      onDeleteHero={onDeleteHero}
    />
  ));
  return <>{content}</>;
};

export default HeroesList;
