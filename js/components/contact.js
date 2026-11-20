import { config } from '../data/config.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

export function renderContact() {
  const contactItems = [
    {
      icon: 'email',
      label: 'Email',
      value: config.email,
      href: `mailto:${config.email}`,
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'ferdianfirmansyah13',
      href: 'https://www.linkedin.com/in/ferdianfirmansyah13/',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'FerdianFy13',
      href: 'https://github.com/FerdianFy13',
    },
  ];

  const cards = renderList(contactItems, (item) => `
    <a href="${item.href}" class="contact-card reveal" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
      <span class="contact-card__icon">${getIcon(item.icon)}</span>
      <div class="contact-card__info">
        <span class="contact-card__label">${item.label}</span>
        <span class="contact-card__value">${item.value}</span>
      </div>
    </a>
  `);

  renderHTML('#contact-section', `
    <section class="section section--alt" id="contact">
      <div class="container">
        <div class="contact-lead reveal">
          <div class="section-label">Contact</div>
          <h2 class="contact-title">Let's build something <span>solid</span> together.</h2>
          <p class="contact-desc">
            Have a project in mind or want to discuss an opportunity?
            I'd love to hear from you.
          </p>
          <a href="mailto:${config.email}" class="contact-mail">${config.email}</a>
        </div>

        <div class="contact-grid">
          ${cards}
        </div>
      </div>
    </section>
  `);
}
