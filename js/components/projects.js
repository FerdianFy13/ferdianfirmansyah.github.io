import { projects } from '../data/projects.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

function renderFeatured(project) {
  const techBadges = renderList(project.tech, (tech) => `
    <span class="tech-badge">${tech}</span>
  `);

  const linksHTML = `
    ${project.github ? `<a href="${project.github}" class="btn btn--outline" target="_blank" rel="noopener noreferrer">${getIcon('github')} Code</a>` : ''}
    ${project.demo   ? `<a href="${project.demo}"   class="btn btn--primary" target="_blank" rel="noopener noreferrer">${getIcon('externalLink')} Live Demo</a>` : ''}
  `;

  return `
    <article class="featured-project reveal">
      <span class="featured-project__label">Featured Project</span>
      <h3 class="featured-project__name">${project.name}</h3>
      <p class="featured-project__desc">${project.description}</p>
      <div class="featured-project__tech">${techBadges}</div>
      <div class="featured-project__links">${linksHTML}</div>
    </article>
  `;
}

function renderProjectRow(project) {
  const techLine = project.tech.join(' · ');

  const linksHTML = project.private
    ? `<span class="badge badge--private">${getIcon('lock')} Private</span>`
    : `
        ${project.github ? `<a href="${project.github}" class="project-link" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer">${getIcon('github')}</a>` : ''}
        ${project.demo   ? `<a href="${project.demo}"   class="project-link" aria-label="View live demo"   target="_blank" rel="noopener noreferrer">${getIcon('externalLink')}</a>` : ''}
      `;

  return `
    <article class="project-row reveal">
      <div class="project-row__main">
        <div class="project-row__heading">
          <h3 class="project-row__name">${project.name}</h3>
          <span class="badge badge--type">${project.type}</span>
        </div>
        <p class="project-row__desc">${project.description}</p>
        <p class="project-row__tech">${techLine}</p>
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
    <section class="section section--alt" id="projects">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Projects</div>
          <h2 class="section-title">What I've Built</h2>
        </div>

        ${featured ? renderFeatured(featured) : ''}

        <div class="projects-list">
          ${renderList(rest, renderProjectRow)}
        </div>
      </div>
    </section>
  `);
}
