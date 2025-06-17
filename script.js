// Assuming your JSON is something like:
// [
//   { "day": "mon", "amount": 17.45 },
//   { "day": "tue", "amount": 34.91 },
//   ...
// ]
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const chartContainer = document.getElementById("spending-chart");
    const todayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, ...
    const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    // Find the max amount for scaling
    const maxAmount = Math.max(...data.map((d) => d.amount));

    data.forEach((entry, index) => {
      const barWrapper = document.createElement("div");
      barWrapper.classList.add("spending-chart__bar");
      barWrapper.setAttribute("data-label", entry.day);
      barWrapper.setAttribute("data-amount", `$${entry.amount.toFixed(2)}`);

      // Create the bar itself
      const bar = document.createElement("div");
      bar.classList.add("bar");
      if (entry.day === dayMap[todayIndex]) {
        bar.classList.add("active");
      }

      // Set bar height proportional to amount
      const heightPercent = (entry.amount / maxAmount) * 100;
      bar.style.height = `${heightPercent}%`;

      // Tooltip
      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.textContent = `$${entry.amount.toFixed(2)}`;

      // Day label
      const label = document.createElement("span");
      label.classList.add("label");
      label.textContent = entry.day;

      // Hover effect
      barWrapper.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
      });
      barWrapper.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      barWrapper.appendChild(tooltip);
      barWrapper.appendChild(bar);
      barWrapper.appendChild(label);
      chartContainer.appendChild(barWrapper);
    });
  })
  .catch((err) => console.error("Failed to load chart data:", err));
