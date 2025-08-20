const form = document.getElementById("calc-form");
const resultBox = document.getElementById("result");
const historySection = document.getElementById("history-section");
const historyList = document.getElementById("history-list");

const historyBtn = document.getElementById("history-btn");
const clearBtn = document.getElementById("clear-btn");
const aboutBtn = document.getElementById("about-btn");
const aboutModal = document.getElementById("about-modal");
const closeAbout = document.getElementById("close-about");

// Load history from localStorage
let history = JSON.parse(localStorage.getItem("tnbHistory")) || [];

function saveHistory() {
  localStorage.setItem("tnbHistory", JSON.stringify(history));
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const amp = parseFloat(document.getElementById("amp").value);
  const minutes = parseFloat(document.getElementById("minutes").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const voltage = parseFloat(document.getElementById("voltage").value);

  if (isNaN(amp) || isNaN(minutes) || isNaN(rate) || isNaN(voltage)) {
    resultBox.textContent = "Please enter valid numbers.";
    return;
  }

  // Calculation
  const power = amp * voltage; // Watts
  const kWh = (power * (minutes / 60)) / 1000;
  const cost = kWh * rate;

  const output = `Usage: ${kWh.toFixed(4)} kWh | Cost: RM ${cost.toFixed(4)}`;
  resultBox.textContent = output;

  // Save to history
  history.unshift(output);
  if (history.length > 10) history.pop();
  saveHistory();
  renderHistory();

  // Clear inputs except rate & voltage
  document.getElementById("amp").value = "";
  document.getElementById("minutes").value = "";
});

historyBtn.addEventListener("click", () => {
  historySection.classList.toggle("hidden");
  renderHistory();
});

clearBtn.addEventListener("click", () => {
  history = [];
  saveHistory();
  renderHistory();
});

aboutBtn.addEventListener("click", () => {
  aboutModal.classList.remove("hidden");
});

closeAbout.addEventListener("click", () => {
  aboutModal.classList.add("hidden");
});
