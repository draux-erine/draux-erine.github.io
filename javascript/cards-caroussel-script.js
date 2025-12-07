document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.card-carousel');
    const cards = document.querySelectorAll('.card');
    const descriptionText = document.getElementById('description-text');

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!carousel || cards.length === 0) {
        console.warn('Carousel: éléments manquants (carousel ou cards). Le script s\'arrête.');
        return;
    }

    let currentCardIndex = 0;
    const totalCards = cards.length;

    const descriptions = [
        "Growing up, I had the chance to spend many summers hiking with my family, especially near the Alps. " +
        "These experiences sparked my passion for nature and hiking, an activity I still enjoy today. " +
        "What I love most is the sense of discovery: observing wildlife, learning about plants, or coming across " +
        "hidden places reclaimed by nature. At the same time, hiking is a challenge: every trail brings its own obstacles, and the path isn’t always straightforward. ",

        "While I may not have a professional camera, I enjoy taking pictures of my travels " +
        "or landscapes that inspire me. With my friends, we often organize photography " +
        "trips where we choose a location to photograph. With this hobby, I develop my " +
        "creativity but also my keen eye for details. The act of capturing a dynamic scene " +
        "requires me to quickly analyze the light, the form, and the framing to execute " +
        "the shot effectively. This continuous practice in rapid visual analysis and " +
        "decision-making significantly sharpens my focus and my ability to isolate and " +
        "tackle crucial variables.",

        "While I enjoy being outdoor, I am equally drawn to manual and creative activities. " +
        "My interests include coloring mandalas, practicing macramé, and assembling decorative book nook scenes. " +
        "These hobbies are instrumental in developing several key skills: they significantly enhance my dexterity and fine motor skills, "+
        "improve my focus on detailed tasks, and continuously fuel my creativity."
    ];


    function updateCarousel() {
        cards.forEach((card, index) => {
            let relativeIndex = index - currentCardIndex;

            if (relativeIndex < -1) {
                relativeIndex += totalCards;
            } else if (relativeIndex > 1) {
                relativeIndex -= totalCards;
            }

            let transform = '';
            let opacity = 1;
            let zIndex = 0;

            if (relativeIndex === 0) {
                transform = 'translateZ(0) scale(1)';
                opacity = 1;
                zIndex = 3;
            } else if (relativeIndex === 1) {
                transform = 'translateX(50%) translateZ(-150px) scale(0.8)';
                opacity = 0.7;
                zIndex = 2;
            } else if (relativeIndex === -1) {
                transform = 'translateX(-50%) translateZ(-150px) scale(0.8)';
                opacity = 0.7;
                zIndex = 2;
            } else {
                transform = 'translateZ(-500px) scale(0.5)';
                opacity = 0;
                zIndex = 1;
            }

            card.style.transform = transform;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
        });

        if (descriptionText) {
            descriptionText.innerHTML = descriptions[currentCardIndex] || '';
        }
    }

    function nextCard() {
        currentCardIndex = (currentCardIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevCard() {
        currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }
    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    if (nextBtn) nextBtn.addEventListener('click', nextCard);
    carousel.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY > 0) {
            nextCard();
        } else {
            prevCard();
        }
    }, { passive: false });
    updateCarousel();
});