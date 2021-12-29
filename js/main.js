import IngredientsList from "./classes/IngredientsList.js";
import recipes from "../recipes.js";
import RecipeList from "./classes/RecipeList.js";
import Appareils from "./classes/Appareils.js";

let list = new RecipeList();
let ingredientsList = new IngredientsList(list);
let appliancesList = new Appareils(list);
list.build(recipes);
list.display();
ingredientsList.setup();
appliancesList.setup();



