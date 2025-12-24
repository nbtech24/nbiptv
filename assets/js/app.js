document.addEventListener("DOMContentLoaded", () => {
  const player = videojs("player");
  const countrySel = document.getElementById("country");
  const categorySel = document.getElementById("category");
  const list = document.getElementById("channels");

  fetch("data/channels.json")
    .then(r => r.json())
    .then(channels => {
      const countries = [...new Set(channels.map(c => c.country))].sort();
      const categories = [...new Set(channels.map(c => c.category))].sort();

      countrySel.innerHTML = '<option value="">All Countries</option>' +
        countries.map(c => `<option>${c}</option>`).join("");

      categorySel.innerHTML = '<option value="">All Categories</option>' +
        categories.map(c => `<option>${c}</option>`).join("");

      function render() {
        list.innerHTML = "";
        const c = countrySel.value;
        const g = categorySel.value;

        channels
          .filter(ch => (!c || ch.country === c) && (!g || ch.category === g))
          .slice(0, 300)
          .forEach(ch => {
            const div = document.createElement("div");
            div.className = "channel";
            div.textContent = ch.name;
            div.onclick = () => {
              player.src({ src: ch.url, type: "application/x-mpegURL" });
              player.play().catch(()=>{});
            };
            list.appendChild(div);
          });
      }

      countrySel.onchange = render;
      categorySel.onchange = render;
      render();
    })
    .catch(() => {
      list.innerHTML = "Failed to load channels.json";
    });
});
