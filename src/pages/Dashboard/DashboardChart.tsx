 
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

// Registre os componentes necessários
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
  const data = {
    labels: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
    datasets: [
      {
        label: 'Vendas',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Custo',
        data: [2, 3, 20, 5, 1, 4, 10],
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default DashboardChart;
