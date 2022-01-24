import Recipe from "./Recipe.js";

class RecipeList
{
    constructor()
    {
        this.all = [];
        this.filtered = [];
        this.filters = [];
        this.input = "Rechercher un ingrédient, appareil, ustensile ou une recette";
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
        bar.value = this.input;

        bar.addEventListener('click', () => {
            bar.value = '';
        });

        document.querySelector('body').addEventListener('click', (e) =>
        {
            if(e.target.getAttribute('id') == 'logo-wrapper' || e.target.getAttribute('id') == "filters" || e.target.getAttribute('id') == "filtersSelected")
             {
                bar.value = this.input;
                this.filtered = this.all;
                this.display();
             }
        });

        bar.addEventListener('input', (e) => {
            let search = e.target.value;
            if (e.target.value.length > 2)
            {
                this.research(search.toLowerCase());
            }
            else
            {
                this.filtered = this.all;
                this.display();
            }
        });
    }

    research(str)
    {
        this.filtered = [];
         for (const recipe of this.all)
         {
            if(recipe.name.toLowerCase().includes(str))
            {
                this.filtered.push(recipe);
                console.log(this.filtered);
            }
            if(recipe.appliance.toLowerCase().includes(str))
            {
                this.filtered.push(recipe);
                console.log(this.filtered);
            }
            for (const ustensil of recipe.ustensils)
            {
                if(ustensil.toLowerCase().includes(str))
                {
                    this.filtered.push(recipe);
                    console.log(this.filtered);
                }
            }
            for(const ingredient of recipe.ingredients)
            {
                if(ingredient.ingredient.toLowerCase().includes(str))
                {
                    this.filtered.push(recipe);
                    console.log(this.filtered);
                }
            }
         }
         this.display();
    }
}

export default RecipeList;
