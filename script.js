// AUTOCONPLETION
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
