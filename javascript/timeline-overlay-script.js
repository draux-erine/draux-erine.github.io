document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('timeline-overlay');
    const closeBtn = document.querySelector('.close-overlay');
    const triggers = document.querySelectorAll('.trigger-details');
    
    // Ouvrir l'overlay
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            
            // Masquer tous les détails
            document.querySelectorAll('.timeline-details').forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Afficher le détail ciblé
            document.getElementById(targetId).classList.add('active');
            
            // Afficher l'overlay
            overlay.classList.add('active');
            
            // Empêcher le scroll du body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fermer l'overlay
    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeOverlay);
    
    // Fermer en cliquant sur le fond
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeOverlay();
        }
    });
    
    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });
});