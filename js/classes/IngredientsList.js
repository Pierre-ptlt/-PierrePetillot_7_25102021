import Ingredient from "./Ingredient.js";

class IngredientsList
{
    constructor()
    {
        this.all = new Set();
        this.selected = new Set();
        this.filtered = new Set();
    }

    build(recipes)
    {
        recipes.forEach(recipe => {

            recipe.ingredients.forEach(item => {
                let ingredient = new Ingredient(item);
                this.all.add(ingredient);
            });
        });
        console.log(this.all);
    }

    displayAll()
    {
        let html = "";
        this.all.forEach(ingredient => {
            html += ingredient.renderDropdown();
        });
        document.getElementById("ingredientsFilterContent").innerHTML = html;
    }

    maskAll()
    {
        document.getElementById("ingredientsFilterContent").innerHTML = "";
    }

    listen()
    {
        this.listenForDropdownChevron();
        this.listenForResearch();
        this.listenForDropdown();
    }

    listenForResearch()
    {
        const el = document.getElementById("ingredientsBar");
        el.addEventListener("click", () => {
        el.setAttribute("value", "");
        });

        document.querySelector('*').addEventListener('click', (e) =>
        {
            if(e.target.getAttribute('id') != 'ingredientsBar')
             {
                el.setAttribute("value", "Ingredients");
             }
        });
    }

    listenForDropdownChevron()
    {
        const filter = document.querySelectorAll('.filterIngr');

        document.getElementById('ingredientsFilter').addEventListener('click', () => {
            document.getElementById('chevronIngredients').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up filterChevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg>';
            this.displayAll();
        });
        document.querySelector('*').addEventListener('click', (e) =>
            {
                if(e.target.getAttribute('id') != 'ingredientsFilter')
                {
                    document.getElementById('chevronIngredients').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down filterChevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>';
                    this.maskAll();
                }
            });
    }

    listenForDropdown()
    {
        const filter = document.getElementById('ingredientsFilter');
        const bar = document.getElementById('ingredientsBar');

        filter.addEventListener('click', () => {
            filter.style.width = "450px";
            filter.style.height = "350px";
            bar.style.width = "300px";
        });

        document.querySelector('*').addEventListener('click', (e) =>
        {
            if (e.target.getAttribute("id") != 'ingredientsFilter')
            {
                filter.style.width = "180px"
                filter.style.height = "50px";
                bar.style.width = "120px";
            }
        });
    }
}

export default IngredientsList;