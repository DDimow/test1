'use strict';
function calculatePayload(mode, truck, trailer) {
  const limit = mode === 'rail' ? 44 : 40;
  if (![truck, trailer].every(value => Number.isFinite(value) && value >= 0)) {
    return { limit, error: 'Enter a valid, non-negative weight for both vehicles.' };
  }
  const tare = truck + trailer;
  if (tare > limit) return { limit, tare, error: 'Vehicle tare exceeds the gross weight limit. Check the weights.' };
  return { limit, tare, payload: limit - tare };
}
if (typeof module !== 'undefined') module.exports = { calculatePayload };
if (typeof document !== 'undefined') {
  const byId = id => document.getElementById(id);
  const defaults = { dry: 7, temperature: 9 };
  function update() {
    const truck = byId('truck').valueAsNumber;
    const trailer = byId('tare').valueAsNumber;
    const result = calculatePayload(byId('mode').value, truck, trailer);
    byId('limit').textContent = `${result.limit.toFixed(1)} t`;
    byId('total').textContent = result.tare === undefined ? '—' : `${result.tare.toFixed(1)} t`;
    byId('formula').textContent = result.error ? '—' : `${result.limit} − ${truck} − ${trailer}`;
    byId('payload').textContent = result.error ? '—' : result.payload.toFixed(1);
    byId('kg').textContent = result.error ? 'Payload unavailable' : `${Math.round(result.payload * 1000).toLocaleString('en-GB')} kg available`;
    byId('error').hidden = !result.error;
    byId('error').textContent = result.error || '';
  }
  byId('trailer').addEventListener('change', () => {
    byId('tare').value = defaults[byId('trailer').value];
    update();
  });
  ['mode', 'truck', 'tare'].forEach(id => byId(id).addEventListener('input', update));
  byId('reset').addEventListener('click', () => {
    byId('truck').value = 8;
    byId('tare').value = defaults[byId('trailer').value];
    update();
  });
  update();
}
