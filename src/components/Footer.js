export default class Footer {
  render() {
    const year = new Date().getFullYear();
    
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer__content">
            <div class="footer__info">
              <h3>Kunti Najma Jalia</h3>
              <p>Full-stack Developer & Researcher</p>
            </div>

            <div class="footer__links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/about" data-link>About</a></li>
                <li><a href="/projects" data-link>Projects</a></li>
                <li><a href="/research" data-link>Research</a></li>
                <li><a href="/blog" data-link>Blog</a></li>
              </ul>
            </div>

            <div class="footer__social">
              <h4>Connect</h4>
              <ul>
                <li><a href="https://github.com/kuntinajma" target="_blank" rel="noopener">GitHub</a></li>
                <li><a href="https://linkedin.com/in/kunti-najma" target="_blank" rel="noopener">LinkedIn</a></li>
                <li><a href="mailto:kunti.najma@example.com">Email</a></li>
              </ul>
            </div>
          </div>

          <div class="footer__bottom">
            <p>&copy; ${year} Kunti Najma Jalia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}
