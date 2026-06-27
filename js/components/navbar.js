import { config } from '../data/config.js';
import { renderHTML, renderList } from '../utils/render.js';

export function renderNavbar() {
  const navLinks = renderList(config.nav, (item) => `
    <li class="nav-item">
      <a href="${item.href}" class="nav-link">${item.label}</a>
    </li>
  `);

  renderHTML('#navbar-root', `
    <nav class="navbar" id="main-navbar">
      <div class="container navbar__inner">
        <a href="#home-section" class="navbar__brand" aria-label="Go to home">${config.shortName}</a>

        <button
          class="nav-toggle"
          id="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded="false"
          aria-controls="nav-menu"
        >
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>

        <ul class="nav-menu" id="nav-menu" role="list">
          ${navLinks}
        </ul>
      </div>
    </nav>
  `);
}
