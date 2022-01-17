import Filter from "./Filter.js";
class Appareils extends Filter
{

    constructor(list)
    {
        super (list, "appliance", "Appareils");
    }

    collect(items)
    {
        this.filtered = [];
        items.forEach(recipe => {
            if(!this.filtered.includes(recipe.appliance.toLowerCase()))
            {
                this.filtered.push(recipe.appliance.toLowerCase());
            }
        });
    }

    filterRecipes(recipes)
    {
        if (this.selected.length > 0)
        {
            this.recipes.filtered = recipes.filter(recipe =>
                {
                        return this.selected.includes(recipe.appliance.toLowerCase() );
                });
        }
        else
        {
            this.recipes.filtered = recipes;
        }
    }
}

export default Appareils;