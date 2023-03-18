const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/CatchAsync");
const checkAuthMiddleware = require("../middleware/checkAuthMiddleware");
const Hero = require("../models/hero");
const ExpressError = require("../utils/Errors");

router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const params = req.params;
    try {
      const hero = await Hero.findOne({ _id: params.id }).populate({
        path: "relationships",
        populate: {
          path: "hero",
          model: "Hero",
          select: "name role",
        },
      });
      res.send(hero);
    } catch (e) {
      next(e);
    }
  })
);

router.put(
  "/:id",
  checkAuthMiddleware,
  catchAsync(async (req, res, next) => {
    const params = req.params;
    const body = req.body;
    console.log(body);
    if (!params.id) throw new ExpressError("no id found", 400);
    try {
      const updatedHero = await Hero.findOneAndUpdate(
        { _id: params.id },
        body.hero,
        {
          new: true,
        }
      );
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  })
);

router.delete(
  "/:id",
  checkAuthMiddleware,
  catchAsync(async (req, res, next) => {
    const params = req.params;
    if (!params.id) throw new ExpressError("no id found", 400);
    try {
      await Hero.findOneAndDelete({ _id: params.id });
      //delete this hero inside other heroes' relationships
      await Hero.updateMany(
        {},
        { $pull: { relationships: { hero: params.id } } }
      );
      res.send("deleted");
    } catch (e) {
      next(e);
    }
  })
);

router.get(
  "/",
  catchAsync(async (req, res) => {
    const allHeroes = await Hero.find({}, ["image", "role", "name"]);
    console.log("heros send");
    res.send(allHeroes);
  })
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
