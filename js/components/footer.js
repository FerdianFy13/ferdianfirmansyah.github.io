import { config } from '../data/config.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

export function renderFooter() {
  const navLinks = renderList(config.nav, (item) => `
    <li><a href="${item.href}" class="footer-link">${item.label}</a></li>
  `);

  const socialLinks = renderList(config.social, (item) => `
    <a href="${item.url}" class="footer-social__link" aria-label="${item.platform}" target="_blank" rel="noopener noreferrer">
      ${getIcon(item.icon)}
    </a>
  `);

  const year = new Date().getFullYear();

  renderHTML('#footer-root', `
    <div class="footer">
      <div class="container footer__inner">

        <div class="footer__brand">
          <a href="#home-section" class="footer__name">${config.shortName}</a>
          <p class="footer__tagline">Building things for the web & mobile.</p>
          <div class="footer-social">
            ${socialLinks}
          </div>
        </div>

        <div class="footer__nav">
          <span class="footer__nav-title">Navigation</span>
          <ul class="footer-links" role="list">
            ${navLinks}
          </ul>
        </div>

        <div class="footer__contact">
          <span class="footer__nav-title">Contact</span>
          <ul class="footer-links" role="list">
            <li><a href="mailto:${config.email}" class="footer-link">${config.email}</a></li>
            <li><a href="https://wa.me/6281337915702" class="footer-link" target="_blank" rel="noopener noreferrer">${config.phone}</a></li>
          </ul>
        </div>

      </div>

      <div class="footer__bottom">
        <div class="container">
          <p>&copy; ${year} ${config.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  `);
}
