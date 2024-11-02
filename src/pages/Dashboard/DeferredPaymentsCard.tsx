import React from 'react';

const DeferredPaymentsCard: React.FC = () => {
  const payments = [
    { name: 'Insumos', date: '19/06', amount: 'R$ 999.29' },
    { name: 'Funcionario', date: '22/07', amount: 'R$ 72.40' },
    { name: 'Packer', date: '11/08', amount: 'R$ 99.90' },
    { name: 'Gerente', date: '09/12', amount: 'R$ 249.99' },
    { name: 'Copys', date: '22/12', amount: 'R$ 79.40' },
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
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Pagamento a prazo</h4>
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
            {payments.map((payment, index) => (
              <tr key={index} style={{
                borderBottom: index === payments.length - 1 ? 'none' : '1px solid #f0f0f0', // Remove a borda inferior na última linha
                fontSize: '14px',
                color: '#333',
              }}>
                <td style={{ padding: '15px 0' }}>{payment.name}</td>
                <td style={{ padding: '15px 0' }}>{payment.date}</td>
                <td style={{ padding: '15px 0' }}>{payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeferredPaymentsCard;
