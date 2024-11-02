import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const PendingClientsCard: React.FC = () => {
  const clients = [
    { name: 'Nome', district: 'São Paulo', total: 'Aprovar' },
    { name: 'Nome', district: 'Minas', total: 'Aprovar' },
    { name: 'Nome', district: 'Rio de Janeiro', total: 'Aprovar' },
    { name: 'Nome', district: 'Pará', total: 'Aprovar' },
    { name: 'Nome', district: 'Rondônia', total: 'Aprovar' },
  ];

  const handleApprove = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Aprovado',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #34D399', // Borda verde
      height: '350px', // Alinhado com a altura dos outros cards
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden', // Impede que o conteúdo passe da borda
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Clientes Pendentes</h4>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}> {/* Contêiner com rolagem */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
              <th style={{ padding: '10px 0' }}>CLIENTE</th>
              <th style={{ padding: '10px 0' }}>DISTRITO</th>
              <th style={{ padding: '10px 0' }}>$$ TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index} style={{
                borderBottom: index === clients.length - 1 ? 'none' : '1px solid #f0f0f0', // Remove a borda inferior na última linha
                fontSize: '14px',
                color: '#333',
              }}>
                <td style={{ padding: '15px 0' }}>{client.name}</td>
                <td style={{ padding: '15px 0' }}>{client.district}</td>
                <td style={{ padding: '15px 0' }}>
                  <button
                    onClick={handleApprove}
                    style={{
                      backgroundColor: '#34D399',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {client.total}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingClientsCard;
