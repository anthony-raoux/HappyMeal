let shoppingList = {};

function toggleIngredient(recipeIndex, ingredientIndex) {
    const recipe = recipes.recettes[recipeIndex];
    const ingredient = recipe.ingredients[ingredientIndex].nom;
    
    // Vérifier si l'ingrédient est déjà dans la liste de courses
    if (shoppingList.hasOwnProperty(ingredient)) {
        // Si oui, augmenter la quantité de 1
        shoppingList[ingredient]++;
    } else {
        // Sinon, ajouter l'ingrédient avec une quantité de 1
        shoppingList[ingredient] = 1;
    }
    
    openShoppingListModal(); // Rafraîchir la liste après chaque modification
}

function renderRecipes() {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.recettes.forEach((recipe, recipeIndex) => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('col-md-6', 'recipe');

        recipeElement.innerHTML = `
            <div class="card">
                <img class="card-img-top" src="${recipe.image}" alt="${recipe.nom}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.nom}</h5>
                    <p class="card-text"><strong>Catégorie:</strong> ${recipe.categorie}</p>
                    <p class="card-text"><strong>Temps de préparation:</strong> ${recipe.temps_preparation}</p>
                    <h6 class="card-subtitle mb-2 text-muted">Ingrédients:</h6>
                    <ul class="list-group list-group-flush">
                        ${recipe.ingredients.map((ingredient, index) => `
                            <li class="list-group-item">
                                ${ingredient.nom} - ${ingredient.quantite}
                                <button class="btn btn-sm btn-danger float-right" onclick="removeIngredient('${ingredient.nom}')">Supprimer</button>
                                <button class="btn btn-sm btn-primary float-right mr-2" onclick="toggleIngredient(${recipeIndex}, ${index})">Ajouter</button>
                            </li>
                        `).join('')}
                    </ul>
                    <h6 class="card-subtitle mb-2 text-muted mt-3">Étapes:</h6>
                    <ol class="card-text">
                        ${recipe.etapes.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}

function openShoppingListModal() {
    const shoppingListModal = document.getElementById('shoppingListModal');
    const shoppingListElement = document.getElementById('shoppingList');
    shoppingListElement.innerHTML = '';

    for (const [ingredient, quantity] of Object.entries(shoppingList)) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${ingredient} - ${quantity}`;
        shoppingListElement.appendChild(li);
    }

    $(shoppingListModal).modal('show');
}

function generateShoppingList() {
    const shoppingListArray = [];
    for (const [ingredient, quantity] of Object.entries(shoppingList)) {
        for (let i = 0; i < quantity; i++) {
            shoppingListArray.push(ingredient);
        }
    }
    const shoppingListText = shoppingListArray.join('\n');

    // Générer un fichier contenant la liste de courses
    const blob = new Blob([shoppingListText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'liste_de_courses.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Fermer le modal après téléchargement
    $('#shoppingListModal').modal('hide');
}

function removeIngredient(ingredientName) {
    if (shoppingList.hasOwnProperty(ingredientName)) {
        if (shoppingList[ingredientName] > 1) {
            // Si la quantité est supérieure à 1, décrémenter la quantité de 1
            shoppingList[ingredientName]--;
        } else {
            // Si la quantité est égale à 1, supprimer l'ingrédient de la liste
            delete shoppingList[ingredientName];
        }
    }
    openShoppingListModal(); // Rafraîchir la liste après la suppression
}

function clearShoppingList() {
    shoppingList = {};
    renderRecipes();
}

let recipes;

fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de réseau !');
        }
        return response.json();
    })
    .then(data => {
        // Faire quelque chose avec les données récupérées
        console.log(data);
        // Par exemple, vous pouvez appeler une fonction pour traiter les données
        recipes = data;
        renderRecipes();
    })
    .catch(error => {
        console.error('Il y a eu un problème avec la récupération des données:', error);
    });
