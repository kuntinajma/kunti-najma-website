import './styles/main.css';
import router from './router.js';
import authService from './services/auth.service.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Loader from './components/Loader.js';

// Pages
import HomePage from './pages/Home.js';
import AboutPage from './pages/About.js';
import ProjectsPage from './pages/Projects.js';
import ProjectDetailPage from './pages/ProjectDetail.js';
import ResearchPage from './pages/Research.js';
import ResearchDetailPage from './pages/ResearchDetail.js';
import BlogPage from './pages/Blog.js';
import BlogDetailPage from './pages/BlogDetail.js';
import ActivitiesPage from './pages/Activities.js';
import BeyondPage from './pages/Beyond.js';
import ContactPage from './pages/Contact.js';

// Admin
import AdminLoginPage from './admin/Login.js';
import AdminDashboard from './admin/Dashboard.js';
import PostsManager from './admin/PostsManager.js';
import ProjectsManager from './admin/ProjectsManager.js';
import ResearchManager from './admin/ResearchManager.js';
import ActivitiesManager from './admin/ActivitiesManager.js';
import ReflectionsManager from './admin/ReflectionsManager.js';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.init();
  }

  init() {
    // Render header and footer
    this.renderLayout();

    // Setup authentication listener
    authService.onAuthChange((user) => {
      console.log('Auth state changed:', user ? user.email : 'logged out');
    });

    // Register routes
    this.registerRoutes();

    // Handle initial route
    router.handleRoute();
  }

  renderLayout() {
    document.getElementById('header-root').innerHTML = this.header.render();
    this.header.attachEventListeners();
    
    document.getElementById('footer-root').innerHTML = this.footer.render();
  }

  registerRoutes() {
    // Public routes
    router.register('/', () => new HomePage().render());
    router.register('/about', () => new AboutPage().render());
    router.register('/projects', () => new ProjectsPage().render());
    router.register('/projects/:slug', () => new ProjectDetailPage().render());
    router.register('/research', () => new ResearchPage().render());
    router.register('/research/:slug', () => new ResearchDetailPage().render());
    router.register('/blog', () => new BlogPage().render());
    router.register('/blog/:slug', () => new BlogDetailPage().render());
    router.register('/activities', () => new ActivitiesPage().render());
    router.register('/beyond', () => new BeyondPage().render());
    router.register('/contact', () => new ContactPage().render());

    // Admin routes
    router.register('/admin/login', () => new AdminLoginPage().render());
    router.register('/admin', () => new AdminDashboard().render(), true);
    router.register('/admin/posts', () => new PostsManager().render(), true);
    router.register('/admin/projects', () => new ProjectsManager().render(), true);
    router.register('/admin/research', () => new ResearchManager().render(), true);
    router.register('/admin/activities', () => new ActivitiesManager().render(), true);
    router.register('/admin/reflections', () => new ReflectionsManager().render(), true);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
