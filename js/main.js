// ==== script.js (complete single file) ====
(function() {
  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  function updateToggle() {
    themeToggle.innerText = body.classList.contains('dark') ? '☀️ light mode' : '🌙 dark mode';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    updateToggle();
  });
  updateToggle();

  // --- FOOTER DATE/TIME ---
  function updateDateTime() {
    const d = new Date();
    document.getElementById('datetimeDisplay').innerText =
      d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
      ' · ' + d.toLocaleTimeString() + ' (Kigali time)';
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // --- GPA CALCULATOR ---
  const modulesContainer = document.getElementById('modulesContainer');
  const addModuleBtn = document.getElementById('addModuleBtn');
  const calcGpaBtn = document.getElementById('calcGpaBtn');
  const gpaDisplay = document.getElementById('gpaDisplay');
  const gpaError = document.getElementById('gpaError');

  addModuleBtn.addEventListener('click', () => {
    const newRow = document.createElement('div');
    newRow.className = 'module-row';
    newRow.innerHTML = `
      <input type="text" class="module-title" placeholder="module name">
      <select class="module-credit">
        <option value="10">10</option>
        <option value="15" selected>15</option>
        <option value="20">20</option>
      </select>
      <input type="number" step="0.1" min="0" max="20" class="module-mark" placeholder="mark /20">
    `;
    modulesContainer.appendChild(newRow);
  });
  calcGpaBtn.addEventListener('click', () => {
    const rows = document.querySelectorAll('.module-row');
    let totalWeight = 0, totalCredits = 0;
    gpaError.innerText = '';

    for (let row of rows) {
      const credit = parseInt(row.querySelector('.module-credit').value, 10);
      let mark = parseFloat(row.querySelector('.module-mark').value);
      if (isNaN(mark) || mark < 0 || mark > 20) {
        gpaError.innerText = '❌ each mark must be 0–20';
        gpaDisplay.innerText = 'GPA: error';
        return;
      }
      totalWeight += mark* credit;
      totalCredits += credit;
    }
    if (totalCredits === 0) {
      gpaDisplay.innerText = 'GPA: —';
      return;
    }
    gpaDisplay.innerText = `GPA: ${(((totalWeight / totalCredits)/20)*5).toFixed(2)} / 5`;
  });

  // --- LOAN CALCULATOR (RWF) ---
  const loanAmount = document.getElementById('loanAmount');
  const interestRate = document.getElementById('interestRate');
  const loanMonths = document.getElementById('loanMonths');
  const calcLoanBtn = document.getElementById('calcLoanBtn');
  const loanDisplay = document.getElementById('loanDisplay');
  const loanError = document.getElementById('loanError');

  calcLoanBtn.addEventListener('click', () => {
    const P = parseFloat(loanAmount.value);
    const annual = parseFloat(interestRate.value);
    const n = parseInt(loanMonths.value, 10);
    loanError.innerText = '';

    if (isNaN(P) || P < 1000) {
      loanError.innerText = 'enter amount (min 1000 RWF)';
      loanDisplay.innerText = 'RWF —';
      return;
    }
    if (isNaN(annual) || annual < 0) {
      loanError.innerText = 'invalid interest %';
      loanDisplay.innerText = 'RWF —';
      return;
    }
    if (isNaN(n) || n <= 0) {
      loanError.innerText = 'months > 0';
      loanDisplay.innerText = 'RWF —';
      return;
    }

    const monthlyRate = (annual/100)/ 12;
    let payment;
    if (monthlyRate === 0) {
      payment = P / n;
    } else {
      payment = P * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
    }

    loanDisplay.innerText = `RWF ${Math.round(payment).toLocaleString()} / month`;
  });
})();