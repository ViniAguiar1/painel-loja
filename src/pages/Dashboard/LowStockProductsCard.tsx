import React, { useEffect, useState } from 'react';

const LowStockProductsCard: React.FC = () => {
  const [products, setProducts] = useState<{ name: string; quantity: string; status: string; }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.spartacusprimetobacco.com.br/api/relatorios/estoque-baixo');
        const data = await response.json();
        const formattedData = data.map((item: { produto: string; quantidade: string; status: string; }) => ({
          name: item.produto,
          quantity: parseInt(item.quantidade).toString(), // Converte para número inteiro
          status: item.status,
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
      border: '1px solid #e74c3c',
      height: '350px',
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
        {loading ? (
          <p>Carregando...</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default LowStockProductsCard;
