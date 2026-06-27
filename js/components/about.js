import { config } from '../data/config.js';
import { renderHTML } from '../utils/render.js';
import { getIcon } from '../utils/icons.js';

export function renderAbout() {
  const aboutLines = config.about.trim().split('\n').map((line) => line.trim()).filter(Boolean);
  const aboutParagraphs = aboutLines.map((line) => `<p>${line}</p>`).join('');

  const contactInfo = [
    { label: 'Email',    value: config.email,    href: `mailto:${config.email}`          },
    { label: 'Phone',    value: config.phone,    href: `https://wa.me/6281337915702`     },
    { label: 'Location', value: config.location, href: null                              },
  ];

  const infoRows = contactInfo.map((item) => `
    <li class="about-info__item">
      <span class="about-info__label">${item.label}</span>
      ${item.href
        ? `<a href="${item.href}" class="about-info__value">${item.value}</a>`
        : `<span class="about-info__value">${item.value}</span>`
      }
    </li>
  `).join('');

  renderHTML('#about-section', `
    <section class="section" id="about">
      <div class="container">
        <div class="about-grid">

          <div class="about-photo reveal">
            <div class="about-photo__frame">
              <img src="images/ferdian.webp" alt="Ferdian Firmansyah" loading="lazy" decoding="async">
              <div class="about-photo__dots" aria-hidden="true"></div>
              <div class="about-photo__status" aria-label="Current status">
                <span class="about-photo__status-dot"></span>
                ${config.status.currentRole}
              </div>
            </div>
          </div>

          <div class="about-content reveal">
            <div class="section-label">About Me</div>
            <h2 class="section-title">Passionate Software Engineer</h2>

            <div class="about-bio">
              ${aboutParagraphs}
            </div>

            <ul class="about-info" aria-label="Contact information">
              ${infoRows}
            </ul>

            <div class="about-actions">
              <a href="${config.cv}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
                ${getIcon('download')} Download CV
              </a>
              <a href="#contact-section" class="btn btn--outline">Contact Me</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  `);
}
