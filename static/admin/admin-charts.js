// static/admin/admin-charts.js

// Helper to build charts
function makeChart(ctx, type, labels, data, label, color) {
  return new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: type === 'line' ? color + '33' : color + '99',
        borderColor: color,
        borderWidth: 1,
        tension: 0.3,
        fill: type !== 'line'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: type !== 'pie' ? {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      } : {}
    }
  });
}

// Fetch JSON helper
async function fetchJSON(url) {
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

// Initialize charts
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch data from Flask APIs
    const stationResp = await fetchJSON('/api/admin/bookings-per-station');
    const dayResp = await fetchJSON('/api/admin/bookings-per-day');

    // Bookings per Station
    const stationCtx = document.getElementById('chartBookingsPerStation').getContext('2d');
    if (stationResp.labels?.length) {
      makeChart(stationCtx, 'bar', stationResp.labels, stationResp.data, 'Bookings', '#0d6efd');
    } else {
      console.warn('No station booking data available.');
    }

    // Bookings per Day
    const dayCtx = document.getElementById('chartBookingsPerDay').getContext('2d');
    if (dayResp.labels?.length) {
      makeChart(dayCtx, 'line', dayResp.labels, dayResp.data, 'Bookings per Day', '#198754');
    } else {
      console.warn('No daily booking data available.');
    }
  } catch (err) {
    console.error('Chart init error:', err);
  }
});
