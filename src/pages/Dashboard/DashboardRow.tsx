import React from 'react';

interface DashboardRowProps {
  children: React.ReactNode;
}

const DashboardRow: React.FC<DashboardRowProps> = ({ children }) => {
  return <div className="dashboard-row">{children}</div>;
};

export default DashboardRow;
