class IngredientsList
{
    constructor(list)
    {
        this.all = new Set();
        this.selected = new Set();
        this.filtered = new Set();
        this.recipes = list;
    }

    createDropdown()
    {
        document.getElementById('filters').innerHTML = `<div class="ingredientsFilter filterIngr" id="ingredientsFilter">
                    <div class="filterDesign">
                    <h2 class="filterTitle" id="ingredientsTitle">Ingredients</h2>
                    <input name="ingredientsBar" class="ingredientsBar filterIngr" id="ingredientsBar">
                    <div id="chevronIngredients" class="chevron filterIngr">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down filterChevron" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
                <div class="filterContent" id="ingredientsFilterContent"></div>
                </div>`;
    }


    build()
    {
        this.recipes.all.forEach(recipe => {

            recipe.ingredients.forEach(item => {
                this.all.add(item.ingredient.toLowerCase());
            });
        });
        this.createDropdown();
    }

    displayAll()
    {
        let html = "";
        this.all.forEach(ingredient => {
            html += `<span class="filterIngredient" data-id="${ingredient}">${ingredient}</span>`;
        });
        document.getElementById("ingredientsFilterContent").innerHTML = html;
    }

    maskAll()
    {
        document.getElementById("ingredientsFilterContent").innerHTML = "";
    }

    listen()
    {
        this.listenForResearch();
        this.listenForDropdown();
    }

    listenForResearch()
    {
        const el = document.getElementById("ingredientsBar");
        const btn = document.getElementById("ingredientsTitle");

        document.querySelector('body').addEventListener('click', (e) =>
        {
            if(e.target.getAttribute('id') != 'ingredientsTitle')
             {
                if(e.target.getAttribute('id') != 'ingredientsBar')
                {
                    el.style.display = "none";
                    btn.style.display = "block";
                }
             }
        });
    }

    listenForDropdown()
    {
        const filter = document.getElementById('ingredientsFilter');
        const bar = document.getElementById('ingredientsBar');
        const btn = document.getElementById("ingredientsTitle");
        const content = document.getElementById('ingredientsFilterContent');

        filter.addEventListener('click', () => {
            filter.style.width = "450px";
            filter.style.height = "600px";
            btn.style.display = "none";
            content.style.display = "flex";
            bar.style.display = "block";
            document.getElementById('chevronIngredients').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up filterChevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg>';
            this.displayAll();
            this.listenForSelection();

        });

        document.querySelector('body').addEventListener('click', (e) =>
        {
            const closest = e.target.closest(".ingredientsFilter");
            const closest2 = e.target.closest(".filterIngredient");

            if ((e.target.getAttribute("id") != 'ingredientsFilter') && !closest && !closest2)
            {
                filter.style.width = "180px";
                filter.style.height = "50px";
                content.style.display = "none";
                bar.style.display = "none";
                btn.style.display = "block";
                document.getElementById('chevronIngredients').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down filterChevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>';
                this.maskAll();
            }
        });
    }

    listenForSelection()
    {
        document.querySelectorAll(".filterIngredient").forEach(ingredient => {
            ingredient.addEventListener('click', () => {
                this.selected.add(ingredient.getAttribute("data-id"));
                this.displaySelection();
                this.filterRecipes();
                this.recipes.display();
            });
        });

        document.querySelectorAll(".selectionRemove").forEach(button => {
            button.addEventListener('click', () => {
                this.selected.delete(button.getAttribute("data-id"));
                this.displaySelection();
                this.filterRecipes();
                this.recipes.display();
            });
        });
    }

    displaySelection()
    {
        let html = "";
        this.selected.forEach(tag => {
            html += `<span class="tagInSelection">${tag} <svg class="selectionRemove" data-id="${tag}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg></span>`;
        });
        document.getElementById("filtersSelected").innerHTML = html;
        this.listenForSelection();
    }

    filterRecipes()
    {
        this.recipes.filtered = this.recipes.all.filter(recipe =>
            {
                let bool = false;
                recipe.ingredients.forEach(ingredient =>
                {
                    if (this.selected.has(ingredient.ingredient.toLowerCase()))
                    {
                    bool = true;
                    }
                });
            return bool;
            });
    }
}

export default IngredientsList;