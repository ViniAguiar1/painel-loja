import React, { useEffect, useState } from 'react';

const TopProductsCard: React.FC = () => {
  const [products, setProducts] = useState<{ name: string; quantity: number; status: string; total: string; image: string; }[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultImage = 'https://via.placeholder.com/40';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.spartacusprimetobacco.com.br/api/relatorios/produtos-vendidos');
        const data = await response.json();
        const formattedData = data.map((item: { nomeProduto: string; quantidade: number; estoque: string; valorTotal: string; }) => ({
          name: item.nomeProduto,
          quantity: item.quantidade,
          status: item.estoque,
          total: item.valorTotal,
          image: item.image || defaultImage,
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
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Produtos mais vendidos</h4>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div style={{ overflowY: 'auto', maxHeight: '250px' }}>
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
                    <img src={product.image || defaultImage} alt={product.name} style={{ width: '40px', marginRight: '10px' }} />
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
      )}
    </div>
  );
};

export default TopProductsCard;
