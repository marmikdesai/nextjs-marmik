import { formatLargeNumber } from "./formatLargeNumber";

export const chartOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        title: function (tooltipItems: any) {
          const item = tooltipItems[0];
          const label = item.chart.data.labels[item.dataIndex];
          if (Array.isArray(label)) {
            return label.join(" ");
          } else {
            return label;
          }
        },
        label: function (context: any) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += formatLargeNumber(context.parsed.y);
          }
          return label;
        },
      },
    },
    legend: {
      labels: {
        color: "#343A40",
        font: {
          size: 14,
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: "rgba(52, 58, 64, 0.1)",
      },
      ticks: {
        color: "#343A40",
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(52, 58, 64, 0.1)",
      },
      ticks: {
        color: "#343A40",
        callback: function (value: string) {
          return formatLargeNumber(value);
        },
      },
    },
  },
};
