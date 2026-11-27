// Sur mobile/tablette (pas de survol), retourner les cartes CSR au toucher
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
});
