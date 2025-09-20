// src/services/api.js
const BASE = '/api'; // same origin

async function fetchJSON(path, opts={}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// Example endpoints we’ll create in PHP:
export const Api = {
  // dashboards
  balances: (params='') => fetchJSON(`/balances.php${params ? `?${params}` : ''}`),
  collections: (params='') => fetchJSON(`/collections.php${params ? `?${params}` : ''}`),
  students:  (params='') => fetchJSON(`/students.php${params ? `?${params}` : ''}`),

  // add a payment manually (optional)
  addPayment: (payload) =>
    fetchJSON('/payments.php', { method: 'POST', body: JSON.stringify(payload) }),
};
