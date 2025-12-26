import firestoreService from '../services/firestore.service.js';
import { setPageTitle, formatDateShort } from '../lib/utils.js';
import Loader from '../components/Loader.js';

export default class HomePage {
  async render() {
    setPageTitle('Home');
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
      <div class="container">
        <div class="home-intro">
          <h1 class="home-intro__title">Kunti Najma Jalia</h1>
          <p class="home-intro__subtitle">Full-stack Developer & Researcher</p>
          <p>Welcome to my digital space where technology meets research. I build scalable web applications and conduct research in machine learning, time-series forecasting, and Islamic fintech.</p>
        </div>

        <div class="home-highlights">
          <div class="highlight-card">
            <div class="highlight-card__icon">💻</div>
            <h3 class="highlight-card__title">Development</h3>
            <p>Full-stack web applications with modern technologies</p>
          </div>
          <div class="highlight-card">
            <div class="highlight-card__icon">🔬</div>
            <h3 class="highlight-card__title">Research</h3>
            <p>Machine learning and predictive analytics</p>
          </div>
          <div class="highlight-card">
            <div class="highlight-card__icon">🎯</div>
            <h3 class="highlight-card__title">Leadership</h3>
            <p>Community engagement and project management</p>
          </div>
        </div>

        <div class="section">
          <div class="section__header">
            <h2 class="section__title">Recent Projects</h2>
            <p class="section__subtitle">Latest work and case studies</p>
          </div>
          <div id="recent-projects" class="grid grid--3"></div>
        </div>

        <div class="section">
          <div class="section__header">
            <h2 class="section__title">Latest Blog Posts</h2>
            <p class="section__subtitle">Thoughts, insights, and reflections</p>
          </div>
          <div id="recent-posts" class="grid grid--3"></div>
        </div>
      </div>
    `;

    await this.loadContent();
  }

  async loadContent() {
    Loader.show();

    try {
      // Load recent projects
      const projects = await firestoreService.getAll('projects', {
        published: true,
        limit: 3
      });

      const projectsContainer = document.getElementById('recent-projects');
      projectsContainer.innerHTML = projects.length > 0
        ? projects.map(project => this.renderProjectCard(project)).join('')
        : '<p class="empty-state">No projects yet</p>';

      // Load recent blog posts
      const posts = await firestoreService.getAll('posts', {
        published: true,
        limit: 3
      });

      const postsContainer = document.getElementById('recent-posts');
      postsContainer.innerHTML = posts.length > 0
        ? posts.map(post => this.renderPostCard(post)).join('')
        : '<p class="empty-state">No blog posts yet</p>';

    } catch (error) {
      console.error('Error loading home content:', error);
    } finally {
      Loader.hide();
    }
  }

  renderProjectCard(project) {
    return `
      <div class="card">
        ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${project.title}" class="card__image">` : ''}
        <h3 class="card__title">
          <a href="/projects/${project.slug}" data-link>${project.title}</a>
        </h3>
        <p class="card__summary">${project.summary}</p>
        <div class="card__tags">
          ${project.tags?.map(tag => `<span class="tag tag--primary">${tag}</span>`).join('') || ''}
        </div>
      </div>
    `;
  }

  renderPostCard(post) {
    return `
      <div class="card">
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" class="card__image">` : ''}
        <div class="card__meta">${formatDateShort(post.createdAt)}</div>
        <h3 class="card__title">
          <a href="/blog/${post.slug}" data-link>${post.title}</a>
        </h3>
        <p class="card__summary">${post.summary}</p>
        <div class="card__tags">
          ${post.tags?.map(tag => `<span class="tag">${tag}</span>`).join('') || ''}
        </div>
      </div>
    `;
  }
}
