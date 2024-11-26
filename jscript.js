const recipes = [
    {
        title: "Spaghetti Carbonara",
        image: "./images/spaghetti.jpg",
        description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        ingredients: ["Spaghetti", "Eggs", "Cheese", "Pancetta", "Black Pepper"],
        instructions: [
            "Boil pasta until al dente.",
            "Cook pancetta in a pan.",
            "Mix eggs and cheese in a bowl.",
            "Combine pasta with pancetta and egg mixture.",
        ],
        nutrition: "Calories: 400 per serving",
        prepTime: "20 minutes",
    },
    
];

const searchForm = document.getElementById("search-form");
const searchResults = document.getElementById("search-results");
const recipeDetail = document.getElementById("recipe-detail");
const favoritesList = document.getElementById("favorites-list");
const backToSearch = document.getElementById("back-to-search");
const saveRecipe = document.getElementById("save-recipe");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    performSearch();
});

backToSearch.addEventListener("click", () => {
    recipeDetail.style.display = "none";
    document.getElementById("search").style.display = "block";
});

saveRecipe.addEventListener("click", saveToFavorites);

// Functions
function performSearch() {
    const ingredientInput = document.getElementById("ingredients").value.toLowerCase();
    const cuisine = document.getElementById("cuisine").value.toLowerCase();
    const diet = document.getElementById("diet").value.toLowerCase();

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(ingredientInput))
    );

    displayResults(filteredRecipes);
}

function displayResults(filteredRecipes) {
    searchResults.innerHTML = "";

    if (filteredRecipes.length === 0) {
        searchResults.innerHTML = "<p>No recipes found. Try different keywords.</p>";
        return;
    }

    filteredRecipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" style="width:100%;max-width:300px;">
            <p>${recipe.description}</p>
            <button onclick="viewRecipe(${index})">View Recipe</button>
        `;
        searchResults.appendChild(recipeCard);
    });
}

function viewRecipe(index) {
    const recipe = recipes[index];

    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("recipe-image").src = recipe.image;
    document.getElementById("recipe-description").textContent = recipe.description;
    document.getElementById("nutritional-info").textContent = recipe.nutrition;
    document.getElementById("prep-time").textContent = recipe.prepTime;

    const ingredientsList = document.getElementById("ingredients-list");
    ingredientsList.innerHTML = recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("");

    const instructionsList = document.getElementById("instructions-list");
    instructionsList.innerHTML = recipe.instructions.map((step) => `<li>${step}</li>`).join("");

    saveRecipe.style.display = "block";
    saveRecipe.setAttribute("data-index", index);

    document.getElementById("search").style.display = "none";
    recipeDetail.style.display = "block";
}

function saveToFavorites() {
    const index = saveRecipe.getAttribute("data-index");
    const recipe = recipes[index];

    const favoriteItem = document.createElement("div");
    favoriteItem.innerHTML = `<p>${recipe.title}</p>`;
    favoritesList.appendChild(favoriteItem);
}
