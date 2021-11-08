import recipes from "../recipes.js";
import RecipeList from "./classes/RecipeList.js";

let list = new RecipeList();
list.build(recipes);
list.display();
