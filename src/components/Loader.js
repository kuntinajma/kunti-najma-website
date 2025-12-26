export default class Loader {
  static show() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('loader--active');
    }
  }

  static hide() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.remove('loader--active');
    }
  }

  static render() {
    return `
      <div id="loader" class="loader">
        <div class="loader__spinner"></div>
      </div>
    `;
  }
}
