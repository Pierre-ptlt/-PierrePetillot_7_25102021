import Recipe from "./Recipe.js";

class RecipeList
{
    constructor()
    {
        this.all = [];
        this.filtered = [];
    }

    build(recipes)
    {
        recipes.forEach(item => {
            let recipe = new Recipe(item);
            this.all.push(recipe);
        });
        this.filtered = this.all;
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
}

export default RecipeList;
