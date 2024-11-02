import React from 'react';
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

interface SalesCardProps {
  title: string;
  subtitle: string;
  value: string;
  percentage: string;
  comparisonText: string;
}

const SalesCard: React.FC<SalesCardProps> = ({ title, subtitle, value, percentage, comparisonText }) => {
  const data = {
    labels: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
    datasets: [
      {
        data: [15, 10, 14, 12, 18, 14, 20], // Dados do gráfico de linha
        borderColor: 'rgba(255, 0, 0, 1)', // Cor da linha em vermelho
        backgroundColor: 'rgba(255, 0, 0, 0.1)', // Fundo sutil para o gráfico
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

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
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    scales: {
      x: {
        display: false, // Oculta o eixo X
      },
      y: {
        display: false, // Oculta o eixo Y
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
      position: 'relative',
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

      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '100px', // Aumenta o tamanho do gráfico
        height: '60px', // Altura maior para destacar o gráfico
      }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesCard;
