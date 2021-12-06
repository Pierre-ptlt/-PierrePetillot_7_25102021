class IngredientsList
{
    constructor()
    {
        this.all = new Set();
        this.selected = new Set();
        this.filtered = new Set();
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


    build(recipes)
    {
        recipes.forEach(recipe => {

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
            html += `<p class="filterIngredient">${ingredient}</p>`;
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
        this.listenForSelection();
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
        let selectBar = document.getElementById('filtersSelected');


        document.querySelectorAll(".filterIngredient").forEach(ingredient => {
            ingredient.addEventListener('click', () => {
                console.log('aa');
            });
        });
    }
}

export default IngredientsList;