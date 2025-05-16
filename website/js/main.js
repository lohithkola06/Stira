// Smooth scroll to pricing section
document.addEventListener('DOMContentLoaded', function() {
    const getStartedButton = document.querySelector('.hero-content .cta-button');
    if (getStartedButton) {
        getStartedButton.addEventListener('click', function(e) {
            e.preventDefault();
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                pricingSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
