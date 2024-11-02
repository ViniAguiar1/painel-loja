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

const ActiveClientsCard = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
    datasets: [
      {
        data: [30, 20, 25, 18, 22, 27, 24], // Dados para o gráfico
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
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
        display: false, // Ocultar legenda para gráfico simples
      },
      tooltip: {
        enabled: false, // Desabilitar tooltip para uma exibição mais limpa
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
        display: false, // Ocultar eixo X
      },
      y: {
        display: false, // Ocultar eixo Y
      },
    },
  };

  return (
    <div style={{
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      height: '180px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h4 style={{ fontSize: '16px', color: '#333', margin: '0' }}>Clientes ativos</h4>
        <span style={{ fontSize: '14px', color: '#6c757d' }}>Últimos 7 dias</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>217</span>
        <span style={{ fontSize: '24px', color: '#333' }}>/324</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'red', fontSize: '14px' }}>
        <span style={{ transform: 'rotate(45deg)', fontSize: '12px' }}>↓</span>
        <span>-3%</span>
        <span style={{ color: '#6c757d' }}>vs 7 dias anteriores</span>
      </div>

      <div style={{ height: '50px', marginTop: '10px' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default ActiveClientsCard;
