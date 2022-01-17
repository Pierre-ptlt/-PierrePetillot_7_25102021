import Recipe from "./Recipe.js";

class RecipeList
{
    constructor()
    {
        this.all = [];
        this.filtered = [];
        this.filters = [];
    }

    addFilter(filter)
    {
        this.filters.push(filter);
    }

    build(recipes)
    {
        recipes.forEach(item => {
            let recipe = new Recipe(item);
            this.all.push(recipe);
        });
        this.filtered = this.all;

        this.filters.forEach(filter => {
             filter.setup();
        });
    }

    display()
    {
        if (this.filtered.length == 0)
        {
            this.filtered = this.all;
        }
        let html = '';
        this.filtered.forEach(recipe => {
            html += recipe.render();
        });
        document.getElementById("recipes").innerHTML = html;
        this.filters.forEach(filter => {
            filter.collect(filter.recipes.filtered);
            filter.displayed = filter.filtered;
            filter.input = '';
        });
    }

    filter(unselect = false)
    {
        if (unselect)
        {
            this.filtered = this.all;
        }

        this.filters.forEach(filter => {
            filter.filterRecipes(this.filtered);
        });
    }
}

export default RecipeList;
