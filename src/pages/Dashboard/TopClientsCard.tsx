import React from 'react';

const TopClientsCard: React.FC = () => {
  const clients = [
    { name: 'Nome', orders: '17 pedidos', total: 'R$ 24.5k' },
    { name: 'Nome', orders: '12 pedidos', total: 'R$ 22.7k' },
    { name: 'Nome', orders: '9 pedidos', total: 'R$ 18.4k' },
    { name: 'Nome', orders: '2 pedidos', total: 'R$ 18.2k' },
    { name: 'Nome', orders: '21 pedidos', total: 'R$ 16.5k' },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #D4A937', // Borda dourada
      height: '350px', // Alinhado com a altura dos outros cards
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Top Clientes</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
            <th style={{ padding: '10px 0' }}>CLIENTE</th>
            <th style={{ padding: '10px 0' }}>PEDIDOS</th>
            <th style={{ padding: '10px 0' }}>$$ TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#333' }}>
              <td style={{ padding: '15px 0' }}>{client.name}</td>
              <td style={{ padding: '15px 0' }}>{client.orders}</td>
              <td style={{ padding: '15px 0' }}>{client.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopClientsCard;
