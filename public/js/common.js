const apiBase = '/api/bank';

function setActiveNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const active = link.getAttribute('href') === currentPath;
    link.classList.toggle('active', active);
  });
}

async function request(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

function formatCurrency(value) {
  return Number(value).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString();
}

let toastTimer = null;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast show ${type === 'error' ? 'error' : ''}`;

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.className = 'toast';
  }, 2600);
}

function renderAccountsRows(targetId, accounts, emptyText = 'No data available') {
  const tbody = document.getElementById(targetId);
  if (!tbody) return;

  tbody.innerHTML = '';
  if (!accounts.length) {
    tbody.innerHTML = `<tr><td colspan="3">${emptyText}</td></tr>`;
    return;
  }

  accounts.forEach((account) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${account.accountNumber}</td>
      <td>${formatCurrency(account.balance)}</td>
      <td>${formatDate(account.createdAt)}</td>
    `;
    tbody.appendChild(tr);
  });
}

setActiveNav();
