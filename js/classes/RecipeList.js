import Recipe from "./Recipe.js";

class RecipeList
{
    constructor()
    {
        this.all = [];
    }

    build(recipes)
    {
    recipes.forEach(item => {
        let recipe = new Recipe(item);
        this.all.push(recipe);
        });
    }

    display()
    {
        let html = '';
        this.all.forEach(recipe => {
            html = html += recipe.render();
            console.log(recipe);
        });
        console.log(html);
        document.getElementById("recipes").innerHTML = html;
    }
}

export default RecipeList;
