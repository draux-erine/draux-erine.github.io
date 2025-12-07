document.addEventListener('DOMContentLoaded', function () {
    function initSlider(containerSelector, imageClass) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const slideWrappers = container.querySelectorAll('.img-wrapper');
        const next = container.querySelector('.img-slide-next');
        const prev = container.querySelector('.img-slide-prev');
        const dots = container.querySelectorAll('.dot');

        if (slideWrappers.length === 0 || !next || !prev) {
            console.warn(`Slider components not found in ${containerSelector}`);
            return;
        }

        let counter = 0;

        function slideNext() {
            slideWrappers[counter].style.animation = 'next1 0.5s ease-in forwards';
            slideWrappers[counter].classList.remove('img-active');

            if (counter >= slideWrappers.length - 1) {
                counter = 0;
            } else {
                counter++;
            }

            slideWrappers[counter].style.animation = 'none';
            slideWrappers[counter].style.left = '100%';
            slideWrappers[counter].style.animation = 'next2 0.5s ease-in forwards';
            slideWrappers[counter].classList.add('img-active');

            updateIndicators();
        }

        function slidePrev() {
            slideWrappers[counter].style.animation = 'prev1 0.5s ease-in forwards';
            slideWrappers[counter].classList.remove('img-active');

            if (counter === 0) {
                counter = slideWrappers.length - 1;
            } else {
                counter--;
            }

            slideWrappers[counter].style.animation = 'none';
            slideWrappers[counter].style.left = '-100%';
            slideWrappers[counter].style.animation = 'prev2 0.5s ease-in forwards';
            slideWrappers[counter].classList.add('img-active');

            updateIndicators();
        }

        function updateIndicators() {
            dots.forEach(dot => {
                dot.classList.remove('img-active');
            });
            dots[counter].classList.add('img-active');
        }

        function switchImage(imageId) {
            if (imageId === counter) return;

            const oldCounter = counter;
            slideWrappers[counter].classList.remove('img-active');

            if (imageId > oldCounter) {
                slideWrappers[oldCounter].style.animation = 'next1 0.5s ease-in forwards';
            } else {
                slideWrappers[oldCounter].style.animation = 'prev1 0.5s ease-in forwards';
            }

            counter = imageId;
            slideWrappers[counter].style.animation = 'none';
            slideWrappers[counter].style.left = (imageId > oldCounter) ? '100%' : '-100%';

            if (imageId > oldCounter) {
                slideWrappers[counter].style.animation = 'next2 0.5s ease-in forwards';
            } else {
                slideWrappers[counter].style.animation = 'prev2 0.5s ease-in forwards';
            }

            slideWrappers[counter].classList.add('img-active');
            updateIndicators();
        }

        next.addEventListener('click', slideNext);
        prev.addEventListener('click', slidePrev);

        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                const imageId = parseInt(this.getAttribute('attr'));
                switchImage(imageId);
            });
        });

        if (slideWrappers.length > 0) {
            slideWrappers[0].classList.add('img-active');
            slideWrappers[0].style.left = '0%';
            updateIndicators();
        }
    }

    initSlider('#details-p1 .project-contenu.project-img', '.p1-img');

    initSlider('#details-p2 .project-contenu.project-img', '.p2-img');
});