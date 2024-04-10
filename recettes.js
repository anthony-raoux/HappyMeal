// Récupérer toutes les recettes
const recettes = document.querySelectorAll('.col');

// Nombre de recettes par page
const recettesParPage = 6;

// Calculer le nombre total de pages
const nombreDePages = Math.ceil(recettes.length / recettesParPage);

// Fonction pour afficher les recettes de la page donnée
function afficherRecettes(page) {
    const debut = (page - 1) * recettesParPage;
    const fin = debut + recettesParPage;
    recettes.forEach((recette, index) => {
        if (index >= debut && index < fin) {
            recette.style.display = 'block';
        } else {
            recette.style.display = 'none';
        }
    });
}

// Fonction pour générer les boutons de pagination
function genererPagination() {
    const pagination = document.getElementById('pagination');
    for (let i = 1; i <= nombreDePages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', () => {
            afficherRecettes(i);
            // Ajouter la classe 'active' au bouton actif
            const boutonsPagination = document.querySelectorAll('.page-link');
            boutonsPagination.forEach(bouton => {
                bouton.classList.remove('active');
            });
            a.classList.add('active');
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }
}

// Afficher la première page par défaut
afficherRecettes(1);
// Générer les boutons de pagination
genererPagination();
