import Ingredient from "./Ingredient.js";

class IngredientsList
{
    constructor()
    {
        this.all = new Set();
        this.selected = new Set();
        this.filtered = new Set();
    }

    build(ingredients)
    {
        ingredients.forEach(item => {
            let ingredient = new Ingredient(item);
            this.all.add(ingredient);
        });
    }
}

export default IngredientsList;