import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaCreditCard, FaShippingFast, FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { Breadcrumb } from 'react-bootstrap';

const OrderDetailsContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
`;

const Breadcrumbs = styled.div`
    font-size: 14px;
    color: #888;
    margin-bottom: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const OrderDetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
`;

const WideRow = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 20px;
`;

const Section = styled.div`
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderSummary = styled(Section)``;

const CustomerInfo = styled(Section)``;

const OrderItems = styled(Section)`
    grid-column: span 1;
    height: 28rem
`;

const AddressAndStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AddressInfo = styled(Section)``;

const StatusInfo = styled(Section)``;

const SectionTitle = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
`;

const StatusBadge = styled.span`
    background-color: #28a745; /* Cor verde */
    color: #fff;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
`;

const DetailRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 14px;

    svg {
        margin-right: 12px;
        color: #888;
        font-size: 18px;
    }

    span {
        flex: 1;
        color: #666;
    }

    strong {
        font-weight: 600;
        color: #333;
    }
`;

const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
        font-size: 14px;
        color: #666;
    }

    td {
        font-size: 14px;
        color: #333;
    }

    img {
        width: 50px;
        height: auto;
        margin-right: 10px;
        vertical-align: middle;
    }
`;

const PriceTotal = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
`;

const StatusItem = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    position: relative;
    padding-left: 24px;

    svg {
        margin-right: 12px;
        color: ${props => props.active ? '#4CAF50' : props.processing ? '#ffc107' : '#888'};
        font-size: 16px;
    }

    &::before {
        content: '';
        position: absolute;
        left: 6px;
        top: 8px;
        bottom: 0;
        width: 2px;
        background: ${props => props.last ? 'transparent' : '#ddd'};
        border-right: ${props => props.last ? 'none' : '2px dotted #ddd'};
    }

    div {
        margin-left: 8px;
    }

    strong {
        display: block;
        font-size: 14px;
        color: #333;
        margin-bottom: 4px;
    }

    p {
        margin: 0;
        font-size: 12px;
        color: #666;
    }

    small {
        font-size: 12px;
        color: #999;
    }
`;

const OrderDetails = () => {
    return (
        <OrderDetailsContainer>
            <Title>Detalhe dos pedidos</Title>
             <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item href='#'>Pedidos</Breadcrumb.Item>
                        <Breadcrumb.Item active>Pedidos</Breadcrumb.Item>
                    </Breadcrumb>

            <OrderDetailsGrid>
                <OrderSummary>
                    <h2>
                        Pedido #302011 
                        <StatusBadge style={{ backgroundColor: '#FDF1E8', color: '#E46A11'}}>Processing</StatusBadge>
                    </h2>
                    <DetailRow>
                        <FaCalendarAlt />
                        <span>Data de criação:</span>
                        <strong>12 Jan 2024</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaCreditCard />
                        <span>Forma de Pagamento:</span>
                        <strong>Visa</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaShippingFast />
                        <span>Tipo de entrega:</span>
                        <strong>Portaria</strong>
                    </DetailRow>
                </OrderSummary>

                <CustomerInfo>
                    <SectionTitle>Informações do Cliente</SectionTitle>
                    <DetailRow>
                        <FaUser />
                        <span>Cliente:</span>
                        <strong>João Silva</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaEnvelope />
                        <span>E-mail:</span>
                        <strong>joaosilva@gmail.com</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaPhoneAlt />
                        <span>Celular:</span>
                        <strong>11 98765-4321</strong>
                    </DetailRow>
                </CustomerInfo>
            </OrderDetailsGrid>

            <WideRow>
                <OrderItems>
                    <SectionTitle>Lista de Pedidos <StatusBadge style={{ backgroundColor: '#E7F4EE', color: '#1EB564'}}>2 Produtos</StatusBadge></SectionTitle>
                    <ProductTable>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>SKU</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="https://acdn.mitiendanube.com/stores/001/876/620/products/camisa-retro-selecao-brasileira-brasil-copa-1998-remake-masculina-fan-amarela-home-titular-ronaldo-edmundo-taffarel-cafu-roberto-carlos-rivaldo-vini-jr-1-a1b9a31740fba03c0417194265327814-640-0.jpg" alt="Produto 1" />
                                    Nome do Produto
                                </td>
                                <td>302011</td>
                                <td>200 g</td>
                                <td>R$ 150,00</td>
                                <td>R$ 150,00</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="https://pbs.twimg.com/media/GQOFWYXW4AAOE0N.jpg" alt="Produto 2" />
                                    Nome do Produto
                                </td>
                                <td>302012</td>
                                <td>120 g</td>
                                <td>R$ 150,00</td>
                                <td>R$ 150,00</td>
                            </tr>
                        </tbody>
                    </ProductTable>
                    <PriceTotal>
                        <p>Subtotal</p>
                        <p>R$ 150,00</p>
                    </PriceTotal>
                    <PriceTotal>
                        <p>Frete</p>
                        <p>R$ 15,00</p>
                    </PriceTotal>
                    <PriceTotal>
                        <strong>Total</strong>
                        <strong>R$ 300,00</strong>
                    </PriceTotal>
                </OrderItems>

                <AddressAndStatusContainer>
                    <AddressInfo>
                        <SectionTitle>Endereço de Entrega</SectionTitle>
                        <DetailRow>
                            <FaMapMarkerAlt />
                            <span>São Paulo | SP</span>
                        </DetailRow>
                        <p>Av Paulista, 1001</p>
                        <p>CEP 01234-45</p>
                    </AddressInfo>

                    <StatusInfo>
                        <SectionTitle>Status do Pedido</SectionTitle>
                        <StatusItem active>
                            <FaCheckCircle />
                            <div>
                                <strong>Pedido</strong>
                                <p>Seu pedido foi feito.</p>
                                <small>12/12/2023, 03h00</small>
                            </div>
                        </StatusItem>
                        <StatusItem processing>
                            <MdPayment />
                            <div>
                                <strong>Processando pagamento</strong>
                                <p>Estamos processando seu pedido</p>
                                <small>12/12/2024, 03h15</small>
                            </div>
                        </StatusItem>
                        <StatusItem>
                            <FaBox />
                            <div>
                                <strong>Pacote</strong>
                                <p>DD/MM/AA, 00:00</p>
                            </div>
                        </StatusItem>
                        <StatusItem>
                            <FaTruck />
                            <div>
                                <strong>Em transporte</strong>
                                <p>DD/MM/AA, 00:00</p>
                            </div>
                        </StatusItem>
                        <StatusItem last>
                            <FaCheckCircle />
                            <div>
                                <strong>Entrega</strong>
                                <p>DD/MM/AA, 00:00</p>
                            </div>
                        </StatusItem>
                    </StatusInfo>
                </AddressAndStatusContainer>
            </WideRow>
        </OrderDetailsContainer>
    );
};

export default OrderDetails;
