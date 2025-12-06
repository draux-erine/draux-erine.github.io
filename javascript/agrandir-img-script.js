// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments de la modale
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");

    // Fonction pour ouvrir la modale
    window.openModal = function(imageSrc) {
        console.log("Fonction openModal appelée ! Source de l'image :", imageSrc); 
        modal.style.display = "block";
        modalImg.src = imageSrc;
        
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