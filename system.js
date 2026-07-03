// ============================================================
// Credit Poa v1.0
// system.js — Shared Utility Logic
// Available to: dashboard.html, admin.html
// Load this as a regular script before section-specific logic
// ============================================================

// ------------------------------------------------------------
// THEME
// Applied on page load from localStorage
// Toggle is handled inline in each HTML file
// ------------------------------------------------------------

(function applyTheme() {
  const saved = localStorage.getItem('cpTheme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// ------------------------------------------------------------
// FORMAT HELPERS
// ------------------------------------------------------------

/**
 * Format a number as KES currency
 * formatKES(2500) => "KES 2,500"
 */
function formatKES(amount) {
  const num = parseFloat(amount) || 0;
  return 'KES ' + num.toLocaleString('en-KE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/**
 * Format a Firestore Timestamp or date string to a readable date
 * formatDate(date) => "12 Jul 2026"
 */
function formatDate(value) {
  if (!value) return 'N/A';
  const d = value.toDate ? value.toDate() : new Date(value);
  if (isNaN(d)) return 'N/A';
  return d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Format a date with time
 * formatDateTime(date) => "12 Jul 2026, 14:30"
 */
function formatDateTime(value) {
  if (!value) return 'N/A';
  const d = value.toDate ? value.toDate() : new Date(value);
  if (isNaN(d)) return 'N/A';
  return d.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/**
 * Get days remaining from a date value
 * Returns a negative number if already passed
 */
function daysRemaining(value) {
  if (!value) return null;
  const d    = value.toDate ? value.toDate() : new Date(value);
  const now  = new Date();
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}

/**
 * Get today's date string in YYYY-MM-DD format
 */
function todayString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Capitalize first letter of a string
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate a string to a max length
 */
function truncate(str, max = 40) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '...' : str;
}

// ------------------------------------------------------------
// STATUS BADGE BUILDER
// Returns an HTML string for a status badge
// ------------------------------------------------------------

function statusBadge(status) {
  const map = {
    'active':   { cls: 'badge-green', label: 'Active' },
    'expired':  { cls: 'badge-red',   label: 'Expired' },
    'pending':  { cls: 'badge-amber', label: 'Pending' },
    'inactive': { cls: 'badge-muted', label: 'Inactive' },
    'deleted':  { cls: 'badge-muted', label: 'Deleted' },
    'Active':   { cls: 'badge-blue',  label: 'Active' },
    'Repaid':   { cls: 'badge-green', label: 'Repaid' },
    'Overdue':  { cls: 'badge-red',   label: 'Overdue' },
  };
  const s = map[status] || { cls: 'badge-muted', label: status || 'Unknown' };
  return `<span class="badge ${s.cls}"><span class="dot"></span>${s.label}</span>`;
}

// ------------------------------------------------------------
// ALERT HELPER
// showAlert(elementId, message, type)
// type: 'error' | 'success' | 'info' | 'blue'
// Auto-dismisses after 5 seconds
// ------------------------------------------------------------

function showAlert(id, message, type = 'error') {
  const el = document.getElementById(id);
  if (!el) return;

  const icons = {
    error:   `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    success: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;margin-top:1px;"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    info:    `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    blue:    `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width:16px;height:16px;flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };

  el.className = `alert alert-${type} show`;
  el.innerHTML = `${icons[type] || ''}  <span>${message}</span>`;

  clearTimeout(el._alertTimer);
  el._alertTimer = setTimeout(() => {
    el.className = `alert alert-${type}`;
    el.innerHTML = '';
  }, 5000);
}

function clearAlert(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = 'alert';
  el.innerHTML = '';
}

// ------------------------------------------------------------
// BUTTON LOADING STATE
// setLoading(buttonId, true, 'Default Label')
// ------------------------------------------------------------

function setLoading(id, loading, defaultLabel = 'Submit') {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.disabled = loading;
  btn.innerHTML = loading
    ? `<span class="spinner"></span> Please wait...`
    : defaultLabel;
}

// ------------------------------------------------------------
// MODAL HELPERS
// openModal / closeModal available globally
// ------------------------------------------------------------

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal when clicking the overlay background
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
});

// ------------------------------------------------------------
// SIDEBAR HELPERS
// Used by mobile hamburger toggle
// ------------------------------------------------------------

function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebar-overlay')?.classList.toggle('show');
}

function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('show');
}

// ------------------------------------------------------------
// THEME TOGGLE
// Switches between dark and light, saves to localStorage
// ------------------------------------------------------------

function toggleTheme() {
  const html   = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const next   = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('cpTheme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon  = document.getElementById('theme-icon');
  if (!icon) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  icon.innerHTML = isDark
    ? `<circle cx="12" cy="12" r="5"/>
       <line x1="12" y1="1" x2="12" y2="3"/>
       <line x1="12" y1="21" x2="12" y2="23"/>
       <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
       <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
       <line x1="1" y1="12" x2="3" y2="12"/>
       <line x1="21" y1="12" x2="23" y2="12"/>
       <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
       <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`
    : `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`;
}

// ------------------------------------------------------------
// SECTION NAVIGATION
// Used by sidebar nav items
// Titles map must be provided by each page
// ------------------------------------------------------------

function navigateTo(sectionId, titlesMap) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const section = document.getElementById(`section-${sectionId}`);
  const navItem = document.getElementById(`nav-${sectionId}`);

  if (section) section.classList.add('active');
  if (navItem) navItem.classList.add('active');

  const titleEl = document.getElementById('header-title');
  if (titleEl && titlesMap) {
    titleEl.textContent = titlesMap[sectionId] || '';
  }

  closeSidebar();
}

// ------------------------------------------------------------
// EMPTY STATE BUILDER
// Returns HTML string for an empty state block
// ------------------------------------------------------------

function emptyState(icon, title, description, buttonLabel = null, buttonOnclick = null) {
  const btn = buttonLabel
    ? `<button class="btn btn-primary" onclick="${buttonOnclick}">${buttonLabel}</button>`
    : '';
  return `
    <div class="empty-state">
      ${icon}
      <h3>${title}</h3>
      <p>${description}</p>
      ${btn}
    </div>
  `;
}

// ------------------------------------------------------------
// CLIPBOARD COPY
// copyToClipboard(text) then show brief confirmation
// ------------------------------------------------------------

async function copyToClipboard(text, feedbackElementId = null) {
  try {
    await navigator.clipboard.writeText(text);
    if (feedbackElementId) {
      const el = document.getElementById(feedbackElementId);
      if (el) {
        const original = el.textContent;
        el.textContent = 'Copied';
        setTimeout(() => { el.textContent = original; }, 2000);
      }
    }
  } catch (e) {
    console.error('Clipboard copy failed:', e);
  }
}

// ------------------------------------------------------------
// DEBOUNCE
// Used for search inputs
// debounce(fn, 300)
// ------------------------------------------------------------

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ------------------------------------------------------------
// EXPIRY STATUS CALCULATOR
// Returns { daysLeft, label, badgeClass } from a Firestore date
// ------------------------------------------------------------

function expiryStatus(expiryValue) {
  if (!expiryValue) return { daysLeft: null, label: 'No expiry set', badgeClass: 'badge-muted' };
  const d    = expiryValue.toDate ? expiryValue.toDate() : new Date(expiryValue);
  const days = Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24));

  if (days < 0)  return { daysLeft: days, label: `Expired ${Math.abs(days)}d ago`, badgeClass: 'badge-red' };
  if (days === 0) return { daysLeft: 0,   label: 'Expires today',                  badgeClass: 'badge-amber' };
  if (days <= 7)  return { daysLeft: days, label: `${days}d left`,                 badgeClass: 'badge-amber' };
  return              { daysLeft: days, label: `${days}d left`,                     badgeClass: 'badge-green' };
}

// ------------------------------------------------------------
// WELLNESS SCORE COLOR
// Returns 'green' | 'amber' | 'red' based on score
// ------------------------------------------------------------

function scoreColor(score) {
  if (score >= 70) return 'green';
  if (score >= 40) return 'amber';
  return 'red';
}

function scoreVerdict(score) {
  if (score >= 70) return 'Good standing. Keep up the positive habits.';
  if (score >= 40) return 'Moderate. There is room to improve.';
  return 'Needs attention. Follow your improvement tips.';
}

// ------------------------------------------------------------
// EXPORTS
// Attach to window so Firebase module scripts can access them
// ------------------------------------------------------------

window.formatKES        = formatKES;
window.formatDate       = formatDate;
window.formatDateTime   = formatDateTime;
window.daysRemaining    = daysRemaining;
window.todayString      = todayString;
window.capitalize       = capitalize;
window.truncate         = truncate;
window.statusBadge      = statusBadge;
window.showAlert        = showAlert;
window.clearAlert       = clearAlert;
window.setLoading       = setLoading;
window.openModal        = openModal;
window.closeModal       = closeModal;
window.toggleSidebar    = toggleSidebar;
window.closeSidebar     = closeSidebar;
window.toggleTheme      = toggleTheme;
window.updateThemeIcon  = updateThemeIcon;
window.navigateTo       = navigateTo;
window.emptyState       = emptyState;
window.copyToClipboard  = copyToClipboard;
window.debounce         = debounce;
window.expiryStatus     = expiryStatus;
window.scoreColor       = scoreColor;
window.scoreVerdict     = scoreVerdict;
