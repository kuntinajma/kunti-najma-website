import authService from './services/auth.service.js';

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.defaultRoute = '/';
    
    // Handle browser navigation
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Handle link clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigateTo(e.target.getAttribute('href'));
      }
    });
  }

  register(path, handler, requiresAuth = false) {
    this.routes[path] = { handler, requiresAuth };
  }

  async navigateTo(path) {
    window.history.pushState(null, null, path);
    await this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname;
    this.currentRoute = path;

    // Check for exact match
    let route = this.routes[path];
    
    // Check for dynamic routes
    if (!route) {
      for (const [routePath, routeConfig] of Object.entries(this.routes)) {
        if (routePath.includes(':')) {
          const regex = new RegExp('^' + routePath.replace(/:[^/]+/g, '([^/]+)') + '$');
          const match = path.match(regex);
          if (match) {
            route = routeConfig;
            break;
          }
        }
      }
    }

    // Default route if not found
    if (!route) {
      route = this.routes[this.defaultRoute];
    }

    // Check authentication
    if (route.requiresAuth && !authService.isAuthenticated()) {
      this.navigateTo('/admin/login');
      return;
    }

    // Execute route handler
    if (route && route.handler) {
      await route.handler();
    }
  }

  extractParams(pattern, path) {
    const paramNames = [];
    const regexPattern = pattern.replace(/:([^/]+)/g, (match, paramName) => {
      paramNames.push(paramName);
      return '([^/]+)';
    });

    const regex = new RegExp('^' + regexPattern + '$');
    const match = path.match(regex);

    if (!match) return {};

    const params = {};
    paramNames.forEach((name, index) => {
      params[name] = match[index + 1];
    });

    return params;
  }

  getCurrentPath() {
    return window.location.pathname;
  }
}

export default new Router();
