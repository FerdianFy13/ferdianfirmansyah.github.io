import { projects } from '../data/projects.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

function renderProjectCard(project) {
  const techBadges = renderList(project.tech, (tech) => `
    <span class="tech-badge">${tech}</span>
  `);

  const linksHTML = project.private
    ? `<span class="badge badge--private">${getIcon('lock')} Private</span>`
    : `
        ${project.github ? `<a href="${project.github}" class="project-link" aria-label="View on GitHub" target="_blank" rel="noopener noreferrer">${getIcon('github')}</a>` : ''}
        ${project.demo   ? `<a href="${project.demo}"   class="project-link" aria-label="View live demo"   target="_blank" rel="noopener noreferrer">${getIcon('externalLink')}</a>` : ''}
      `;

  const companyTag = project.company
    ? `<span class="project-card__company">${project.company}</span>`
    : '';

  return `
    <article class="project-card reveal">
      <div class="project-card__header">
        <span class="badge badge--type">${project.type}</span>
        <div class="project-card__links">
          ${linksHTML}
        </div>
      </div>

      <h3 class="project-card__name">${project.name}</h3>
      ${companyTag}
      <p class="project-card__desc">${project.description}</p>

      <div class="project-card__tech">
        ${techBadges}
      </div>

      <div class="project-card__footer">
        <span class="project-card__role">${project.role}</span>
      </div>
    </article>
  `;
}

export function renderProjects() {
  renderHTML('#projects-section', `
    <section class="section section--alt" id="projects">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Projects</div>
          <h2 class="section-title">What I've Built</h2>
        </div>

        <div class="projects-grid">
          ${renderList(projects, renderProjectCard)}
        </div>
      </div>
    </section>
  `);
}
