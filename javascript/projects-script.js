document.addEventListener('DOMContentLoaded', function () {
    const projectItems = document.querySelectorAll('.list-project .project-item');
    const allDetails = document.querySelectorAll('.all-projects-details .project-details');

    // Fonction pour masquer tous les détails
    function hideAllDetails() {
        allDetails.forEach(detail => {
            detail.style.display = 'none';
        });
    }

    projectItems.forEach(item => {
        item.addEventListener('click', function () {
            // 1. Masque tous les détails pour n'en afficher qu'un seul à la fois
            hideAllDetails();

            // 2. Récupère l'ID de la div de détails cible à partir de l'attribut data-target
            const targetId = this.getAttribute('data-target');
            const targetDetail = document.getElementById(targetId);

            // 3. Affiche le détail correspondant
            if (targetDetail) {
                targetDetail.style.display = 'flex'; // Utilise 'flex' pour correspondre à votre CSS

                // Optionnel : défilement jusqu'aux détails
                targetDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    // Masque les détails au chargement initial de la page (sécurité)
    hideAllDetails();
    const defaultDetail = document.getElementById('details-p1');
    if (defaultDetail) {
        defaultDetail.style.display = 'flex';
    }
});

