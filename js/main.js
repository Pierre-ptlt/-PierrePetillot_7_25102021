import IngredientsList from "./classes/IngredientsList.js";
import recipes from "../recipes.js";
import RecipeList from "./classes/RecipeList.js";

let list = new RecipeList();
let ingredientsList = new IngredientsList(list);
list.build(recipes);
list.display();
ingredientsList.setup();


