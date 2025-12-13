document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll('.reveal-item, .section-title, .section-desc, .service-item, .hero-img, .about-img, .contact-form');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal-item'); 
        observer.observe(el);
    });

    document.querySelectorAll(".services-dropdown").forEach(dropdown => {
        const toggle = dropdown.querySelector(".service-toggle");

        if (!toggle) return;

        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation(); 
            dropdown.classList.toggle("open");
        });
    });
});