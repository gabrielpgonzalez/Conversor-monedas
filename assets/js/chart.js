function showCurrencyChart(data) {
  data = data.reverse();

  // Extraemos las fechas y valores para el gráfico
  const dates = data.map((entry) => {
    const date = new Date(entry.fecha);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const values = data.map((entry) => entry.valor);

  // Configuramos el gráfico usando Chart.js
  const ctx = document.getElementById("myChart").getContext("2d");

  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Historial de los últimos 10 días",
          data: values,
          borderColor: "#00bfff",
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: "#f1f1f1",
          },
        },
        y: {
          ticks: {
            color: "#f1f1f1",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#f1f1f1",
          },
        },
      },
    },
  });
}
