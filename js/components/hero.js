import { config } from '../data/config.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

export function renderHero() {
  const techLine = config.techHighlights.join(' · ');

  const socialLinks = renderList(config.social, (item) => `
    <a href="${item.url}" class="hero-social__link" aria-label="${item.platform}" target="_blank" rel="noopener noreferrer">
      ${getIcon(item.icon)}
    </a>
  `);

  const statusDot = config.status.available ? 'status-dot--available' : 'status-dot--busy';

  renderHTML('#home-section', `
    <section class="hero" id="hero">
      <div class="container hero__content">
        <div class="hero__status">
          <span class="status-dot ${statusDot}"></span>
          <span>${config.status.text}</span>
        </div>

        <h1 class="hero__name">
          <span class="hero__greeting">Hi, I'm</span>
          <span class="hero__name-text">${config.name}</span>
        </h1>

        <p class="hero__title">${config.title}</p>
        <p class="hero__subtitle">${config.subtitle}</p>

        <p class="hero__tech">${techLine}</p>

        <div class="hero__cta">
          <a href="#projects-section" class="btn btn--primary">View Projects</a>
          <a href="${config.cv}" target="_blank" rel="noopener noreferrer" class="btn btn--outline">
            ${getIcon('download')} Download CV
          </a>
        </div>

        <div class="hero-social">
          ${socialLinks}
        </div>
      </div>
    </section>
  `);
}
