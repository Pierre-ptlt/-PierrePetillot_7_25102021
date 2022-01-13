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
    }

    filter()
    {
        let list = this.filtered;

        this.filters.forEach(filter => {
            list = filter.filterRecipes(list);
        });

        this.filtered = list;
        console.log(list);
    }
}

export default RecipeList;
