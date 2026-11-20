import { projects } from '../data/projects.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

const pad = (n) => String(n).padStart(2, '0');

function renderFeatured(project) {
  const linksHTML = `
    ${project.demo   ? `<a href="${project.demo}"   class="btn btn--primary" target="_blank" rel="noopener noreferrer">Live Demo ${getIcon('externalLink')}</a>` : ''}
    ${project.github ? `<a href="${project.github}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">${getIcon('github')} Code</a>` : ''}
  `;

  return `
    <article class="featured-project reveal">
      <span class="featured-project__index" aria-hidden="true">01</span>
      <div class="featured-project__body">
        <span class="eyebrow featured-project__label">Featured Project</span>
        <h3 class="featured-project__name">${project.name}</h3>
        <p class="featured-project__desc">${project.description}</p>
        <p class="featured-project__tech">${project.tech.join(' · ')}</p>
        <div class="featured-project__links">${linksHTML}</div>
      </div>
    </article>
  `;
}

function renderProjectRow(project, i) {
  const linksHTML = project.private
    ? `<span class="project-private">${getIcon('lock')} Private</span>`
    : `
        ${project.github ? `<a href="${project.github}" class="project-link" aria-label="${project.name} on GitHub" target="_blank" rel="noopener noreferrer">${getIcon('github')}</a>` : ''}
        ${project.demo   ? `<a href="${project.demo}"   class="project-link" aria-label="${project.name} live demo"   target="_blank" rel="noopener noreferrer">${getIcon('externalLink')}</a>` : ''}
      `;

  return `
    <article class="project-row reveal">
      <span class="project-row__index" aria-hidden="true">${pad(i + 2)}</span>
      <div class="project-row__main">
        <h3 class="project-row__name">${project.name}<span class="project-row__type">${project.type}</span></h3>
        <p class="project-row__desc">${project.description}</p>
        <p class="project-row__tech">${project.tech.join(' · ')}</p>
      </div>
      <div class="project-row__side">
        <span class="project-row__role">${project.role}</span>
        <div class="project-row__links">${linksHTML}</div>
      </div>
    </article>
  `;
}

export function renderProjects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  renderHTML('#projects-section', `
    <section class="section" id="projects">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Projects</div>
          <h2 class="section-title">What I've Built</h2>
        </div>

        ${featured ? renderFeatured(featured) : ''}

        <div class="projects-list">
          ${rest.map(renderProjectRow).join('')}
        </div>
      </div>
    </section>
  `);
}
