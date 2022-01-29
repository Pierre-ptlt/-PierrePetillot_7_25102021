import Ingredients from "./classes/Ingredients.js";
import recipes from "../recipes.js";
import RecipeList from "./classes/RecipeList.js";
import Appareils from "./classes/Appareils.js";
import Ustensils from "./classes/Ustensils.js";

let list = new RecipeList();
let ingredientsFilter = new Ingredients(list);
let appliancesFilter = new Appareils(list);
let ustensilsFilter = new Ustensils(list);
list.addFilter(ingredientsFilter);
list.addFilter(appliancesFilter);
list.addFilter(ustensilsFilter);
list.build(recipes);
list.display();



