//Votre script JavaScript pour afficher les recettes favorites
        document.addEventListener('DOMContentLoaded', function() {
            // Récupérer les éléments du conteneur des recettes favorites
            const favoriteRecipesContainer = document.getElementById('favoriteRecipesContainer');
            
            // Parcourir les clés du localStorage pour récupérer les recettes favorites
            for (let key in localStorage) {
                if (key.startsWith('favoriteRecipe_')) {
                    // Récupérer les informations de la recette depuis le localStorage
                    const cardInfoJSON = localStorage.getItem(key);
                    const cardInfo = JSON.parse(cardInfoJSON);

                    // Créer une carte HTML avec les informations récupérées
                    const cardHTML = `
                        <div class="card" data-card-id="${key}">
                            <div class="card-body">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h5 class="card-title">${cardInfo.title}</h5>
                                    <i class="bi bi-star text-warning addToFavoritesBtn"></i>
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <button type="button" class="bg-tangerin text-white border-0 py-2 px-3 rounded-pill">Primary</button>
                                    <h6>${cardInfo.price}</h6>
                                </div>
                            </div>
                        </div>
                    `;

                    // Ajouter la carte HTML au conteneur des recettes favorites
                    favoriteRecipesContainer.insertAdjacentHTML('beforeend', cardHTML);
                }
            }
        });