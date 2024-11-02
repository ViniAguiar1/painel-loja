import React from 'react';

const ScheduledExpensesCard: React.FC = () => {
  const expenses = [
    { name: 'Despesa', date: '19/05', amount: 'R$ 999.29' },
    { name: 'Despesa', date: '12/05', amount: 'R$ 72.40' },
    { name: 'Despesa', date: '11/05', amount: 'R$ 99.90' },
    { name: 'Despesa', date: '10/05', amount: 'R$ 249.99' },
    { name: 'Despesa', date: '05/05', amount: 'R$ 79.40' },
  ];

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      height: '350px', // Alinhado com a altura dos outros cards
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Despesas agendadas</h4>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
              <th style={{ padding: '10px 0' }}>NOME</th>
              <th style={{ padding: '10px 0' }}>DATA</th>
              <th style={{ padding: '10px 0' }}>VALOR $$</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} style={{
                borderBottom: index === expenses.length - 1 ? 'none' : '1px solid #f0f0f0', // Remove a borda inferior na última linha
                fontSize: '14px',
                color: '#333',
              }}>
                <td style={{ padding: '15px 0' }}>{expense.name}</td>
                <td style={{ padding: '15px 0' }}>{expense.date}</td>
                <td style={{ padding: '15px 0' }}>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduledExpensesCard;
