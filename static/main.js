// ============================================================
// Hot News — main.js
// Handles: mobile navigation, dark mode, header search toggle
// ============================================================
(function () {
    'use strict';

    var THEME_KEY = 'hotnews-theme';

    /* ---------- Dark mode ---------- */
    function applyThemeIcon(theme) {
        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        var icon = toggle.querySelector('i');
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    function initTheme() {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        applyThemeIcon(current);

        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', function () {
            var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* storage unavailable */ }
            applyThemeIcon(theme);
        });
    }

    /* ---------- Mobile navigation ---------- */
    function initMobileNav() {
        var menuToggle = document.getElementById('menu-toggle');
        var nav = document.querySelector('.main-nav');
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        // Close menu when a nav link is chosen (mobile)
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) {
                nav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }

    /* ---------- Header search toggle ---------- */
    function initSearchToggle() {
        var searchToggle = document.getElementById('search-toggle');
        var searchPanel = document.getElementById('header-search');
        if (!searchToggle || !searchPanel) return;

        searchToggle.addEventListener('click', function () {
            var isHidden = searchPanel.hasAttribute('hidden');
            if (isHidden) {
                searchPanel.removeAttribute('hidden');
                searchToggle.setAttribute('aria-expanded', 'true');
                var input = searchPanel.querySelector('input');
                if (input) input.focus();
            } else {
                searchPanel.setAttribute('hidden', '');
                searchToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ---------- Footer year ---------- */
    function initFooterYear() {
        var el = document.getElementById('footer-year');
        if (el) el.textContent = new Date().getFullYear();
    }

    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initMobileNav();
        initSearchToggle();
        initFooterYear();
    });
})();
