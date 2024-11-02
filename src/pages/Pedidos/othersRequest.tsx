import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaCalendarAlt, FaCreditCard, FaShippingFast, FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { Breadcrumb } from 'react-bootstrap';
import moment from 'moment';

const OrderDetailsContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
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
    height: 28rem;
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
    background-color: #28a745;
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

const OthersRequest: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [orderDetails, setOrderDetails] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('token');
            fetch(`https://api.spartacusprimetobacco.com.br/api/carrinhos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => setOrderDetails(data))
            .catch(error => console.error("Erro ao buscar detalhes do pedido:", error));
        }
    }, [id]);

    if (!orderDetails) {
        return <p>Carregando...</p>;
    }

    return (
        <OrderDetailsContainer>
            <Title>Detalhe dos pedidos</Title>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item href='/pedidos'>Pedidos</Breadcrumb.Item>
                <Breadcrumb.Item active>Pedido {id}</Breadcrumb.Item>
            </Breadcrumb>

            <OrderDetailsGrid>
                <OrderSummary>
                    <h2>
                        Pedido #{orderDetails.codigoCARRINHO || 'N/A'}
                        <StatusBadge style={{ backgroundColor: orderDetails.statusCARRINHO ? '#28a745' : '#dc3545', color: '#fff' }}>
                            {orderDetails.statusCARRINHO ? 'Ativo' : 'Inativo'}
                        </StatusBadge>
                    </h2>
                    <DetailRow>
                        <FaCalendarAlt />
                        <span>Data de criação:</span>
                        <strong>{orderDetails.datacriacaoCARRINHO ? moment(orderDetails.datacriacaoCARRINHO).format('DD MMM YYYY') : 'N/A'}</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaCreditCard />
                        <span>Forma de Pagamento:</span>
                        <strong>{orderDetails.formaPagamentoCARRINHO || 'N/A'}</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaShippingFast />
                        <span>Tipo de entrega:</span>
                        <strong>{orderDetails.preferenciaCARRINHO || 'N/A'}</strong>
                    </DetailRow>
                </OrderSummary>

                <CustomerInfo>
                    <SectionTitle>Informações do Cliente</SectionTitle>
                    <DetailRow>
                        <FaUser />
                        <span>Cliente:</span>
                        <strong>{orderDetails.nomeCARRINHO || 'N/A'} {orderDetails.sobrenomeCARRINHO || ''}</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaEnvelope />
                        <span>E-mail:</span>
                        <strong>{orderDetails.emailCARRINHO || 'N/A'}</strong>
                    </DetailRow>
                    <DetailRow>
                        <FaPhoneAlt />
                        <span>Celular:</span>
                        <strong>({orderDetails.areaTelefoneCARRINHO || '00'}) {orderDetails.telefoneCARRINHO || '000000000'}</strong>
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
                            {/* Preencha com os dados dos produtos, ou mostre valores padrão */}
                            <tr>
                                <td>
                                    <img src="https://via.placeholder.com/50" alt="Produto" />
                                    Nome do Produto
                                </td>
                                <td>SKU</td>
                                <td>Quantidade</td>
                                <td>R$ Preço</td>
                                <td>R$ Total</td>
                            </tr>
                        </tbody>
                    </ProductTable>
                    <PriceTotal>
                        <p>Subtotal</p>
                        <p>{orderDetails.precoCARRINHO || '0,00'}</p>
                    </PriceTotal>
                    <PriceTotal>
                        <p>Frete</p>
                        <p>{orderDetails.freteCARRINHO || '0,00'}</p>
                    </PriceTotal>
                    <PriceTotal>
                        <strong>Total</strong>
                        <strong>{orderDetails.totalCARRINHO || '0,00'}</strong>
                    </PriceTotal>
                </OrderItems>

                <AddressAndStatusContainer>
                    <AddressInfo>
                        <SectionTitle>Endereço de Entrega</SectionTitle>
                        <DetailRow>
                            <FaMapMarkerAlt />
                            <span>{orderDetails.localizacaoCARRINHO || 'Cidade não especificada'}</span>
                        </DetailRow>
                        <p>{orderDetails.ruaCARRINHO || 'Rua não especificada'}, {orderDetails.numeroCARRINHO || 'N/A'} - {orderDetails.complementoCARRINHO || 'N/A'}</p>
                        <p>CEP {orderDetails.cepCARRINHO || '00000-000'}</p>
                    </AddressInfo>

                    <StatusInfo>
                        <SectionTitle>Status do Pedido</SectionTitle>
                        {/* Exibe status do pedido com valores padrão quando necessário */}
                        <StatusItem active>
                            <FaCheckCircle />
                            <div>
                                <strong>Pedido</strong>
                                <p>Seu pedido foi feito.</p>
                                <small>{moment(orderDetails.recebidoCARRINHO).format('DD/MM/YYYY, HH:mm') || 'N/A'}</small>
                            </div>
                        </StatusItem>
                        <StatusItem processing>
                            <MdPayment />
                            <div>
                                <strong>Processando pagamento</strong>
                                <p>Estamos processando seu pedido</p>
                                <small>{moment(orderDetails.recebimentoCARRINHO).format('DD/MM/YYYY, HH:mm') || 'N/A'}</small>
                            </div>
                        </StatusItem>
                        <StatusItem>
                            <FaBox />
                            <div>
                                <strong>Pacote</strong>
                                <p>Preparando para envio</p>
                                <small>N/A</small>
                            </div>
                        </StatusItem>
                        <StatusItem last>
                            <FaTruck />
                            <div>
                                <strong>Em transporte</strong>
                                <p>O pedido está a caminho</p>
                                <small>N/A</small>
                            </div>
                        </StatusItem>
                    </StatusInfo>
                </AddressAndStatusContainer>
            </WideRow>
        </OrderDetailsContainer>
    );
};

export default OthersRequest;
