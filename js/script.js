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

    const toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
        toggler.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }

    const servicesDropdown = document.querySelector('.services-dropdown');

    if (servicesDropdown) {
        const servicesLinkText = servicesDropdown.querySelector('.service-link'); 
        const servicesArrow = servicesDropdown.querySelector('.service-toggle');  
        const viewAllLink = document.querySelector('.view-all-link');             

        function toggleDropdownMenu() {
            servicesDropdown.classList.toggle("open");
        }

        if (servicesLinkText) {
            servicesLinkText.addEventListener('click', (e) => {
                e.preventDefault(); 

                if (window.innerWidth < 992) {
                    toggleDropdownMenu();
                } else {
                    if (viewAllLink) {
                        viewAllLink.classList.add('highlight-effect');
                        setTimeout(() => {
                            viewAllLink.classList.remove('highlight-effect');
                        }, 500);
                    }
                }
            });
        }

        if (servicesArrow) {
            servicesArrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                toggleDropdownMenu();
            });
        }
    }

    const currentUrl = window.location.href; 
    const servicesParentLink = document.querySelector('.services-dropdown .service-link');

    if (currentUrl.includes("services")) {
        if (servicesParentLink) {
            servicesParentLink.classList.add("active"); 
        }
    }
});