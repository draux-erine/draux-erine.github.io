// Slider de la présentation CEP
// Pour ajouter une page : ajouter une <img class="cep-slide" src="..."> dans .cep-slides (index.html)
document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('.cep-viewer');
    if (!viewer) return;

    const slides = viewer.querySelectorAll('.cep-slide');
    const counter = viewer.querySelector('.cep-counter');
    const dotsBox = document.querySelector('.cep-dots');
    let current = 0;

    // Si la 1re image est introuvable, on affiche directement le PDF
    function fallbackToPdf() {
        if (viewer.classList.contains('cep-pdf-mode')) return;
        viewer.classList.add('cep-pdf-mode');
        viewer.innerHTML = `<iframe src="${viewer.dataset.pdf}#view=Fit" title="CEP (PDF)"></iframe>`;
        if (dotsBox) dotsBox.style.display = 'none';
    }
    const first = slides[0];
    if (!first || (first.complete && first.naturalWidth === 0)) { fallbackToPdf(); return; }
    first.addEventListener('error', fallbackToPdf);

    // Points générés automatiquement selon le nombre de pages
    const dots = [];
    if (dotsBox) {
        slides.forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'cep-dot';
            d.setAttribute('aria-label', `Slide ${i + 1}`);
            d.addEventListener('click', () => show(i));
            dotsBox.appendChild(d);
            dots.push(d);
        });
    }

    // Une seule page : flèches, compteur et points masqués
    if (slides.length < 2) viewer.classList.add('cep-single');
    if (slides.length < 2 && dotsBox) dotsBox.style.display = 'none';

    function show(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
    }

    viewer.querySelector('.cep-prev').addEventListener('click', () => show(current - 1));
    viewer.querySelector('.cep-next').addEventListener('click', () => show(current + 1));
    viewer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });

    let startX = null;
    viewer.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    viewer.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) show(dx < 0 ? current + 1 : current - 1);
        startX = null;
    });

    // Clic : agrandir la page
    slides.forEach(s => s.addEventListener('click', () => {
        if (typeof window.openModal === 'function') window.openModal(s.getAttribute('src'), s.getAttribute('alt'));
    }));

    show(0);
});
