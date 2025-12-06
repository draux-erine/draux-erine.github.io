document.addEventListener('DOMContentLoaded', function () {

    // Access the Images
    let slideImages = document.querySelectorAll('.p1-img');
    // Access the next and prev buttons
    let next = document.querySelector('.img-slide-next');
    let prev = document.querySelector('.img-slide-prev');
    // Access the indicators
    let dots = document.querySelectorAll('.dot');

    // Si aucun élément n'est trouvé, on arrête l'exécution du script
    if (slideImages.length === 0 || !next || !prev) {
        console.warn("Slider components not found. Check your HTML classes.");
        return;
    }

    var counter = 0;

    // --- Fonctions de navigation ---

    function slideNext() {
        // 1. L'image actuelle (sortante)
        slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
        slideImages[counter].classList.remove('img-active'); // IMPORTANT : Retrait de la classe active

        // 2. Incrémentation du compteur (gestion du bouclage)
        if (counter >= slideImages.length - 1) {
            counter = 0;
        } else {
            counter++;
        }

        // 3. ÉTAPE CLÉ : Réinitialiser la position de l'image entrante
        slideImages[counter].style.animation = 'none'; // Annule toute animation persistante
        slideImages[counter].style.left = '100%'; // Positionne l'image entrante à droite (100%)

        // 4. L'image entrante (glissement)
        slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
        slideImages[counter].classList.add('img-active'); // Ajout de la classe active

        indicators();
    }

    function slidePrev() {
        // 1. L'image actuelle (sortante)
        slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
        slideImages[counter].classList.remove('img-active'); // IMPORTANT : Retrait de la classe active

        // 2. Décrémentation du compteur (gestion du bouclage)
        if (counter === 0) {
            counter = slideImages.length - 1; // Boucle à la dernière image
        } else {
            counter--;
        }

        // 3. ÉTAPE CLÉ : Réinitialiser la position de l'image entrante
        slideImages[counter].style.animation = 'none'; // Annule toute animation persistante
        slideImages[counter].style.left = '-100%'; // Positionne l'image entrante à gauche (-100%)

        // 4. L'image entrante (glissement)
        slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
        slideImages[counter].classList.add('img-active'); // Ajout de la classe active

        indicators();
    }

    // --- Gestion des indicateurs (Dots) ---

    function indicators() {
        // Retire la classe 'active' de tous les points
        dots.forEach(dot => {
            dot.className = dot.className.replace(' img-active', '');
        });
        // Ajoute la classe 'active' au point correspondant
        dots[counter].className += ' img-active';
    }


    function switchImage(currentImage) {
        var imageId = parseInt(currentImage.getAttribute('attr'));

        if (imageId === counter) {
            return;
        }

        var oldCounter = counter;

        slideImages[counter].classList.remove('img-active');
        if (imageId > oldCounter) {
            slideImages[oldCounter].style.animation = 'next1 0.5s ease-in forwards';
        } else {
            slideImages[oldCounter].style.animation = 'prev1 0.5s ease-in forwards';
        }
        counter = imageId;
        slideImages[counter].style.animation = 'none';
        slideImages[counter].style.left = (imageId > oldCounter) ? '100%' : '-100%';

        if (imageId > oldCounter) {
            slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
        } else {
            slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
        }

        slideImages[counter].classList.add('img-active');

        indicators();
    }

    // Écouteurs pour les flèches
    next.addEventListener('click', slideNext);
    prev.addEventListener('click', slidePrev);

    // Écouteurs pour les points
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            switchImage(this);
        });
    });

    if (slideImages.length > 0) {
        slideImages[0].classList.add('img-active');
        slideImages[0].style.left = '0%';
        indicators(); // Met à jour l'affichage des points
    }
});