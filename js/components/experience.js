import { experiences } from '../data/experience.js';
import { education } from '../data/education.js';
import { awards, certificates, organizations } from '../data/achievements.js';
import { renderHTML, renderList } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

function renderExperienceItems() {
  return renderList(experiences, (exp) => {
    const bullets = renderList(exp.description, (desc) => `<li>${desc}</li>`);
    const currentBadge = exp.current ? '<span class="badge badge--current">Current</span>' : '';

    return `
      <div class="timeline-item reveal">
        <div class="timeline-card">
          <div class="timeline-card__header">
            <h3 class="timeline-card__role">${exp.role}</h3>
            <div class="timeline-card__badges">
              ${currentBadge}
              <span class="badge badge--type">${exp.type}</span>
            </div>
          </div>
          <div class="timeline-card__subheader">
            <p class="timeline-card__company">${exp.company}</p>
            <span class="timeline-card__period">${exp.period}</span>
          </div>
          <ul class="timeline-card__desc">${bullets}</ul>
        </div>
      </div>
    `;
  });
}

function renderEducationItems() {
  return renderList(education, (edu) => `
    <div class="timeline-item reveal">
      <div class="timeline-card">
        <div class="timeline-card__header">
          <h3 class="timeline-card__role">${edu.degree}</h3>
        </div>
        <div class="timeline-card__subheader">
          <p class="timeline-card__company">${edu.school}</p>
          <span class="timeline-card__period">${edu.period}</span>
        </div>
        <p class="timeline-card__location">${edu.location}</p>
      </div>
    </div>
  `);
}

function renderAchievements() {
  const awardItems = renderList(awards, (item) => `
    <div class="achievement-card reveal">
      <span class="achievement-card__icon">${getIcon('award')}</span>
      <div>
        <h4 class="achievement-card__title">${item.title}</h4>
        <p class="achievement-card__sub">${item.subtitle}</p>
        <span class="achievement-card__date">${item.date}</span>
      </div>
    </div>
  `);

  const certItems = renderList(certificates, (item) => `
    <div class="achievement-card reveal">
      <span class="achievement-card__icon">${getIcon('certificate')}</span>
      <div>
        <h4 class="achievement-card__title">${item.title}</h4>
        <p class="achievement-card__sub">${item.issuer}</p>
        <span class="achievement-card__date">${item.date}</span>
      </div>
    </div>
  `);

  const orgItems = renderList(organizations, (item) => `
    <div class="achievement-card reveal">
      <span class="achievement-card__icon">${getIcon('briefcase')}</span>
      <div>
        <h4 class="achievement-card__title">${item.role}</h4>
        <p class="achievement-card__sub">${item.name}</p>
        <span class="achievement-card__date">${item.period}</span>
      </div>
    </div>
  `);

  return { awardItems, certItems, orgItems };
}

export function renderExperience() {
  const { awardItems, certItems, orgItems } = renderAchievements();

  renderHTML('#experience-section', `
    <section class="section section--alt" id="experience">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Resume</div>
          <h2 class="section-title">Experience & Background</h2>
        </div>

        <div class="experience-grid">

          <div class="experience-col">
            <h3 class="experience-col__heading">${getIcon('briefcase')} Work Experience</h3>
            <div class="timeline">
              ${renderExperienceItems()}
            </div>
          </div>

          <div class="experience-col">
            <h3 class="experience-col__heading">${getIcon('certificate')} Education</h3>
            <div class="timeline">
              ${renderEducationItems()}
            </div>

            <h3 class="experience-col__heading mt-section">${getIcon('award')} Awards</h3>
            <div class="achievements-list">
              ${awardItems}
            </div>

            <h3 class="experience-col__heading mt-section">${getIcon('certificate')} Certificates</h3>
            <div class="achievements-list">
              ${certItems}
            </div>

            <h3 class="experience-col__heading mt-section">${getIcon('briefcase')} Organizations</h3>
            <div class="achievements-list">
              ${orgItems}
            </div>
          </div>

        </div>
      </div>
    </section>
  `);
}
