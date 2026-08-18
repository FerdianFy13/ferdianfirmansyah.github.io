import { renderNavbar } from "./components/navbar.js";
import { renderHero } from "./components/hero.js";
import { renderAbout } from "./components/about.js";
import { renderExperience } from "./components/experience.js";
import { renderSkills } from "./components/skills.js";
import { renderProjects } from "./components/projects.js";
import { renderContact } from "./components/contact.js";
import { renderFooter } from "./components/footer.js";

import {
  initScrollReveal,
  initProgressBar,
  initNavbarScroll,
  initNavScrollSpy,
  initSmoothScroll,
  initMobileMenu,
} from "./utils/animation.js";
import { initHeroScene } from "./utils/heroScene.js";
import { initBgScene } from "./utils/bgScene.js";

function render() {
  renderNavbar();
  renderHero();
  renderAbout();
  renderExperience();
  renderSkills();
  renderProjects();
  renderContact();
  renderFooter();
}

function init() {
  render();
  initScrollReveal();
  initProgressBar();
  initNavbarScroll();
  initNavScrollSpy();
  initSmoothScroll();
  initMobileMenu();
  initHeroScene();
  initBgScene();
}

document.addEventListener("DOMContentLoaded", init);
