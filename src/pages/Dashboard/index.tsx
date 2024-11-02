import React from 'react';
import BreadcrumbItem from '../../Common/BreadcrumbItem';
import DashboardCard from './DashboardCard';
import './Dashboard.css'; // Importando os estilos CSS
 
import {Col, Row, Container} from 'react-bootstrap'; 
import DashboardChart from './DashboardChart';
import ActiveClientsCard from './ActiveClientsCard';
import ProfitCard from './ProfitCard';
import DeliveryCard from './deliveryCard';
import SalesCard from './SalesCard';
import TopCategoriesCard from './TopCategoriesCard';
import TopProductsCard from './TopProductsCard';
import FreightSummaryCard from './FreightSummaryCard';
import TopDriversCard from './TopDriversCard';
import TopClientsCard from './TopClientsCard';
import PendingClientsCard from './PendingClientsCard';
import LowStockProductsCard from './LowStockProductsCard';
import ScheduledExpensesCard from './ScheduledExpensesCard';
import DeferredPaymentsCard from './DeferredPaymentsCard';

const Dashboard = () => {
  return (
    <React.Fragment>
      <BreadcrumbItem mainTitle="" subTitle="Dashboard" />
      <Container>
      <Row className="pb-4">
          <Col xs={8} style={{ height: '250px' }}> {/* Card maior ocupando 70% */}
            <DashboardCard
              title="Total de Vendas X Custos"
              subtitle="Últimos 7 dias"
              value="$350K"
              secondaryValue="$235K"
              percentage="+8.56K"
              antes="7 dias anteriores"
              chart={<DashboardChart />}
            />
          </Col>
          <Col xs={4} style={{ height: '250px' }}> {/* Card menor ocupando 30% */}
            <ActiveClientsCard />
          </Col>
        </Row>

        <Row  className="pb-4">
         <Col   > 
       
          {/* <DashboardCard 
            title="Total de Lucro"
            subtitle="Últimos 7 dias"
            value="50K"
            percentage="+12% "
            antes="7 dias anteriores"
          //  chart={<DashboardChart />}
          /> */}
          <ProfitCard 
  title="Total de Lucro" 
  subtitle="Últimos 7 dias" 
  value="50K" 
  percentage="+12%" 
  comparisonText="vs 7 dias anteriores" 
/>

        </Col>
        <Col > 
        <DeliveryCard 
          title="Entregas" 
          subtitle="Últimos 7 dias" 
          value="17/42" 
          percentage="+6%" 
          comparisonText="vs 7 dias anteriores" 
        />      
        </Col>

        <Col > 
          <SalesCard 
            title="Número de Vendas" 
            subtitle="Últimos 7 dias" 
            value="897" 
            percentage="-2%" 
            comparisonText="vs 7 dias anteriores" 
          />
        </Col>
        </Row>
        <Row  className="pb-4">
         <Col  xs={4} > 
         <TopCategoriesCard />
        </Col>
        <Col > 
        <TopProductsCard />
        
        </Col>
        </Row>

        <Row  className="pb-4">
         <Col  > 
       
         <FreightSummaryCard />
        </Col>
        <Col > 
          <TopDriversCard />
        
        </Col>
        </Row>

        <Row  className="pb-4">
         <Col   > 
         <TopClientsCard />
        </Col>
        <Col > 
        <PendingClientsCard />    
        </Col>

        <Col > 
        <LowStockProductsCard />
        </Col>
        </Row>

        <Row  className="pb-4">
         <Col  xs={6} > 
         <ScheduledExpensesCard />
        </Col>
        <Col > 
        <DeferredPaymentsCard />
        </Col>
        </Row>

        </Container>
        
      
    </React.Fragment>
  );
};

export default Dashboard;
