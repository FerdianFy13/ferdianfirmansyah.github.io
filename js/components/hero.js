import { config } from '../data/config.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

export function renderHero() {
  const techChips = renderList(config.techHighlights, (tech) => `
    <span class="tech-chip">${tech}</span>
  `);

  const socialLinks = renderList(config.social, (item) => `
    <a href="${item.url}" class="hero-social__link" aria-label="${item.platform}" target="_blank" rel="noopener noreferrer">
      ${getIcon(item.icon)}
    </a>
  `);

  const statusClass = config.status.available ? 'status--available' : 'status--busy';
  const statusDot = config.status.available ? 'status-dot--green' : 'status-dot--yellow';

  renderHTML('#home-section', `
    <section class="hero" id="hero">
      <div class="hero__bg-orb hero__bg-orb--1"></div>
      <div class="hero__bg-orb hero__bg-orb--2"></div>
      <canvas class="hero__canvas" id="hero-canvas" aria-hidden="true"></canvas>

      <div class="container hero__content">
        <div class="hero__status ${statusClass}">
          <span class="status-dot ${statusDot}"></span>
          <span>${config.status.text}</span>
        </div>

        <h1 class="hero__name">
          <span class="hero__greeting">Hi, I'm</span>
          <span class="hero__name-text">${config.name}</span>
        </h1>

        <p class="hero__title">${config.title}</p>
        <p class="hero__subtitle">${config.subtitle}</p>

        <div class="hero__tech">
          ${techChips}
        </div>

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

      <a href="#about-section" class="hero__scroll-indicator" aria-label="Scroll to About">
        ${getIcon('arrowDown')}
      </a>
    </section>
  `);
}
