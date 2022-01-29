import Filter from "./Filter.js";

class Ingredients extends Filter
{
    constructor(list)
    {
        super(list, "ingredient", "Ingrédients");
    }

    collect(items)
    {
        this.filtered = [];
        items.forEach(recipe => {

            recipe.ingredients.forEach(item => {
                if (!this.filtered.includes(item.ingredient.toLowerCase()))
                {
                    this.filtered.push(item.ingredient.toLowerCase());
                }
            });
        });
    }

    filterRecipes(recipes)
    {
        this.recipes.filtered = recipes.filter(recipe =>
            {
                let i = 0;
                recipe.ingredients.forEach(ingredient =>
                {
                    if (this.selected.includes(ingredient.ingredient.toLowerCase()))
                    {
                        i++;
                    }
                });
                if (i === this.selected.length)
                {
                    return true;
                }
                return false;
            });
    }
}

export default Ingredients;