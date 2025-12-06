document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.career-timeline-item');
    const detailPanes = document.querySelectorAll('.career-details-pane');

    const togglePane = (clickedItem) => {
        const targetId = clickedItem.getAttribute('data-target-id');
        const targetPane = document.getElementById(targetId);
        const isActive = clickedItem.classList.contains('active');

        if (isActive) {
            clickedItem.classList.remove('active');
            if (targetPane) {
                targetPane.classList.remove('active');
            }
            return;
        }

        timelineItems.forEach(item => item.classList.remove('active'));
        detailPanes.forEach(pane => pane.classList.remove('active'));

        clickedItem.classList.add('active');
        if (targetPane) {
            targetPane.classList.add('active');
        }
    };

    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            togglePane(this);
        });
        
        item.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                togglePane(this);
            }
        });
    });
});