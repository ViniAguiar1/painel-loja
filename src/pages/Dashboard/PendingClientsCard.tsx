import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const PendingClientsCard: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://api.spartacusprimetobacco.com.br/api/relatorios/clientes-pendentes');
        const data = await response.json();
        
        // Filtra para incluir apenas clientes com ativo = 0
        setClients(data.filter((client: any) => client.ativo === 0));
      } catch (error) {
        console.error("Erro ao buscar clientes pendentes:", error);
      }
    };

    fetchClients();
  }, []);

  const handleApprove = async (codigo: number) => {
    try {
      const response = await fetch('https://api.spartacusprimetobacco.com.br/api/relatorios/aprovar-cliente', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigoUSUARIO: codigo }),
      });

      if (response.ok) {
        MySwal.fire({
          icon: 'success',
          title: 'Aprovado',
          showConfirmButton: false,
          timer: 1500,
        });
        
        // Atualiza a lista para remover o cliente aprovado (ativo = 1)
        setClients(clients.filter(client => client.codigo !== codigo));
      } else {
        throw new Error("Erro ao aprovar o cliente");
      }
    } catch (error) {
      console.error("Erro ao aprovar cliente:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Erro ao aprovar',
        text: 'Não foi possível aprovar o cliente.',
      });
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #34D399',
      height: '350px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '10px' }}>Clientes Pendentes</h4>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#6c757d', fontSize: '14px', textAlign: 'left' }}>
              <th style={{ padding: '10px 0' }}>CLIENTE</th>
              <th style={{ padding: '10px 0' }}>DISTRITO</th>
              <th style={{ padding: '10px 0' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index} style={{
                borderBottom: index === clients.length - 1 ? 'none' : '1px solid #f0f0f0',
                fontSize: '14px',
                color: '#333',
              }}>
                <td style={{ padding: '15px 0' }}>{client.cliente}</td>
                <td style={{ padding: '15px 0' }}>{client.distrito}</td>
                <td style={{ padding: '15px 0' }}>
                  <button
                    onClick={() => handleApprove(client.codigo)}
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
                    Aprovar
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
