function calculateBill() {
  const usage = parseFloat(document.getElementById('usage').value);
  if (isNaN(usage) || usage <= 0) {
    alert('Please enter a valid kWh usage.');
    return;
  }
  const rate = 0.218; // RM/kWh
  const cost = (usage * rate).toFixed(2);

  document.getElementById('result').innerText = `Estimated Bill: RM ${cost}`;
  document.getElementById('resultCard').style.display = 'block';

  saveHistory(usage, cost);
}

function saveHistory(usage, cost) {
  let history = JSON.parse(localStorage.getItem('tnbHistory')) || [];
  history.unshift(`Usage: ${usage} kWh → RM ${cost}`);
  if (history.length > 10) history.pop();
  localStorage.setItem('tnbHistory', JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem('tnbHistory')) || [];
  const list = document.getElementById('history');
  list.innerHTML = '';
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    list.appendChild(li);
  });
}

function clearHistory() {
  if (confirm('Clear calculation history?')) {
    localStorage.removeItem('tnbHistory');
    renderHistory();
  }
}

function installApp() {
  alert("To install this app, select 'Install App' from your browser menu or add to home screen.");
}

// Load history on page load
window.onload = renderHistory;
