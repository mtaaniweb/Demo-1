// ============================================================
// Credit Poa v1.0
// app.js - Public Site Logic
// Applies to: index.html only
// ============================================================

// ------------------------------------------------------------
// PAGE ROUTING
// ------------------------------------------------------------

const PAGE_TITLES = {
  'home':         'Credit Poa | Know Where You Stand Financially',
  'how-it-works': 'How It Works | Credit Poa',
  'what-you-get': 'What You Get | Credit Poa',
  'pricing':      'Pricing | Credit Poa',
  'about':        'About | Credit Poa',
  'faqs':         'FAQs | Credit Poa',
  'terms':        'Terms and Conditions | Credit Poa',
  'privacy':      'Privacy Policy | Credit Poa',
};

const NAV_PAGES = ['home', 'how-it-works', 'what-you-get', 'pricing', 'about', 'faqs'];

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(`page-${pageId}`);
  if (target) target.classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activeLink = document.getElementById(`navlink-${pageId}`);
  if (activeLink) activeLink.classList.add('active');

  // Update page title
  document.title = PAGE_TITLES[pageId] || PAGE_TITLES['home'];

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav if open
  closeNav();
}

// Expose globally so onclick attributes in HTML work
window.showPage = showPage;

// ------------------------------------------------------------
// MOBILE NAV TOGGLE
// ------------------------------------------------------------

function toggleNav() {
  const nav       = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  const isOpen    = nav.classList.contains('open');

  if (isOpen) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
  } else {
    nav.classList.add('open');
    hamburger.classList.add('open');
  }
}

function closeNav() {
  document.getElementById('nav-links')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');
}

window.toggleNav = toggleNav;
window.closeNav  = closeNav;

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  const nav       = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  if (!nav || !hamburger) return;
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeNav();
  }
});

// ------------------------------------------------------------
// SCROLL BEHAVIOUR
// Add shadow to header on scroll
// ------------------------------------------------------------

const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ------------------------------------------------------------
// FAQ ACCORDION
// ------------------------------------------------------------

const FAQS = [
  {
    q: 'What exactly is Credit Poa?',
    a: 'Credit Poa is a financial wellness platform that provides a personalised review of your mobile lending activity and gives you the tools to track your loans, monitor your progress, and improve your financial profile over time.'
  },
  {
    q: 'Is this a CRB report?',
    a: 'No. Credit Poa is not a CRB report, credit score, or clearance certificate. It is an independent financial review based on the information you provide. No official bureau data is accessed.'
  },
  {
    q: 'How do you get my information?',
    a: 'You provide your details through the intake form inside your dashboard after login. Nothing is accessed without your input and consent.'
  },
  {
    q: 'How long does it take?',
    a: 'Your account is activated shortly after payment confirmation via WhatsApp. You can generate your report immediately after completing the intake form. The whole process takes a few minutes.'
  },
  {
    q: 'How do I receive my report?',
    a: 'You generate and download your report directly from your dashboard at any time during an active subscription. No waiting period. You can regenerate it as many times as you like whenever your information changes.'
  },
  {
    q: 'What if I use multiple loan apps?',
    a: 'That is exactly what Credit Poa is built for. The intake form covers all major Kenyan loan apps. The review gives you a complete picture of your borrowing activity across all of them.'
  },
  {
    q: 'Will this increase my loan limit immediately?',
    a: 'No. Credit Poa gives you a strategy to improve your profile over time, typically within 30 to 90 days of following the recommendations. Results depend entirely on your own actions and repayment behaviour.'
  },
  {
    q: 'Who is this service best for?',
    a: 'Anyone using mobile loan apps in Kenya who wants to understand their risk level, increase their limits, prepare for a bank loan, clear CRB, or simply build better borrowing habits.'
  },
  {
    q: 'Is my information safe?',
    a: 'Yes. All information is stored securely in a private database and treated as strictly confidential. It is never shared with any lender, bureau, or third party under any circumstances.'
  },
  {
    q: 'Is the payment refundable?',
    a: 'No. All payments are non-refundable once access has been activated. Fees are stated clearly before payment and are accepted upon completion.'
  },
  {
    q: 'Can I regenerate my report?',
    a: 'Yes. You can update your intake form and regenerate your report as many times as you like during an active subscription period. There is no limit.'
  },
  {
    q: 'What makes Credit Poa different?',
    a: 'Most people borrow without understanding how lenders evaluate them. Credit Poa shows you exactly what is happening with your profile and gives you a live dashboard to track your progress over time. It is not a one-time document. It is an ongoing tool that grows with you.'
  },
];

function buildFAQs() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  container.innerHTML = FAQS.map((faq, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-question" onclick="toggleFAQ(${i})">
        <span>${faq.q}</span>
        <svg class="faq-arrow" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <div class="faq-answer">${faq.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const item = document.getElementById(`faq-${index}`);
  if (!item) return;
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

window.toggleFAQ = toggleFAQ;

// ------------------------------------------------------------
// SMOOTH ANCHOR LINKS
// Intercept any onclick="showPage(...)" from footer links
// already handled by showPage() above
// ------------------------------------------------------------

// ------------------------------------------------------------
// INIT
// ------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  buildFAQs();

  // Show home page by default
  showPage('home');

  // Handle browser back/forward if needed
  // Basic hash routing support
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`page-${hash}`)) {
    showPage(hash);
  }
});
