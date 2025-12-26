import { setPageTitle } from '../lib/utils.js';

export default class AboutPage {
  async render() {
    setPageTitle('About');
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
      <div class="container">
        <div class="about-content">
          <div class="about-sidebar">
            <div class="about-image" style="width: 100%; height: 300px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">
              KNJ
            </div>
            <div class="card">
              <h3>Contact Information</h3>
              <p><strong>Email:</strong> kunti.najma@example.com</p>
              <p><strong>Location:</strong> Semarang, Indonesia</p>
              <p><strong>GitHub:</strong> <a href="https://github.com/kuntinajma" target="_blank">@kuntinajma</a></p>
            </div>
          </div>

          <div class="about-main">
            <h1>About Me</h1>
            <p class="lead">Full-stack Developer & Graduate Researcher specializing in web development and machine learning applications.</p>

            <h2>Professional Background</h2>
            <p>I'm a software engineer and researcher with expertise in building modern web applications and conducting academic research. My work spans from front-end UI/UX development to backend systems integration using Firebase, with a particular focus on creating scalable and maintainable solutions.</p>

            <h2>Research Interests</h2>
            <p>My research focuses on:</p>
            <ul>
              <li>Machine Learning and Deep Learning (LSTM, XGBoost, SVR-PSO)</li>
              <li>Time-series forecasting and predictive analytics</li>
              <li>Islamic fintech and zakat prediction systems</li>
              <li>Data-driven decision making</li>
            </ul>

            <h2>Technical Skills</h2>
            <div class="skills-grid">
              <div class="skill-item">JavaScript</div>
              <div class="skill-item">HTML/CSS</div>
              <div class="skill-item">Python</div>
              <div class="skill-item">Firebase</div>
              <div class="skill-item">React</div>
              <div class="skill-item">Node.js</div>
              <div class="skill-item">Git</div>
              <div class="skill-item">Vercel</div>
              <div class="skill-item">Machine Learning</div>
              <div class="skill-item">Data Analysis</div>
            </div>

            <h2>Education</h2>
            <div class="card">
              <h3>Master's Degree in Computer Science</h3>
              <p class="card__meta">Currently Pursuing</p>
              <p>Focus on machine learning, time-series analysis, and predictive modeling.</p>
            </div>

            <div class="card mt-lg">
              <h3>Bachelor's Degree in Informatics Engineering</h3>
              <p class="card__meta">Completed</p>
              <p>Foundation in software engineering, algorithms, and system design.</p>
            </div>

            <h2>Philosophy</h2>
            <p>I believe in building technology that solves real problems and creates meaningful impact. My approach combines technical excellence with user-centered design, always keeping maintainability and scalability in mind.</p>
          </div>
        </div>
      </div>
    `;
  }
}
