const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/CatchAsync");
const checkAuthMiddleware = require("../middleware/checkAuthMiddleware");
const Hero = require("../models/hero");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const allHeroes = await Hero.find().select(["name", "image"]);
    console.log(allHeroes);
    res.send(allHeroes);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {})
);

router.post(
  "/new-hero",
  checkAuthMiddleware,
  catchAsync(async (req, res) => {
    const body = req.body;
    if (!req.body.newHero) throw new ExpressError("Invalid Hero data", 400);
    const repeatedHero = await Hero.findOne({ name: body.newHero.name });
    if (repeatedHero) {
      throw new ExpressError("Hero Already Existed", 400);
    }
    try {
      //extract id from all documents into an array
      const allHeroesID = await Hero.find().select("_id");

      if (allHeroesID) {
        //map ids into an array of relationship object
        const relationships = allHeroesID.map((id) => ({
          hero: id,
          score: 0,
          special: false,
          comment: "",
        }));

        //add the relationships to the newHero body
        body.newHero.relationships = relationships;
      }

      //create new hero document in the database
      const newHero = await Hero.create(body.newHero);

      //create a new relationship of this hero
      const newRelationshiop = {
        hero: newHero._id,
        score: 0,
        special: false,
        comment: "",
      };

      //update this new relationship to all the existing heroes
      await Hero.updateMany({}, { $push: { relationships: newRelationshiop } });
      res.send("Hero created successfully");
    } catch (e) {
      throw new ExpressError(e.message);
    }
  })
);

module.exports = router;
