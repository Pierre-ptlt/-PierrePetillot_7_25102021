import IngredientsList from "./classes/IngredientsList.js";
import recipes from "../recipes.js";
import RecipeList from "./classes/RecipeList.js";

let el = document.getElementById("ingredientsBar");

let list = new RecipeList();
list.build(recipes);
list.display();

if(el)
{
    el.addEventListener("click", () => {
    console.log('est');
    el.setAttribute("value", "");
});
}

let ingredientsList = new IngredientsList();

ingredientsList.build(recipes.ingredients);