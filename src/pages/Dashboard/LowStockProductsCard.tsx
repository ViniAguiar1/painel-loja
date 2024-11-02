import React from 'react';

const LowStockProductsCard: React.FC = () => {
  const products = [
    { name: 'Produto', quantity: '11 itens', status: 'Urgente' },
    { name: 'Produto', quantity: '12 itens', status: 'Urgente' },
    { name: 'Produto', quantity: '17 itens', status: 'Urgente' },
    { name: 'Produto', quantity: '22 itens', status: 'Acabando' },
    { name: 'Produto', quantity: '28 itens', status: 'Acabando' },
  ];

  const getStatusStyle = (status: string) => {
    if (status === 'Urgente') {
      return { color: '#e74c3c', label: '🔴' }; // Vermelho para "Urgente"
    } else if (status === 'Acabando') {
      return { color: '#f1c40f', label: '🟡' }; // Amarelo para "Acabando"
    }
    return { color: '#333', label: '' };
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e74c3c', // Borda vermelha
      height: '350px', // Alinhado com a altura dos outros cards
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Produtos Acabando</h4>
      <button style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
      }}>
        Ver Estoque
      </button>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
              <th style={{ padding: '10px 0' }}>PRODUTO</th>
              <th style={{ padding: '10px 0' }}>QUANTIDADE</th>
              <th style={{ padding: '10px 0' }}>ESTOQUE</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const statusStyle = getStatusStyle(product.status);
              return (
                <tr key={index} style={{
                  borderBottom: index === products.length - 1 ? 'none' : '1px solid #f0f0f0',
                  fontSize: '14px',
                  color: '#333',
                }}>
                  <td style={{ padding: '15px 0' }}>{product.name}</td>
                  <td style={{ padding: '15px 0' }}>{product.quantity}</td>
                  <td style={{ padding: '15px 0', color: statusStyle.color, display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '6px' }}>{statusStyle.label}</span> {product.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LowStockProductsCard;
