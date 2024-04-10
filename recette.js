// Fonction pour charger les recettes depuis le fichier JSON
// Sélection des boutons
const btnPouletHerbes = document.getElementById('btnPouletHerbes');
const btnSaladeQuinoa = document.getElementById('btnSaladeQuinoa');
const btnTartePommes = document.getElementById('btnTartePommes');
const btnsoupelentilles = document.getElementById('btnsoupelentilles');
const btnpatescarbo = document.getElementById('btnpatescarbo');
const btnrizoignon = document.getElementById('btnrizoignon');
const btnsaladedefruits = document.getElementById('btnsaladedefruits');
const btnratatouille = document.getElementById('btnratatouille');
const btnsaladecesar = document.getElementById('btnsaladecesar');
const btnrisotochampignon = document.getElementById('btnrisotochampignon');
const btnmuffins = document.getElementById('btnmuffins');
const btnlasagnes = document.getElementById('btnlasagnes');
const btnsaladenicoise = document.getElementById('btnsaladenicoise');
const btntiramisu = document.getElementById('btntiramisu');
const btnoeufmollet = document.getElementById('btnoeufmollet');


// Ajout des écouteurs d'événements pour chaque bouton
btnPouletHerbes.addEventListener('click', () => chargerRecette('Poulet rôti aux herbes'));
btnSaladeQuinoa.addEventListener('click', () => chargerRecette('Salade de quinoa aux légumes grillés'));
btnTartePommes.addEventListener('click', () => chargerRecette('Tarte aux pommes'));
btnsoupelentilles.addEventListener('click', () => chargerRecette('Soupe de lentilles'));
btnpatescarbo.addEventListener('click', () => chargerRecette('Pâtes Carbonara'));
btnrizoignon.addEventListener('click', () => chargerRecette('Riz aux oignons'));
btnsaladedefruits.addEventListener('click', () => chargerRecette('Salade de fruits frais'));
btnratatouille.addEventListener('click', () => chargerRecette('Ratatouille provençale'));
btnsaladecesar.addEventListener('click', () => chargerRecette('Salade César'));
btnrisotochampignon.addEventListener('click', () => chargerRecette('Risotto aux champignons'));
btnmuffins.addEventListener('click', () => chargerRecette('Muffins aux myrtilles'));
btnlasagnes.addEventListener('click', () => chargerRecette('Lasagnes végétariennes'));
btnsaladenicoise.addEventListener('click', () => chargerRecette('Salade niçoise'));
btntiramisu.addEventListener('click', () => chargerRecette('Tiramisu'));
btnoeufmollet.addEventListener('click', () => chargerRecette('Oeuf mollet'));

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

  // Fonction pour obtenir les paramètres de l'URL
  function obtenirParametresUrl() {
    const params = new URLSearchParams(window.location.search);
    const recette = {
        nom: params.get('nom'),
        categorie: params.get('categorie'),
        temps_preparation: params.get('temps_preparation'),
        ingredients: JSON.parse(params.get('ingredients')),
        etapes: JSON.parse(params.get('etapes'))
    };
    return recette;
}
