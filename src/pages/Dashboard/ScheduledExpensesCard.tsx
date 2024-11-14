import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduledExpensesCard: React.FC = () => {
  const [totalExpenses, setTotalExpenses] = useState<number | null>(null);

  useEffect(() => {
    const fetchScheduledExpenses = async () => {
      try {
        const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/relatorios/despesas-agendadas');
        setTotalExpenses(response.data.totalDespesasAgendadas);
      } catch (error) {
        console.error('Erro ao buscar despesas agendadas:', error);
      }
    };

    fetchScheduledExpenses();
  }, []);

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
      <h4 style={{ fontSize: '14px', color: '#6c757d', marginBottom: '10px' }}>Resumo das Despesas</h4>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
        Total de Despesas: {totalExpenses !== null ? `R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Carregando...'}
      </p>
    </div>
  );
};

export default ScheduledExpensesCard;
