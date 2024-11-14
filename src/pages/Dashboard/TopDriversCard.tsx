import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Driver {
  motorista: string;
  totalEntregas: number;
}

const TopDriversCard: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/relatorios/top-motoristas');
        setDrivers(response.data);
      } catch (error) {
        console.error('Erro ao buscar os motoristas:', error);
      }
    };
    
    fetchDrivers();
  }, []);

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      height: '350px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Top Motoristas</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
            <th style={{ padding: '10px 0' }}>POSIÇÃO</th>
            <th style={{ padding: '10px 0' }}>NOME</th>
            <th style={{ padding: '10px 0' }}>TOTAL ENTREGAS</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#333' }}>
              <td style={{ padding: '15px 0', display: 'flex', alignItems: 'center' }}>
                #{index + 1} <span style={{ marginLeft: '5px' }}>🏆</span>
              </td>
              <td style={{ padding: '15px 0' }}>{driver.motorista}</td>
              <td style={{ padding: '15px 0' }}>{driver.totalEntregas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopDriversCard;
