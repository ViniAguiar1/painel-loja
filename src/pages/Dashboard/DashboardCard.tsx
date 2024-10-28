import React from 'react';

interface DashboardCardProps {
    title: string;
    subtitle?: string;
    value: string;
    secondaryValue?: string;
    percentage?: string;
    antes?: string;
    chart?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtitle, value, secondaryValue, percentage,antes, chart }) => {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                <h5>{title}</h5>
                {subtitle && <small>{subtitle}</small>}
            </div>
            <div className="dashboard-card-body">
                <div className="dashboard-card-values">
                    <h3>{value}</h3> {secondaryValue && <h4>{secondaryValue}</h4>}
                   
                </div>
                {chart}
            </div>
            {percentage && (
                <div className="dashboard-card-footer">
                    <span className="valor">{percentage} </span>   {antes == "" ? "" : (<span> vs {antes}</span>)}
                </div>
            )}
        </div>
    );
};

export default DashboardCard;
