// ===============================
// Function: Initialize Raffle Range (index.html)
// ===============================
function initRaffle() {
  const start = parseInt(document.getElementById("start").value);
  const end = parseInt(document.getElementById("end").value);

  if (isNaN(start) || isNaN(end) || start >= end) {
    alert("Please enter a valid number range.");
    return;
  }

  const numbers = [];
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }

  localStorage.setItem("raffleNumbers", JSON.stringify(numbers));
  window.location.href = "draw.html";
}

  // ===============================
  // Function: Draw a Random Number (draw.html)
  // ===============================
  function drawNumber() {
    let numbers = JSON.parse(localStorage.getItem("raffleNumbers") || "[]");
  
    if (numbers.length === 0) {
      alert("All numbers have been drawn!");
      return;
    }
  
    const resultEl = document.getElementById("result");
    let rollInterval;
    let duration = 1200; // 1 second roll
    let startTime = Date.now();
  
    rollInterval = setInterval(() => {
      const fake = Math.floor(Math.random() * 999) + 1;
      resultEl.textContent = fake;
  
      if (Date.now() - startTime > duration) {
        clearInterval(rollInterval);
  
        // Pick real number
        const index = Math.floor(Math.random() * numbers.length);
        const picked = numbers.splice(index, 1)[0];
  
        // Save remaining numbers
        localStorage.setItem("raffleNumbers", JSON.stringify(numbers));
  
        // Show result
        resultEl.textContent = picked;
  
        // 🎉 Confetti!
        if (typeof confetti === "function") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    }, 50);
  }
  
  // ===============================
  // Function: Reset Raffle (draw.html)
  // ===============================
  function resetDraw() {
    if (confirm("Reset the draw and go back to the range setup page?")) {
    localStorage.removeItem("raffleNumbers");
    window.location.href = "index.html";
  }
}
  