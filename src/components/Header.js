import authService from '../services/auth.service.js';
import router from '../router.js';

export default class Header {
  constructor() {
    this.isAdmin = false;
    this.initAuthListener();
  }

  initAuthListener() {
    authService.onAuthChange((user) => {
      this.isAdmin = authService.isAdmin();
      this.update();
    });
  }

  update() {
    const header = document.getElementById('main-header');
    if (header) {
      header.innerHTML = this.render();
      this.attachEventListeners();
    }
  }

  attachEventListeners() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');

    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('nav--open');
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav && !nav.contains(e.target) && e.target !== menuToggle) {
        nav.classList.remove('nav--open');
      }
    });
  }

  render() {
    const currentPath = router.getCurrentPath();
    const isActive = (path) => currentPath === path || currentPath.startsWith(path + '/') ? 'active' : '';

    return `
      <header class="header" id="main-header">
        <div class="container">
          <div class="header__content">
            <a href="/" data-link class="header__logo">
              <span>Kunti Najma Jalia</span>
            </a>

            <button class="header__menu-toggle" id="menu-toggle" aria-label="Toggle menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav class="nav" id="main-nav">
              <ul class="nav__list">
                <li><a href="/" data-link class="nav__link ${isActive('/')}">Home</a></li>
                <li><a href="/about" data-link class="nav__link ${isActive('/about')}">About</a></li>
                <li><a href="/projects" data-link class="nav__link ${isActive('/projects')}">Projects</a></li>
                <li><a href="/research" data-link class="nav__link ${isActive('/research')}">Research</a></li>
                <li><a href="/blog" data-link class="nav__link ${isActive('/blog')}">Blog</a></li>
                <li><a href="/activities" data-link class="nav__link ${isActive('/activities')}">Activities</a></li>
                <li><a href="/beyond" data-link class="nav__link ${isActive('/beyond')}">Beyond Work</a></li>
                <li><a href="/contact" data-link class="nav__link ${isActive('/contact')}">Contact</a></li>
                ${this.isAdmin ? '<li><a href="/admin" data-link class="nav__link nav__link--admin ${isActive('/admin')}">Admin</a></li>' : ''}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `;
  }
}
