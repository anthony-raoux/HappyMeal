// système d’autocomplétion
document.addEventListener("DOMContentLoaded", function() {
  // Récupération des données du fichier JSON
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
          const recettes = data.recettes;

          // Écoute des événements de saisie dans la barre de recherche
          const input = document.getElementById('myInput');
          input.addEventListener('input', function(event) {
              const searchTerm = event.target.value.toLowerCase();

              // Filtrage des résultats en fonction du terme de recherche
              const filteredRecettes = recettes.filter(recette =>
                  recette.nom.toLowerCase().includes(searchTerm)
              );

              // Affichage des résultats filtrés dans la liste déroulante
              const autocompleteContainer = document.getElementById('autocompleteContainer');
              autocompleteContainer.innerHTML = '';
              filteredRecettes.forEach(recette => {
                  const listItem = document.createElement('a');
                  listItem.classList.add('list-group-item');
                  listItem.href = '#';
                  listItem.textContent = recette.nom;
                  listItem.dataset.id = recette.id;
                  autocompleteContainer.appendChild(listItem);

                  // Ajout de l'écouteur d'événement pour charger la recette au clic sur un élément de l'autocomplétion
                  listItem.addEventListener('click', function() {
                      chargerRecette(recette.nom);
                  });
              });
          });
      })
      .catch(error => console.error('Erreur lors de la récupération des données JSON :', error));

  // Fonction pour charger les recettes depuis le fichier JSON
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
          .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
  }

  // Fonction pour afficher la recette sélectionnée
  function afficherRecette(recette) {
      // Rediriger vers la page recette.html avec les détails de la recette sélectionnée
      window.location.href = `recette.html?nom=${encodeURIComponent(recette.nom)}&categorie=${encodeURIComponent(recette.categorie)}&temps_preparation=${encodeURIComponent(recette.temps_preparation)}&ingredients=${encodeURIComponent(JSON.stringify(recette.ingredients))}&etapes=${encodeURIComponent(JSON.stringify(recette.etapes))}`;
  }
});

        // Fonction pour récupérer les données JSON
        async function fetchRecettes() {
            try {
                // Récupérer les données JSON depuis le serveur
                const response = await fetch('data.json');
                const recettesJson = await response.json();
                
                // Appeler la fonction pour afficher une recette aléatoire
                recetteAleatoire(recettesJson);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        }

        // Fonction pour sélectionner une recette aléatoire
        function recetteAleatoire(recettesJson) {
            // Sélectionner une recette aléatoirement
            const recettes = recettesJson.recettes;
            const recetteAleatoire = recettes[Math.floor(Math.random() * recettes.length)];

            // Construction du HTML pour afficher la recette
            let recetteHTML = `
                <img src="${recetteAleatoire.image}" alt="${recetteAleatoire.nom}">
                <h2>${recetteAleatoire.nom}</h2>
                <p><strong>Catégorie:</strong> ${recetteAleatoire.categorie}</p>
                <p><strong>Temps de préparation:</strong> ${recetteAleatoire.temps_preparation}</p>
                <h3>Ingrédients:</h3>
                <ul>
            `;

            // Ajouter les ingrédients à la liste
            recetteAleatoire.ingredients.forEach(ingredient => {
                recetteHTML += `<li>${ingredient.nom}: ${ingredient.quantite}</li>`;
            });

            // Ajouter les étapes de préparation
            recetteHTML += `</ul>
                <h3>Étapes:</h3>
                <ol>
            `;
            recetteAleatoire.etapes.forEach(etape => {
                recetteHTML += `<li>${etape}</li>`;
            });

            // Fermer les balises ouvertes
            recetteHTML += `</ol>`;

            // Afficher la recette dans le div avec l'id "recette"
            document.getElementById('recette').innerHTML = recetteHTML;
        }

        // Appeler la fonction pour récupérer les données JSON et afficher une recette aléatoire
        window.onload = fetchRecettes;
 



















  // COOKIES
