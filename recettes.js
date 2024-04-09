// Fonction pour charger les recettes depuis le fichier JSON
function chargerRecettes() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const recettesListe = document.getElementById('recettes-liste');
            data.recettes.forEach(recette => {
                const bouton = document.createElement('button');
                bouton.textContent = recette.nom;
                bouton.addEventListener('click', () => afficherRecette(recette));
                recettesListe.appendChild(bouton);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des données JSON :', error));
}

// Fonction pour afficher la recette sélectionnée
function afficherRecette(recette) {
    // Rediriger vers la page recette.html avec les détails de la recette sélectionnée
    window.location.href = `recette.html?nom=${encodeURIComponent(recette.nom)}&categorie=${encodeURIComponent(recette.categorie)}&temps_preparation=${encodeURIComponent(recette.temps_preparation)}&ingredients=${encodeURIComponent(JSON.stringify(recette.ingredients))}&etapes=${encodeURIComponent(JSON.stringify(recette.etapes))}`;
}

// Appel de la fonction pour charger les recettes au chargement de la page
chargerRecettes();
