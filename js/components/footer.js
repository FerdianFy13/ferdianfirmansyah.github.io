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
      <!-- Footer brand, navigation & social row — disabled for now
      <div class="container footer__inner">
        <a href="#home-section" class="footer__name">${config.shortName}</a>
        <nav aria-label="Footer"><ul class="footer-links" role="list">${navLinks}</ul></nav>
        <div class="footer-social">${socialLinks}</div>
      </div>
      -->
      <div class="footer__bottom">
        <div class="container">
          <p>&copy; ${year} ${config.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  `);
}
