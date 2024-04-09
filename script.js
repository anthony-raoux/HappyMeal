const foodItems = [
    "Poulet rôti aux herbes",
    "poulet",
    "Sushi",
    "Hamburger",
    "Tacos",
    "Pad Thai",
    "Chicken Tikka Masala",
    "Lasagne",
    "Croissant",
    "Samosa",
    "Pho",
    "Gyoza",
    "Fish and Chips",
    "Caesar Salad",
    "Moussaka",
    "Ramen",
    "Poutine",
    "Peking Duck",
    "Pierogi",
    "Goulash",
    "Falafel",
    "Schnitzel",
    "Tiramisu",
    "Ceviche",
    "Kimchi",
    "Pancakes",
    "Shawarma",
    "Pasta Carbonara",
    "Beef Stroganoff",
    "Sashimi",
    "Fajitas",
    "Ratatouille",
    "Paella",
    "Bruschetta",
    "Guacamole",
    "Empanadas",
    "Fondue",
    "Eggs Benedict",
    "Philly Cheesesteak",
    "Miso Soup",
    "Peking Duck",
    "Hummus"
  ];

  const input = document.getElementById('myInput');
  const autocompleteContainer = document.getElementById('autocompleteContainer');

  input.addEventListener('input', function() {
    closeAllLists();
    const val = this.value;
    if (!val) { return false; }
    for (let i = 0; i < foodItems.length; i++) {
      if (foodItems[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        const item = document.createElement('button');
        item.classList.add('list-group-item');
        item.classList.add('list-group-item-action');
        item.textContent = foodItems[i];
        item.addEventListener('click', function() {
          input.value = this.textContent;
          closeAllLists();
        });
        autocompleteContainer.appendChild(item);
      }
    }
  });

  input.addEventListener('keydown', function(e) {
    const x = autocompleteContainer.querySelectorAll('.list-group-item');
    if (e.keyCode === 40) { // Down arrow
      if (x.length > 0) {
        const activeItem = autocompleteContainer.querySelector('.list-group-item.active');
        if (activeItem) {
          activeItem.classList.remove('active');
          const nextItem = activeItem.nextElementSibling;
          if (nextItem) {
            nextItem.classList.add('active');
          }
        } else {
          const firstItem = autocompleteContainer.querySelector('.list-group-item');
          if (firstItem) {
            firstItem.classList.add('active');
          }
        }
      }
    } else if (e.keyCode === 38) { // Up arrow
      if (x.length > 0) {
        const activeItem = autocompleteContainer.querySelector('.list-group-item.active');
        if (activeItem) {
          activeItem.classList.remove('active');
          const prevItem = activeItem.previousElementSibling;
          if (prevItem) {
            prevItem.classList.add('active');
          }
        }
      }
    } else if (e.keyCode === 13) { // Enter
      if (x.length > 0) {
        const activeItem = autocompleteContainer.querySelector('.list-group-item.active');
        if (activeItem) {
          input.value = activeItem.textContent;
          closeAllLists();
        }
      }
    }
  });

  function closeAllLists() {
    while (autocompleteContainer.firstChild) {
      autocompleteContainer.removeChild(autocompleteContainer.firstChild);
    }
  }

  document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = input.value;
    // Effectuer une action avec le terme de recherche (par exemple, recherche sur une base de données, redirection vers une autre page, etc.)
    console.log('Recherche effectuée avec le terme :', searchTerm);
  });