class Recipe {

    constructor(data)
    {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
    }

    render()
    {   let ingredientsHTML = '';
        this.ingredients.forEach(element => {
            ingredientsHTML += this.renderingredient(element);
        });
        return `
        <div class="recipeItem">
            <div class="recipeImage"></div>
            <div class="recipeContent">
                <div class="recipeTitleWrapper">
                    <h2 class="recipeTitle">${this.name}</h2>
                    <div class="timeWrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        <p class="recipeTime">${this.time} min</p>
                    </div>
                </div>
                <div class="recipeTextWrapper">
                    <div class="recipeingredients">${ingredientsHTML}</div>
                    <span class="recipeDescription">${this.description}</span>
                </div>
            </div>
        </div>
        `;
    }

    renderingredient(ingredient)
    {
        if (!ingredient.unit)
        {
            ingredient.unit = '';
        }

        if (ingredient.unit == "grammes")
        {
            ingredient.unit = 'g';
        }

        if (!ingredient.quantity)
        {
            return `<p class="recipeingredient"><b>${ingredient.ingredient}</b></p>
        `;
        }
        return `<p class="recipeingredient"><b>${ingredient.ingredient}:</b> ${ingredient.quantity} ${ingredient.unit}</p>
        `;
    }
}

export default Recipe;
