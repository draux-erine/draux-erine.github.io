document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('#navbar ul li a');

    menuToggle.addEventListener('click', () => {
        const menu = document.querySelector('#navbar ul');
        menu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('#navbar ul');
            menu.classList.remove('active');
        });
    });
});