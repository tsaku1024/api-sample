var express = require('express');
var recipe = require('../service/recipe-service')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message : "hello world!"})
});

router.get('/recipes/:id?', function(req, res, next) {
  recipe.getRecipes(req.params.id)
  .then(result => res.json({
    recipes : result
  }))
  .catch(error => {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" });
  });
});

router.post('/recipes', function(req, res, next) {  
  recipe.createRecipe(req.body)
  .then(result => res.json({
    message : "Recipe successfully created!",
    recipes : result
  }))
  .catch(error => {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" });
  });
});

router.patch('/recipes/:id', function(req, res, next) {  
  recipe.updateRecipe(req.params.id,req.body)
  .then(result => res.json({
    message : "Recipe successfully updated!",
    recipes : result
  }))
  .catch(error => {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" });
  });
});

router.delete('/recipes/:id', function(req, res, next) {  
  recipe.deleteRecipe(req.params.id,req.body)
  .then(result => {
    if(result.length > 0){
      res.json({message : "Recipe successfully removed!"});
    }
    else{
      res.json({message : "No recipe found"});
    }
  })
  .catch(error => {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" });
  });
});

module.exports = router;