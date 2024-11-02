import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface ProfitCardProps {
  title: string;
  subtitle: string;
  value: string;
  percentage: string;
  comparisonText: string;
}

const ProfitCard: React.FC<ProfitCardProps> = ({ title, subtitle, value, percentage, comparisonText }) => {
  const [chartData, setChartData] = useState({
    labels: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
    datasets: [
      {
        data: [],
        borderColor: 'rgba(0, 200, 0, 1)', // Linha verde
        backgroundColor: 'rgba(0, 200, 0, 0.1)', // Fundo sutil
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spartacusprimetobacco.com.br/api/relatorios/total-lucro');
        const data = await response.json();

        setChartData({
          labels: data.labels,
          datasets: [
            {
              data: data.datasets[0].data,
              borderColor: data.datasets[0].borderColor,
              backgroundColor: data.datasets[0].backgroundColor,
              fill: data.datasets[0].fill,
              tension: data.datasets[0].tension,
              borderWidth: data.datasets[0].borderWidth,
              pointRadius: data.datasets[0].pointRadius,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '180px',
    }}>
      <div>
        <h4 style={{ fontSize: '16px', color: '#333', margin: '0' }}>{title}</h4>
        <span style={{ fontSize: '14px', color: '#6c757d' }}>{subtitle}</span>
      </div>

      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginTop: '10px' }}>
        {value}
      </div>

      <div style={{ color: percentage.startsWith('-') ? 'red' : 'green', fontSize: '14px', marginBottom: '10px' }}>
        <span style={{ marginRight: '5px' }}>
          {percentage.startsWith('-') ? '↓' : '↑'}
        </span>
        {percentage} <span style={{ color: '#6c757d' }}>{comparisonText}</span>
      </div>

      <div style={{ height: '30px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProfitCard;
