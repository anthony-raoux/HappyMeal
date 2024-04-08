// Chargement des données JSON depuis un fichier externe
fetch('./js/data.json')
  .then(response => response.json())
  .then(data => {
    const recettes = data.recettes;
    afficherRecettes(pageCourante, recettes);
    afficherPagination(recettes);
  })
  .catch(error => console.error('Erreur lors du chargement des données JSON:', error));


// Variables pour pagination
const recettesParPage = 4;
let pageCourante = 1;

// Fonction pour afficher les recettes sur une page donnée
function afficherRecettes(page, recettes) {
  const debutIndex = (page - 1) * recettesParPage;
  const finIndex = debutIndex + recettesParPage;
  const recettesPage = recettes.slice(debutIndex, finIndex);

  const recettesContainer = document.getElementById('recettes-container');
  recettesContainer.innerHTML = '';

  recettesPage.forEach((recette, index) => {
    const recetteHTML = `
      <div class="card mb-3" id="recette-${index}">
        <img src="${recette.image}" class="card-img-top" alt="${recette.nom}">
        <div class="card-body">
          <h5 class="card-title">${recette.nom}</h5>
          <p class="card-text">${recette.categorie}</p>
          <p class="card-text">Temps de préparation: ${recette.temps_preparation}</p>
          <ul class="list-group list-group-flush">
            ${recette.ingredients.map(ingredient => `<li class="list-group-item">${ingredient.nom}: ${ingredient.quantite}</li>`).join('')}
          </ul>
          <h6 class="mt-3">Étapes:</h6>
          <ol>
            ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
          </ol>
          <button class="btn btn-primary" onclick="ajouterAuxFavoris(${index})">Ajouter aux favoris</button>
        </div>
      </div>
    `;
    recettesContainer.innerHTML += recetteHTML;
  });
}

// Fonction pour mettre en surbrillance la page active
function mettreEnSurbrillancePageActive() {
  const pagination = document.getElementById('pagination');
  const elements = pagination.getElementsByTagName('a');
  for (let i = 0; i < elements.length; i++) {
    elements[i].parentNode.classList.remove('active');
  }
  elements[pageCourante - 1].parentNode.classList.add('active');
}

// Fonction pour afficher les boutons de pagination
function afficherPagination(recettes) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const nombrePages = Math.ceil(recettes.length / recettesParPage);
  for (let i = 1; i <= nombrePages; i++) {
    const li = document.createElement('li');
    li.classList.add('page-item');
    const a = document.createElement('a');
    a.classList.add('page-link');
    a.href = '#';
    a.textContent = i;
    a.addEventListener('click', () => {
      pageCourante = i;
      afficherRecettes(pageCourante, recettes);
      mettreEnSurbrillancePageActive();
    });
    li.appendChild(a);
    pagination.appendChild(li);
  }

  mettreEnSurbrillancePageActive();
}

// Fonction pour ajouter une recette aux favoris
function ajouterAuxFavoris(recetteId) {
  // Logique pour ajouter la recette aux favoris (vous devez implémenter cela)
  console.log('Recette ajoutée aux favoris:', recetteId);
  // Mettre à jour l'interface utilisateur pour indiquer visuellement que la recette a été ajoutée aux favoris
  const recette = document.getElementById(`recette-${recetteId}`);
  recette.classList.toggle('favori');
}
