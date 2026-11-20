import { config } from '../data/config.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

export function renderHero() {
  const socialLinks = renderList(config.social, (item) => `
    <a href="${item.url}" class="hero-social__link" aria-label="${item.platform}" target="_blank" rel="noopener noreferrer">
      ${getIcon(item.icon)}
    </a>
  `);

  const stackItems = config.techHighlights.map((tech, i) => `
    <li><span>${String(i + 1).padStart(2, '0')}</span>${tech}</li>
  `).join('');

  const statusDot = config.status.available ? 'status-dot--available' : 'status-dot--busy';

  renderHTML('#home-section', `
    <section class="hero" id="hero">
      <div class="container hero__grid">
        <div class="hero__main">
          <p class="hero__status">
            <span class="status-dot ${statusDot}"></span>
            <span>${config.status.text}</span>
          </p>

          <h1 class="hero__name">
            <span class="hero__greeting">Hi, I'm</span>
            <span class="hero__name-text">${config.name}</span>
          </h1>

          <div>
            <p class="hero__title">${config.title}</p>
            <p class="hero__subtitle">${config.subtitle}</p>
          </div>

          <div class="hero__cta">
            <a href="#projects-section" class="btn btn--primary">View Projects ${getIcon('externalLink')}</a>
            <button type="button" data-doc-open="cv" class="btn btn--outline">
              ${getIcon('eye')} View CV
            </button>
            <button type="button" data-doc-open="portfolio" class="btn btn--outline">
              ${getIcon('eye')} View Portfolio
            </button>
          </div>

          <div class="hero-social">${socialLinks}</div>
        </div>

        <aside class="hero__stack" aria-label="Core stack">
          <p class="eyebrow">Core stack</p>
          <ol class="hero__stack-list">${stackItems}</ol>
        </aside>
      </div>
    </section>
  `);
}
