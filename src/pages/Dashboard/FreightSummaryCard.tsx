import React from 'react';

const FreightSummaryCard: React.FC = () => {
  const freights = [
    { client: 'Nome', orders: '17 pedidos', total: '$129.48' },
    { client: 'Nome', orders: '12 pedidos', total: '$72.40' },
    { client: 'Nome', orders: '9 pedidos', total: '$249.99' },
    { client: 'Nome', orders: '2 pedidos', total: '$79.40' },
    { client: 'Nome', orders: '21 pedidos', total: '$129.48' },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      height: '350px', // Alinhado com a altura do TopCategoriesCard e outros cards
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Resumo dos Fretes</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
            <th style={{ padding: '10px 0' }}>NOME DO CLIENTE</th>
            <th style={{ padding: '10px 0' }}>PEDIDOS</th>
            <th style={{ padding: '10px 0' }}>$$ TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {freights.map((freight, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#333' }}>
              <td style={{ padding: '15px 0' }}>{freight.client}</td>
              <td style={{ padding: '15px 0' }}>{freight.orders}</td>
              <td style={{ padding: '15px 0' }}>{freight.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FreightSummaryCard;
