fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const chart = document.getElementById("spending-chart");

    // Get today's day abbreviation in lowercase
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const today = days[new Date().getDay()];

    data.forEach((item) => {
      const barWrapper = document.createElement("div");
      barWrapper.classList.add("spending-chart__bar");

      // Tooltip
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = `$${item.amount}`;

      // Bar
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `${item.amount * 2.5}px`; // scale height

      // Add 'active' class if it's today's bar
      if (item.day.toLowerCase() === today) {
        bar.classList.add("active");
      }

      // Label
      const label = document.createElement("span");
      label.className = "label";
      label.textContent = item.day;

      // Compose
      barWrapper.appendChild(tooltip);
      barWrapper.appendChild(bar);
      barWrapper.appendChild(label);

      chart.appendChild(barWrapper);
    });
  });
