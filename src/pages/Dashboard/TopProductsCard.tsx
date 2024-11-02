import React from 'react';

const TopProductsCard: React.FC = () => {
  const products = [
    { name: 'Camiseta', quantity: 89, status: 'Em estoque', total: 'R$ 4.5k', image: '/images/shirt.png' },
    { name: 'Camiseta', quantity: 82, status: 'Em estoque', total: 'R$ 4.1k', image: '/images/shirt.png' },
    { name: 'Camiseta', quantity: 76, status: 'Em estoque', total: 'R$ 3.7k', image: '/images/shirt.png' },
    { name: 'Camiseta', quantity: 71, status: 'Em estoque', total: 'R$ 3.2k', image: '/images/shirt.png' },
    { name: 'Camiseta', quantity: 64, status: 'Em estoque', total: 'R$ 2.9k', image: '/images/shirt.png' },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      height: '350px', // Alinhado com a altura do TopCategoriesCard
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Produtos mais vendidos</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
            <th style={{ padding: '10px 0' }}>NOME DO PRODUTO</th>
            <th style={{ padding: '10px 0' }}>QUANTIDADE</th>
            <th style={{ padding: '10px 0' }}>ESTOQUE</th>
            <th style={{ padding: '10px 0' }}>VALOR TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '14px', color: '#333' }}>
              <td style={{ padding: '15px 0', display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '40px', marginRight: '10px' }} />
                {product.name}
              </td>
              <td style={{ padding: '15px 0' }}>{product.quantity}</td>
              <td style={{ padding: '15px 0', color: '#34D399', display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#34D399', borderRadius: '50%', marginRight: '6px' }}></span>
                {product.status}
              </td>
              <td style={{ padding: '15px 0' }}>{product.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsCard;
