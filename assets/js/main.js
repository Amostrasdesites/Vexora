import { initContactLinks } from './components/contact.js';
import { renderPlans } from './components/plans.js';
import { initQuote } from './components/quote.js';
import { initPortfolio } from './components/portfolio.js';
import { initAnimations } from './components/animations.js';

// Os módulos são executados depois de o HTML ter sido interpretado.
initContactLinks();
renderPlans();
initQuote();
initPortfolio();
initAnimations();
