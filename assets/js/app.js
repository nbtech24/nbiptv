document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileSearchToggle = document.getElementById('mobile-search-toggle');
    const mobileSearchBar = document.getElementById('mobile-search-bar');
    const header = document.querySelector('.site-header');

    // Mobile menu open/close
    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
        }
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        if (menuOverlay) menuOverlay.classList.add('active');
        if (menuOverlay) menuOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('mobile-menu-open');
    }

    function closeMobileMenuFunc() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (menuOverlay) menuOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-menu-open');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMobileMenuFunc(); else openMobileMenu();
        });
    }

    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenuFunc);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenuFunc);

    // Mobile search toggle
    if (mobileSearchToggle && mobileSearchBar) {
        mobileSearchToggle.addEventListener('click', () => {
            const expanded = mobileSearchToggle.getAttribute('aria-expanded') === 'true';
            if (expanded === 'true') {
                mobileSearchBar.classList.remove('active');
                mobileSearchBar.setAttribute('aria-hidden', 'true');
                mobileSearchToggle.setAttribute('aria-expanded', 'false');
            } else {
                mobileSearchBar.classList.add('active');
                mobileSearchBar.setAttribute('aria-hidden', 'false');
                mobileSearchToggle.setAttribute('aria-expanded', 'true');
                // Move focus to search input
                const input = mobileSearchBar.querySelector('input[type="search"]');
                if (input) input.focus();
            }
        });
    }

    // Close overlays / menus on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenuFunc();
            if (mobileSearchBar) {
                mobileSearchBar.classList.remove('active');
                mobileSearchBar.setAttribute('aria-hidden', 'true');
                if (mobileSearchToggle) mobileSearchToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Mobile menu section toggles (Menu / Brands / Types)
    const sectionToggles = document.querySelectorAll('.mobile-section-toggle');
    if (sectionToggles.length > 0) {
        sectionToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('aria-controls');
                const content = document.getElementById(targetId);
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
                if (content) {
                    if (expanded) {
                        content.hidden = true;
                        content.classList.remove('active');
                    } else {
                        content.hidden = false;
                        content.classList.add('active');
                    }
                }
            });
        });
    }

    // Header scroll effect (safe-guard header existence)
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.background = 'rgba(15, 23, 42, 0.9)';
            } else {
                header.style.background = 'var(--bg-glass)';
            }
        });
    }

    // Device Variant Switching (unchanged logic)
    const variantBtns = document.querySelectorAll('.variant-btn');
    const priceOfficial = document.getElementById('price-official');
    const priceUnofficial = document.getElementById('price-unofficial');

    if (variantBtns.length > 0) {
        variantBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                variantBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                // Update prices
                if (priceOfficial) priceOfficial.textContent = btn.getAttribute('data-price-official');
                if (priceUnofficial) priceUnofficial.textContent = btn.getAttribute('data-price-unofficial');
            });
        });
    }
});
