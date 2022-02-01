import Recipe from "./Recipe.js";

class RecipeList
{
    constructor()
    {
        this.all = [];
        this.filtered = [];
        this.filters = [];
        this.input = "";
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

        this.listenForSearch();
    }

    display()
    {
        if (this.filtered.length == 0)
        {
            document.getElementById("recipes").style.display = "none";
            document.getElementById("error").style.display = "block";
        }else
        {
            document.getElementById("recipes").style.display = "flex";
            document.getElementById("error").style.display = "none";


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

    listenForSearch()
    {
        const bar = document.getElementById("search-input");

        bar.addEventListener('input', (e) => {
            let search = e.target.value;
            if (e.target.value.length > 2)
            {
                this.research(search.toLowerCase());
            }
            else
            {
                this.filtered = this.all;
            }
            this.display();
        });
    }

    research(str)
    {
         this.filtered = this.all.filter(recipe =>
         {
            if(recipe.ingredients.find(ingredient => ingredient.ingredient.toLowerCase().includes(str)))
            {
                return true;
            }
            if(recipe.description.toLowerCase().includes(str))
            {
                return true;
            }
            if(recipe.name.toLowerCase().includes(str))
            {
                return true;
            }
            if(recipe.appliance.includes(str))
            {
                return true;
            }
            return !! recipe.ustensils.find(ustensil => ustensil.includes(str));
         });
    }
}

export default RecipeList;
