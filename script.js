document.getElementById("calcForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const amp = parseFloat(document.getElementById("amp").value);
  const minutes = parseFloat(document.getElementById("minutes").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const voltage = parseFloat(document.getElementById("voltage").value);

  if (isNaN(amp) || isNaN(minutes) || isNaN(rate) || isNaN(voltage)) {
    alert("Please enter valid numbers in all fields.");
    return;
  }

  // Formula: kWh = (Amp × Voltage × Hours) / 1000
  const hours = minutes / 60;
  const kWh = (amp * voltage * hours) / 1000;
  const cost = kWh * rate;

  const resultBox = document.getElementById("result");
  resultBox.textContent = `Estimated Cost: RM ${cost.toFixed(4)}`;
  resultBox.classList.remove("hidden");

  // Save to history
  addToHistory(amp, minutes, rate, voltage, cost);
});

// Add entry to history table
function addToHistory(amp, minutes, rate, voltage, cost) {
  const tableBody = document.querySelector("#historyTable tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${amp}</td>
    <td>${minutes}</td>
    <td>${rate}</td>
    <td>${voltage}</td>
    <td>RM ${cost.toFixed(4)}</td>
  `;

  tableBody.appendChild(row);

  saveHistory();
}

// Save history to localStorage
function saveHistory() {
  const rows = [];
  document.querySelectorAll("#historyTable tbody tr").forEach(tr => {
    const cols = tr.querySelectorAll("td");
    rows.push({
      amp: cols[0].textContent,
      minutes: cols[1].textContent,
      rate: cols[2].textContent,
      voltage: cols[3].textContent,
      cost: cols[4].textContent
    });
  });
  localStorage.setItem("calcHistory", JSON.stringify(rows));
}

// Load history from localStorage
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  const tableBody = document.querySelector("#historyTable tbody");
  tableBody.innerHTML = "";

  history.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.amp}</td>
      <td>${entry.minutes}</td>
      <td>${entry.rate}</td>
      <td>${entry.voltage}</td>
      <td>${entry.cost}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Clear history
function clearHistory() {
  localStorage.removeItem("calcHistory");
  document.querySelector("#historyTable tbody").innerHTML = "";
}

// Load history on page load
window.onload = loadHistory;
