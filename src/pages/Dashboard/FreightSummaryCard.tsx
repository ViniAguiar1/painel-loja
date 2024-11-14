import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FreightSummary {
  totalFrete: number;
}

const FreightSummaryCard: React.FC = () => {
  const [freightSummary, setFreightSummary] = useState<FreightSummary | null>(null);

  useEffect(() => {
    const fetchFreightSummary = async () => {
      try {
        const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/relatorios/resumo-frete');
        setFreightSummary(response.data);
      } catch (error) {
        console.error('Erro ao buscar o resumo de fretes:', error);
      }
    };

    fetchFreightSummary();
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
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Resumo dos Fretes</h4>
      {freightSummary ? (
        <div style={{ fontSize: '24px', color: '#333' }}>
          Total de Fretes: {freightSummary.totalFrete}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default FreightSummaryCard;
