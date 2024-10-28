import React from 'react';
import BreadcrumbItem from '../../Common/BreadcrumbItem';
import DashboardCard from './DashboardCard';
// import DashboardChart from './DashboardChart';/
import DashboardTableMaisVendidos from './DashboardTableMaisVendidos'; 
import DashboardTableFretes from './DashboardTableFretes'; 
import DashboardTableTopMotoristas from './DashboardTableTopMotoristas'; 
import './Dashboard.css'; // Importando os estilos CSS
 
import {Col, Row, Container} from 'react-bootstrap'; 

const Dashboard = () => {
  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="" subTitle="Dashboard" />
      <Container>
      <Row  className="pb-4">
         <Col  xs={8} > 
       
          <DashboardCard 
            title="Total de Vendas X Custos"
            subtitle="Últimos 7 dias"
            value="$350K"
            secondaryValue="$235K"
            percentage="+8.56K"
            antes="7 dias anteriores"
           /*  chart={<DashboardChart />} */
          />
        </Col>
        <Col > 
          <DashboardCard 
            title="Clientes ativos"
            subtitle="Últimos 7 dias"
            value="217/324"
            percentage="-3% "
            antes="7 dias anteriores"
          />
        
        </Col>
        </Row>

        <Row  className="pb-4">
         <Col   > 
       
          <DashboardCard 
            title="Total de Lucro"
            subtitle="Últimos 7 dias"
            value="50K"
            percentage="+12% "
            antes="7 dias anteriores"
           /*  chart={<DashboardChart />} */
          />
        </Col>
        <Col > 
          <DashboardCard 
             title="Entregas"
             subtitle="Últimos 7 dias"
             value="17/42"
             percentage="+6% "
            antes="7 dias anteriores"
          />
        
        </Col>

        <Col > 
          <DashboardCard 
            title="Número de Vendas"
            subtitle="Últimos 7 dias"
            value="897"
            percentage="-2%  "
            antes="7 dias anteriores"
          />
        
        </Col>
        </Row>
        <Row  className="pb-4">
         <Col  xs={4} > 
       
          <DashboardCard 
            title="Categorias mais vendidas"
            subtitle="Total 10.4k em vendas"
            value="$350K"
            secondaryValue="$235K"
            percentage="+8.56K"
            antes="7 dias anteriores"
           /*  chart={<DashboardChart />} */
          />
        </Col>
        <Col > 
          <DashboardTableMaisVendidos 
            title="Produtos mais vendidos"
            subtitle="Últimos 7 dias"
            
          />
        
        </Col>
        </Row>

        <Row  className="pb-4">
         <Col  > 
       
         <DashboardTableFretes
            title="Resumo dos Fretes"
            subtitle=""
            
          />
        </Col>
        <Col > 
          <DashboardTableTopMotoristas 
            title="Top Motoristas"
            subtitle=""
            
          />
        
        </Col>
        </Row>

        </Container>
        
      
    </React.Fragment>
  );
};

export default Dashboard;
