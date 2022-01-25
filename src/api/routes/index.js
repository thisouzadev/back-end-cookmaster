const express = require('express');
const { addUsers } = require('../controllers/users.controllers');
const { login } = require('../controllers/login.controllers');
const {
  addRecipes,
  getAllRecipes,
  getByIdRecipe,
  updateRecipe,
  excludeRecipe,
} = require('../controllers/recipes.controllers');
const { authValidate } = require('../middlewares/auth');

const router = express.Router();

router.post('/users', addUsers);
router.post('/login', login);
router.post('/recipes', authValidate, addRecipes);
router.put('/recipes/:id', authValidate, updateRecipe);
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getByIdRecipe);
router.delete('/recipes/:id', authValidate, excludeRecipe);
module.exports = router;
