document.addEventListener('DOMContentLoaded', function () {
    const triggerItems = document.querySelectorAll('.trigger-details');
    
    const allDetails = document.querySelectorAll('.timeline-details');

    // Fonction pour masquer tous les détails
    function hideAllDetails() {
        allDetails.forEach(detail => {
            detail.style.display = 'none';
        });
    }

    triggerItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault(); 
            
            // 1. Masque tous les détails pour n'en afficher qu'un seul à la fois
            hideAllDetails();

            // 2. Récupère l'ID de la div de détails cible à partir de l'attribut data-target du lien cliqué
            const targetId = this.getAttribute('data-target');
            const targetDetail = document.getElementById(targetId);

            // 3. Affiche le détail correspondant
            if (targetDetail) {
                targetDetail.style.display = 'flex';
                targetDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    hideAllDetails();
});