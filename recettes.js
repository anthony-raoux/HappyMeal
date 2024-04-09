// Fonction pour charger les recettes depuis le fichier JSON
// Sélection des boutons
const btnPouletHerbes = document.getElementById('btnPouletHerbes');
const btnSaladeQuinoa = document.getElementById('btnSaladeQuinoa');
const btnTartePommes = document.getElementById('btnTartePommes');

// Ajout des écouteurs d'événements pour chaque bouton
btnPouletHerbes.addEventListener('click', () => chargerRecette('Poulet rôti aux herbes'));
btnSaladeQuinoa.addEventListener('click', () => chargerRecette('Salade de quinoa aux légumes grillés'));
btnTartePommes.addEventListener('click', () => chargerRecette('Tarte aux pommes'));

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
        .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
}

// Fonction pour afficher la recette sélectionnée
function afficherRecette(recette) {
    // Rediriger vers la page recette.html avec les détails de la recette sélectionnée
    window.location.href = `recette.html?nom=${encodeURIComponent(recette.nom)}&categorie=${encodeURIComponent(recette.categorie)}&temps_preparation=${encodeURIComponent(recette.temps_preparation)}&ingredients=${encodeURIComponent(JSON.stringify(recette.ingredients))}&etapes=${encodeURIComponent(JSON.stringify(recette.etapes))}`;
}
