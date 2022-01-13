import IngredientsList from "./classes/IngredientsList.js";
import recipes from "../recipes.js";
import RecipeList from "./classes/RecipeList.js";
import Appareils from "./classes/Appareils.js";

let list = new RecipeList();
let ingredientsFilter = new IngredientsList(list);
let appliancesFilter = new Appareils(list);
list.addFilter(ingredientsFilter);
list.addFilter(appliancesFilter);
list.build(recipes);
list.display();



