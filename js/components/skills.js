import { skillCategories } from '../data/skills.js';
import { renderHTML, renderList } from '../utils/render.js';

function renderSkillBadge(skill) {
  const icon = skill.img
    ? `<img src="${skill.img}" alt="${skill.name}" loading="lazy" width="20" height="20">`
    : `<span class="skill-badge__initial">${skill.name[0]}</span>`;

  return `
    <div class="skill-badge">
      ${icon}
      <span class="skill-badge__name">${skill.name}</span>
    </div>
  `;
}

export function renderSkills() {
  const categories = renderList(skillCategories, (cat) => `
    <div class="skill-group reveal">
      <h3 class="skill-group__title">${cat.category}</h3>
      <div class="skill-group__grid">
        ${renderList(cat.skills, renderSkillBadge)}
      </div>
    </div>
  `);

  renderHTML('#skills-section', `
    <section class="section" id="skills">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Skills</div>
          <h2 class="section-title">Technologies & Tools</h2>
        </div>

        <div class="skills-grid">
          ${categories}
        </div>
      </div>
    </section>
  `);
}
