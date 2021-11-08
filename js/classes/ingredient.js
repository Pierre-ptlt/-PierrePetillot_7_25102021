class Ingredient {

    constructor(data) {
        this.ingredient = data.ingredient;
        this.quantity = data.quantity;
        this.unit = data.unit;
    }

    render()
    {
        if (!this.unit)
        {
            this.unit = '';
        }

        if (this.unit == "grammes")
        {
            this.unit = 'g';
        }

        if (!this.quantity)
        {
            return `<p class="recipeIngredient"><b>${this.ingredient}</b></p>
        `;
        }
        return `<p class="recipeIngredient"><b>${this.ingredient}:</b> ${this.quantity} ${this.unit}</p>
        `;
    }
}

export default Ingredient;