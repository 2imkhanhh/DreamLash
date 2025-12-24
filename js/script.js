document.addEventListener("DOMContentLoaded", function () {
    // ======================================================
    // PHẦN 1: HIỆU ỨNG CUỘN TRANG (REVEAL ANIMATION)
    // ======================================================
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

    // ======================================================
    // PHẦN 2: XỬ LÝ MENU MOBILE & DROPDOWN SERVICES
    // ======================================================

    // 2.1 Xử lý đóng/mở menu chính trên mobile (Hamburger button)
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
        toggler.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }

    // 2.2 Xử lý Dropdown Services (Quan trọng)
    const servicesDropdown = document.querySelector('.services-dropdown');

    if (servicesDropdown) {
        const servicesLinkText = servicesDropdown.querySelector('.service-link'); // Chữ Services
        const servicesArrow = servicesDropdown.querySelector('.service-toggle');  // Nút mũi tên
        const viewAllLink = document.querySelector('.view-all-link');             // Nút View All bên trong

        // Hàm bật/tắt class "open" cho dropdown
        function toggleDropdownMenu() {
            servicesDropdown.classList.toggle("open");
        }

        // --- XỬ LÝ KHI CLICK VÀO CHỮ "SERVICES" ---
        if (servicesLinkText) {
            servicesLinkText.addEventListener('click', (e) => {
                e.preventDefault(); // Chặn chuyển trang

                // Kiểm tra màn hình Mobile hay Desktop
                if (window.innerWidth < 992) {
                    // Mobile: Mở dropdown giống như nhấn mũi tên
                    toggleDropdownMenu();
                } else {
                    // Desktop: Highlight nút View All (Giữ nguyên logic cũ)
                    if (viewAllLink) {
                        viewAllLink.classList.add('highlight-effect');
                        setTimeout(() => {
                            viewAllLink.classList.remove('highlight-effect');
                        }, 500);
                    }
                }
            });
        }

        // --- XỬ LÝ KHI CLICK VÀO NÚT MŨI TÊN (CHEVRON) ---
        if (servicesArrow) {
            servicesArrow.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Ngăn sự kiện nổi bọt

                // Mũi tên thì luôn luôn toggle menu (cả mobile lẫn desktop nếu hiện)
                toggleDropdownMenu();
            });
        }
    }

    const currentUrl = window.location.href; // Lấy địa chỉ trang web hiện tại
    const servicesParentLink = document.querySelector('.services-dropdown .service-link');

    // Kiểm tra: Nếu URL có chứa chữ "services" (bao gồm cả trang cha và trang con)
    if (currentUrl.includes("services")) {
        if (servicesParentLink) {
            servicesParentLink.classList.add("active"); // Thêm class active để in đậm
        }
    }
});