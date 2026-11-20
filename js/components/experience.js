import { experiences } from '../data/experience.js';
import { education } from '../data/education.js';
import { awards, certificates, organizations } from '../data/achievements.js';
import { renderHTML, renderList } from '../utils/render.js';

function renderExperienceItems() {
  return renderList(experiences, (exp) => {
    const bullets = renderList(exp.description, (desc) => `<li>${desc}</li>`);
    const now = exp.current ? '<span class="tl-item__now">Current</span>' : '';

    return `
      <article class="tl-item ${exp.current ? 'tl-item--current' : ''} reveal">
        <div class="tl-item__meta">
          <span class="tl-item__period">${exp.period}</span>
          ${now}
        </div>
        <div class="tl-item__body">
          <h3 class="tl-item__role">${exp.role}</h3>
          <p class="tl-item__org">${exp.company} · ${exp.type}</p>
          <ul class="tl-item__desc">${bullets}</ul>
        </div>
      </article>
    `;
  });
}

function ledgerBlock(title, items) {
  return `
    <div class="ledger__col reveal">
      <h3 class="ledger__title">${title}</h3>
      <ul>
        ${renderList(items, (item) => `
          <li class="ledger__item">
            <p class="ledger__name">${item.name}</p>
            ${item.sub ? `<p class="ledger__sub">${item.sub}</p>` : ''}
            <span class="ledger__date">${item.date}</span>
          </li>
        `)}
      </ul>
    </div>
  `;
}

export function renderExperience() {
  const eduItems = education.map((e) => ({ name: e.degree, sub: `${e.school} · ${e.location}`, date: e.period }));
  const awardItems = awards.map((a) => ({ name: a.title, sub: a.subtitle, date: a.date }));
  const certItems = certificates.map((c) => ({ name: c.title, sub: c.issuer, date: c.date }));
  const orgItems = organizations.map((o) => ({ name: o.role, sub: o.name, date: o.period }));

  renderHTML('#experience-section', `
    <section class="section section--alt" id="experience">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Resume</div>
          <h2 class="section-title">Experience & Background</h2>
        </div>

        <div class="timeline">
          ${renderExperienceItems()}
        </div>

        <div class="ledger">
          ${ledgerBlock('Education', eduItems)}
          ${ledgerBlock('Awards', awardItems)}
          ${ledgerBlock('Certificates', certItems)}
          ${ledgerBlock('Organizations', orgItems)}
        </div>
      </div>
    </section>
  `);
}
