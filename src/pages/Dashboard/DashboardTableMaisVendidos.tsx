import React from 'react';

interface DashboardCardProps {
    title: string;
    subtitle?: string;
     
}

const DashboardTable: React.FC<DashboardCardProps> = ({ title, subtitle }) => {
 
  return (
    <div className="dashboard-card">
            <div className="dashboard-card-header">
                <h5>{title}</h5>
                {subtitle && <small>{subtitle}</small>}
            </div>
            <div className="dashboard-card-body">
               
    <table className="dashboard-table">
      <thead>
        <tr>
        <th>NOME DO CLIENTE</th>
          <th>PEDIDOS</th> 
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Camiseta</td>
          <td>89</td> 
          <td>R$ 4.5k</td>
        </tr>
        <tr>
          <td>Camiseta</td>
          <td>82</td> 
          <td>R$ 4.1k</td>
        </tr>
      </tbody>
    </table>
            </div>
            
        </div>
  );
};

export default DashboardTable;
