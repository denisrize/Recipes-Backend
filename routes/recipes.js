var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


/**
<<<<<<< HEAD
 * This path returns a full details of a random number of recipes if full = true or else return preview
 */
router.get("/random", async (req, res, next) => {
  number = 3
  try {
    if(req.query.number){
      num = req.query.number;
      if(num > 10 || num < 1)
        throw { status: 400, message: "number must be between 1 and 10." };
      number = req.query.number
    }
    const recipes = await recipes_utils.getRandomRecipeDetails(number);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});
/**
 * This path returns a full details of a recipe by its id if full = true or else return preview
 */
router.get("/search", async (req, res, next) => {
  try {
    let { query, n, cuisines, diet, intolerances} = req.query;

    if(!query)
      throw { status: 400, message: "must be a query for search." };

    let numberOfResults =5;
    let numbers = ['5', '10', '15'];

    if(n){
      if(!numbers.includes(n))
        throw { status: 400, message: "n must be equal to 5,10 or 15." };
      
      numberOfResults = n;
    }

    let params = {
      query: req.query.query
    }

    if(cuisines) params.cuisines = cuisines;
    if(diet) params.diet = diet;
    if(intolerances) params.intolerances = intolerances;

    const recipes = await recipes_utils.getSearchRecipeDetails(params, numberOfResults);

    res.send(recipes); // need to check what do, in case that number of result is smaller then 5.
  } catch (error) {
    next(error);
  }
});

router.get("/:recipeId", async (req, res, next) => {
  try {
    if(req.query.full){
      const recipe = await recipes_utils.getFullRecipeDetails(req.params.recipeId);
      res.send(recipe);
    }
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
