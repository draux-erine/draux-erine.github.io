// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments de la modale
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");

    // Fonction pour ouvrir la modale
    const caption = document.getElementById("caption");

    window.openModal = function(imageSrc, captionText) {
        modal.style.display = "block";
        modalImg.src = imageSrc;
        if (caption) caption.textContent = captionText || "Mails sent about mobility";
        
        modalImg.onclick = function(event){
            event.stopPropagation();
        }
    }

    // Fonction pour fermer la modale
    window.closeModal = function() {
        modal.style.display = "none";
    }

    // Fermer la modale avec la touche ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});