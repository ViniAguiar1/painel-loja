import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const SalesLastHourCard: React.FC = () => {
  const barChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i + 1}h`),
    datasets: [
      {
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50) + 10),
        backgroundColor: '#D4A937',
        borderRadius: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  const statesData = [
    { state: 'São Paulo', sales: '30k', change: '25.8%', increase: true },
    { state: 'Rio de Janeiro', sales: '26k', change: '16.2%', increase: false },
    { state: 'Minas', sales: '22k', change: '12.3%', increase: true },
    { state: 'Gramado', sales: '17k', change: '11.9%', increase: false },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '400px',
      overflow: 'hidden',
    }}>
      <div>
        <h4 style={{ fontSize: '16px', color: '#333', margin: '0' }}>Vendas na última 1 hora</h4>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginTop: '5px' }}>16.5K</div>
        <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '15px' }}>
          Comparação em relação ao mesmo período no mês anterior
        </div>
      </div>

      <div style={{ height: '60px', marginBottom: '15px' }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Vendas por Estado</h4>
        {statesData.map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"
                alt="Flag"
                style={{ width: '24px', height: '24px', marginRight: '10px', borderRadius: '50%' }}
              />
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{item.sales}</div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>{item.state}</div>
              </div>
            </div>
            <div style={{ flex: 1, height: '5px', backgroundColor: '#e0e0e0', margin: '0 10px', borderRadius: '5px' }}>
              <div style={{
                width: `${Math.min(parseFloat(item.sales), 100)}%`,
                backgroundColor: '#D4A937',
                height: '100%',
                borderRadius: '5px',
              }}></div>
            </div>
            <div style={{
              fontSize: '14px',
              color: item.increase ? 'green' : 'red',
              fontWeight: 'bold',
            }}>
              {item.increase ? '↑' : '↓'} {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesLastHourCard;
