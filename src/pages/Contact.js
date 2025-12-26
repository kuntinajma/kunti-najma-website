import { setPageTitle, showNotification, validateEmail } from '../lib/utils.js';

export default class ContactPage {
  async render() {
    setPageTitle('Contact');
    const container = document.getElementById('main-content');
    
    container.innerHTML = `
      <div class="container">
        <h1 class="text-center">Get in Touch</h1>
        <p class="text-center" style="max-width: 600px; margin: 0 auto var(--space-3xl);">Have a project in mind or want to collaborate? I'd love to hear from you.</p>

        <div class="contact-container">
          <div class="contact-info">
            <h2>Contact Information</h2>
            <p>Feel free to reach out through any of these channels:</p>

            <div class="contact-item">
              <div class="contact-item__icon">📧</div>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:kunti.najma@example.com">kunti.najma@example.com</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon">💼</div>
              <div>
                <h3>LinkedIn</h3>
                <p><a href="https://linkedin.com/in/kunti-najma" target="_blank" rel="noopener">linkedin.com/in/kunti-najma</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon">🐙</div>
              <div>
                <h3>GitHub</h3>
                <p><a href="https://github.com/kuntinajma" target="_blank" rel="noopener">github.com/kuntinajma</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon">📍</div>
              <div>
                <h3>Location</h3>
                <p>Semarang, Indonesia</p>
              </div>
            </div>

            <div class="card mt-xl">
              <h3>Availability</h3>
              <p>Currently open to:</p>
              <ul>
                <li>Full-time opportunities</li>
                <li>Research collaborations</li>
                <li>Consulting projects</li>
                <li>Speaking engagements</li>
              </ul>
            </div>
          </div>

          <div class="contact-form">
            <form id="contact-form" class="card">
              <h2>Send a Message</h2>
              
              <div class="form-group">
                <label class="form-label" for="name">Name *</label>
                <input type="text" id="name" class="form-input" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="email">Email *</label>
                <input type="email" id="email" class="form-input" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="subject">Subject *</label>
                <input type="text" id="subject" class="form-input" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="message">Message *</label>
                <textarea id="message" class="form-textarea" rows="6" required></textarea>
              </div>

              <button type="submit" class="btn btn--primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    if (!validateEmail(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // In production, you would send this to a backend or email service
    console.log('Form submitted:', formData);
    
    // Create mailto link as fallback
    const mailtoLink = `mailto:kunti.najma@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    
    showNotification('Opening your email client...', 'success');
    e.target.reset();
  }
}
