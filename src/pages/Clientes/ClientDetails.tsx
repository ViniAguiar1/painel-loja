import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaDollarSign, FaShoppingCart, FaAward } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ExportButton = styled.button`
  background-color: #f5d29e;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AddClientButton = styled.button`
  background-color: #b8860b;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #e0e0e0;
    border-color: #b8860b;
    color: #b8860b;
  }
`;

const ClientProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  height: 31.25rem;
`;

const ProfileCover = styled.div`
  height: 120px;
  background-color: #BF9000;
  border-radius: 8px;
  position: relative;
  margin: -14px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  top: -40px;
  border: 3px solid #ffffff;
  object-fit: cover;
`;

const ClientName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: -10px;
`;

const Username = styled.div`
  font-size: 14px;
  color: #999;
  margin-top: 5px;
`;

const Badge = styled.span`
  background-color: #c4a92b;
  color: white;
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 12px;
  margin-left: 5px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: #555;
  margin-top: 20px;
  text-align: left;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoIcon = styled.span`
  color: #6c757d;
  font-size: 16px;
`;

const ClientDetailsBox = styled.div`
  width: 75%;
`;

const SummaryCard = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

const IconWrapper = styled.div`
  background-color: ${(props) => props.bgColor || '#fff'};
  border-radius: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const SummaryTitle = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 10px;
`;

const SummaryValue = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const SummarySection = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 0.875rem;
`;

const OrderHistorySection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const OrderHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 3px 8px;
  border-radius: 8px;
  background-color: ${(props) => {
    if (props.status === 'Processando') return '#ffeeba';
    if (props.status === 'Em entrega') return '#d1ecf1';
    if (props.status === 'Finalizado') return '#d4edda';
  }};
  color: ${(props) => {
    if (props.status === 'Processando') return '#856404';
    if (props.status === 'Em entrega') return '#0c5460';
    if (props.status === 'Finalizado') return '#155724';
  }};
  font-weight: bold;
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? '#b8860b' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#333')};
  border: 1px solid #b8860b;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<any>({
    nomeUSUARIO: '',
    emailUSUARIO: '',
    telefoneUSUARIO: '',
    localizacaoUSUARIO: '',
    logUSUARIO: '',
    imagemUSUARIO: '',
    nivelUSUARIO: 'Bronze',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;
  const totalOrders = 0;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://api.spartacusprimetobacco.com.br/api/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do cliente:', error);
      }
    };
    fetchClient();
  }, [id]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const mockOrders = totalOrders > 0
    ? Array.from({ length: totalOrders }, (_, index) => ({
        id: 302000 + index,
        image: client.imagemUSUARIO || 'default-image-url',
        product: `Produto ${index + 1}`,
        total: 'R$ 200',
        status: index % 3 === 0 ? 'Processando' : index % 3 === 1 ? 'Em entrega' : 'Finalizado',
        date: '12/12/2023',
      }))
    : [];

  const paginatedOrders = mockOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Header>
          <Breadcrumb>Dashboard {'>'} <span style={{ color: 'red' }}>Lista de Clientes</span> {'>'} Detalhe do Cliente</Breadcrumb>
          {/* <ButtonGroup>
            <ExportButton>Exportar</ExportButton>
            <AddClientButton>+ Add Cliente</AddClientButton>
          </ButtonGroup> */}
        </Header>

        <div style={{ display: 'flex', gap: '20px' }}>
          <ClientProfileCard>
            <ProfileCover />
            <ProfileImage src={client.imagemUSUARIO || 'https://via.placeholder.com/80'} alt={client.nomeUSUARIO} />
            <ClientName>{client.nomeUSUARIO} <Badge>{client.nivelUSUARIO}</Badge></ClientName>
            <Username>@{client.telegramUSUARIO || ''}</Username>
            <ContactInfo>
              <InfoItem>
                <InfoIcon><FaUser /></InfoIcon> 
                <span>ID do Cliente: {client.codigoUSUARIO || 'ID-00000'}</span>
              </InfoItem>
              <InfoItem>
                <InfoIcon><FaEnvelope /></InfoIcon> 
                <span>Email: {client.emailUSUARIO || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <InfoIcon><FaPhone /></InfoIcon> 
                <span>Celular: {client.telefoneUSUARIO || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <InfoIcon><FaMapMarkerAlt /></InfoIcon> 
                <span>Endereço de Entrega: {client.localizacaoUSUARIO || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <InfoIcon><FaCalendarAlt /></InfoIcon> 
                <span>Último Pedido: {client.logUSUARIO || 'N/A'}</span>
              </InfoItem>
            </ContactInfo>
          </ClientProfileCard>

          <ClientDetailsBox>
            <SummarySection>
              <SummaryCard>
                <IconWrapper bgColor="#E0F2F1">
                  <FaDollarSign color="#388E3C" />
                </IconWrapper>
                <SummaryTitle>Total de Vendas</SummaryTitle>
                <SummaryValue>R$ 0,00</SummaryValue>
              </SummaryCard>
              <SummaryCard>
                <IconWrapper bgColor="#FFF3E0">
                  <FaShoppingCart color="#F57C00" />
                </IconWrapper>
                <SummaryTitle>Total de Pedidos</SummaryTitle>
                <SummaryValue>0</SummaryValue>
              </SummaryCard>
              <SummaryCard>
                <IconWrapper bgColor="#EDE7F6">
                  <FaAward color="#673AB7" />
                </IconWrapper>
                <SummaryTitle>Nível do Cliente</SummaryTitle>
                <SummaryValue>{client.nivelUSUARIO}</SummaryValue>
              </SummaryCard>
            </SummarySection>

            <OrderHistorySection>
              <OrderHistoryHeader>
                <h2>Histórico de Pedidos</h2>
                <ButtonGroup>
                  <StyledButton>Selecionar Data</StyledButton>
                  <StyledButton>Filtros</StyledButton>
                </ButtonGroup>
              </OrderHistoryHeader>
              {paginatedOrders.length > 0 ? (
                <OrderTable>
                  <thead>
                    <TableRow>
                      <TableCell>Pedido</TableCell>
                      <TableCell>Produto</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Data</TableCell>
                    </TableRow>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                          <img src={order.image} alt={`Imagem do produto ${order.product}`} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                          <p style={{ fontSize: 16 }}>{order.product}</p>
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell><StatusBadge status={order.status}>{order.status}</StatusBadge></TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </OrderTable>
              ) : (
                <p style={{ textAlign: 'center', color: '#999' }}>Nenhum pedido encontrado</p>
              )}
              <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PageButton
                    key={index + 1}
                    active={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PageButton>
                ))}
              </Pagination>
            </OrderHistorySection>
          </ClientDetailsBox>
        </div>
      </div>
    </Container>
  );
};

export default ClientDetails;
