import React from 'react';

const TopDriversCard: React.FC = () => {
  const drivers = [
    { position: 1, name: 'Carlos', status: 56, total: 'R$ 4.5k' },
    { position: 2, name: 'Renan', status: 51, total: 'R$ 4.2k' },
    { position: 3, name: 'Fernando', status: 45, total: 'R$ 3.5k' },
    { position: 4, name: 'Matheus', status: 43, total: 'R$ 3.1k' },
    { position: 5, name: 'Lucas', status: 23, total: 'R$ 400' },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      height: '350px', // Alinhado com a altura do FreightSummaryCard e outros cards
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Top Motoristas</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
            <th style={{ padding: '10px 0' }}>POSIÇÃO</th>
            <th style={{ padding: '10px 0' }}>NOME</th>
            <th style={{ padding: '10px 0' }}>STATUS</th>
            <th style={{ padding: '10px 0' }}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#333' }}>
              <td style={{ padding: '15px 0', display: 'flex', alignItems: 'center' }}>
                #{driver.position} <span style={{ marginLeft: '5px' }}>🏆</span>
              </td>
              <td style={{ padding: '15px 0' }}>{driver.name}</td>
              <td style={{ padding: '15px 0' }}>{driver.status}</td>
              <td style={{ padding: '15px 0' }}>{driver.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopDriversCard;
