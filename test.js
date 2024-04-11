document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour charger une recette spécifique
    function chargerRecette(nomRecette) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const recette = data.recettes.find(recette => recette.nom === nomRecette);
                if (recette) {
                    afficherRecette(recette);
                } else {
                    console.error(`Recette "${nomRecette}" non trouvée.`);
                }
            })
            .catch(error => console.error('Erreur lors de la récupération des données JSON :', error));
    }

    // Fonction pour afficher la recette sélectionnée
    function afficherRecette(recette) {
        const params = new URLSearchParams();
        params.append('nom', recette.nom);
        params.append('categorie', recette.categorie);
        params.append('temps_preparation', recette.temps_preparation);
        params.append('ingredients', JSON.stringify(recette.ingredients));
        params.append('etapes', JSON.stringify(recette.etapes));

        window.location.href = `recette.html?${params.toString()}`;
    }

    // Fonction pour afficher les résultats filtrés dans la liste déroulante
    function afficherResultatsFiltres(recettes) {
        const autocompleteContainer = document.getElementById('autocompleteContainer');
        autocompleteContainer.innerHTML = '';
        recettes.sort((a, b) => a.nom.localeCompare(b.nom)).forEach(recette => {
            const listItem = document.createElement('a');
            listItem.classList.add('list-group-item');
            listItem.href = '#';
            listItem.textContent = recette.nom;
            listItem.dataset.id = recette.id;
            listItem.addEventListener('click', function() {
                chargerRecette(recette.nom);
            });

            autocompleteContainer.appendChild(listItem);
        });
    }

    // Fonction pour gérer l'ajout ou la suppression d'une recette aux favoris
    function toggleFavorite(buttonId, recetteNom) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                let favoris = data.favoris || [];
                let isAdded = favoris.some(fav => fav.id === buttonId);

                if (isAdded) {
                    favoris = favoris.filter(fav => fav.id !== buttonId);
                } else {
                    favoris.push({ id: buttonId, nom: recetteNom });
                }

                data.favoris = favoris;

                // Mettre à jour le fichier JSON avec les nouveaux favoris
                fetch('data.json', {
                    method: 'PUT', // Utiliser la méthode PUT pour écrire dans le fichier JSON
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(() => {
                    // Mettre à jour l'apparence du bouton
                    updateButtonAppearance(document.querySelector(`[data-button-id="${buttonId}"]`), !isAdded);

                    const toast = isAdded ? document.getElementById('nourritureEnFavori2') : document.getElementById('nourritureEnFavori1');
                    new bootstrap.Toast(toast).show();
                })
                .catch(error => console.error('Erreur lors de la mise à jour du fichier JSON :', error));
            })
            .catch(error => console.error('Erreur lors de la récupération des données JSON :', error));
    }

    // Parcours de tous les boutons et ajout des écouteurs d'événements
    document.querySelectorAll('.addToFavoritesBtn').forEach(addButton => {
        const buttonId = addButton.dataset.buttonId;
        const recetteNom = addButton.dataset.nom;
        addButton.addEventListener('click', function() {
            toggleFavorite(buttonId, recetteNom);
        });
    });

    // Écoute des événements de saisie dans la barre de recherche
    const input = document.getElementById('myInput');
const searchMessage = document.getElementById('searchMessage');

input.addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    if (searchTerm.length > 0) {
        searchMessage.style.display = 'none';
    } else {
        searchMessage.style.display = 'block';
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filteredRecettes = data.recettes.filter(recette =>
                recette.nom.toLowerCase().includes(searchTerm)
            );
            afficherResultatsFiltres(filteredRecettes);
        })
        .catch(error => console.error('Erreur lors de la récupération des données JSON :', error));
});

    

    // Ajout des écouteurs d'événements pour chaque bouton de recette
    document.getElementById('btnPouletHerbes').addEventListener('click', () => chargerRecette('Poulet rôti aux herbes'));
    document.getElementById('btnSaladeQuinoa').addEventListener('click', () => chargerRecette('Salade de quinoa aux légumes grillés'));
    document.getElementById('btnTartePommes').addEventListener('click', () => chargerRecette('Tarte aux pommes'));
});
