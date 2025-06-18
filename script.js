fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const chart = document.getElementById("spending-chart");

    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const today = days[new Date().getDay()];

    // Calculate max for proportional height
    const maxAmount = Math.max(...data.map((item) => item.amount));

    data.forEach((item) => {
      const bar = document.createElement("div");

      bar.classList.add("spending-chart__bar");
      bar.setAttribute("data-label", item.day);
      bar.setAttribute("data-amount", `$${item.amount}`);

      // Highlight today's bar
      if (item.day.toLowerCase() === today) {
        bar.classList.add("active");
      }

      // Set proportional height (max height ~150px)
      const height = (item.amount / maxAmount) * 150;
      bar.style.height = `${height}px`;

      // Add label below
      const label = document.createElement("span");
      label.textContent = item.day;

      bar.appendChild(label);
      chart.appendChild(bar);
    });
  });
