import Filter from "./Filter.js";

class Ustensils extends Filter
{
    constructor(list)
    {
        super(list, "ustensil", "Ustensiles");
    }

    collect(items)
    {
        this.filtered = [];
        items.forEach(recipe => {

            recipe.ustensils.forEach(item => {
                if (!this.filtered.includes(item.toLowerCase()))
                {
                    this.filtered.push(item.toLowerCase());
                }
            });
        });
    }

    filterRecipes(recipes)
    {
        this.recipes.filtered = recipes.filter(recipe =>
            {
                let i = 0;
                recipe.ustensils.forEach(item =>
                {
                    if (this.selected.includes(item.toLowerCase()))
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

export default Ustensils;