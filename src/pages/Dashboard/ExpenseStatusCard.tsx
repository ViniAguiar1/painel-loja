import React, { useState } from 'react';
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

const categories = [
  { id: 'equipe', label: 'Equipe', value: '24k' },
  { id: 'produtos', label: 'Produtos', value: '3.5k' },
  { id: 'embalagens', label: 'Embalagens', value: '2.5k' },
  { id: 'packers', label: 'Packers', value: '7.5k' },
  { id: 'motoristas', label: 'Motoristas', value: '5.2k' },
];

const dataPerCategory = {
  equipe: [10, 20, 30, 25, 35, 40, 32],
  produtos: [5, 15, 25, 20, 30, 35, 28],
  embalagens: [3, 10, 20, 15, 25, 30, 22],
  packers: [15, 25, 35, 30, 40, 45, 38],
  motoristas: [8, 18, 28, 22, 32, 36, 30],
};

const ExpenseStatusCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('equipe');

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
  };

  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        data: dataPerCategory[selectedCategory],
        borderColor: 'rgba(255, 0, 0, 1)',
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
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value: number) => `${value}k`,
        },
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
      height: '400px',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '5px' }}>Status de Despesas</h4>
      <span style={{ fontSize: '14px', color: '#6c757d', marginBottom: '15px' }}>Últimos 7 dias</span>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
              color: selectedCategory === category.id ? '#333' : '#6c757d',
              borderBottom: selectedCategory === category.id ? '2px solid blue' : 'none',
            }}
          >
            <div style={{ fontSize: '24px' }}>{category.value}</div>
            <div style={{ fontSize: '14px' }}>{category.label}</div>
          </div>
        ))}
      </div>

      <div style={{ flexGrow: 1 }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpenseStatusCard;
