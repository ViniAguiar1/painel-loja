import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

interface DeliveryCardProps {
  title: string;
  subtitle: string;
  value: string;
  percentage: string;
  comparisonText: string;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ title, subtitle, value, percentage, comparisonText }) => {
  const data = {
    datasets: [
      {
        data: [17, 25], // Dados para o gráfico
        backgroundColor: ['#D4A937', '#F1E0B8'], // Cores para a parte preenchida e o restante
        hoverBackgroundColor: ['#D4A937', '#F1E0B8'],
        borderWidth: 0,
        cutout: '70%', // Faz com que o gráfico seja um anel
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false, // Desabilita o tooltip para uma exibição limpa
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
      flexDirection: 'row', // Alinhar o conteúdo em linha para o gráfico e o texto
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '180px',
    }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '16px', color: '#333', margin: '0' }}>{title}</h4>
        <span style={{ fontSize: '14px', color: '#6c757d' }}>{subtitle}</span>

        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginTop: '10px' }}>
          {value}
        </div>

        <div style={{ color: percentage.startsWith('-') ? 'red' : 'green', fontSize: '14px', marginTop: '5px' }}>
          <span style={{ marginRight: '5px' }}>
            {percentage.startsWith('-') ? '↓' : '↑'}
          </span>
          {percentage} <span style={{ color: '#6c757d' }}>{comparisonText}</span>
        </div>
      </div>

      <div style={{ width: '80px', height: '80px' }}> {/* Aumenta o tamanho do gráfico e centraliza */}
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DeliveryCard;
