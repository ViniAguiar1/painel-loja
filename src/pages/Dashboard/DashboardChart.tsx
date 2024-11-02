import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useRef } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
    datasets: [
      {
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(0, 0, 255, 1)');
          gradient.addColorStop(1, 'rgba(0, 0, 255, 0.5)');
          return gradient;
        },
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: 'Custo',
        data: [2, 3, 20, 5, 1, 4, 10],
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0.5)');
          return gradient;
        },
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: '150px', width: '100%' }}> {/* Reduzi a altura para 150px */}
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default DashboardChart;
