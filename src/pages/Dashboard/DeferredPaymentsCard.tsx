import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeferredPaymentsCard: React.FC = () => {
  const [totalPayments, setTotalPayments] = useState<number | null>(null);

  useEffect(() => {
    const fetchDeferredPayments = async () => {
      try {
        const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/relatorios/pagamentos-a-gerar');
        setTotalPayments(response.data.totalPagamentosAGerar);
      } catch (error) {
        console.error('Erro ao buscar pagamentos a gerar:', error);
      }
    };

    fetchDeferredPayments();
  }, []);

  const formatCurrency = (value: number | null) => {
    if (value === null) return 'Não informado';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      textAlign: 'center',
    }}>
      <h4 style={{ fontSize: '14px', color: '#6c757d', marginBottom: '10px' }}>Resumo dos Pagamentos</h4>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
        Total de Pagamentos: {formatCurrency(totalPayments)}
      </p>
    </div>
  );
};

export default DeferredPaymentsCard;
