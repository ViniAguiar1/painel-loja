import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/relatorios/total-vendas');
        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar dados');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return <div>Carregando dados...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!chartData) {
    return <div>Dados não disponíveis</div>;
  }

  return (
    <div style={{ height: '150px', width: '100%' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default DashboardChart;
