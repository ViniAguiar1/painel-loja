import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi'; // Importando o ícone de X

const PageContainer = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const SectionTitle = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #23272E;
    font-weight: 700;
    font-family: Public Sans, sans-serif;
    line-height: 22px;
    width: 100%;
`;

const CardsContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const OrderCard = styled.div`
    background-color: #ffffff;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 25px;
    height: 23rem;
`;

const Avatar = styled.div`
    width: 80px;
    height: 80px;
    background-color: #e0e0e0;
    border-radius: 50%;
    margin: 0 auto 15px;
`;

const OrderNumber = styled.h3`
    font-size: 1.5rem;
    color: #1A1C21;
    margin-bottom: 10px;
    font-weight: 500;
    font-family: Inter, sans-serif;
    line-height: 28px;
`;

const OrderInfo = styled.p`
    font-size: 0.9rem;
    color: #060101;
    margin: 5px 0;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 15px;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 15px;
    font-size: 0.9rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    ${({ cancel }) =>
        cancel
            ? `
            background-color: #FFF;
            border: 1px solid #D02626;
            color: #D02626;
            font-weight: 400;
            font-family: Poppins, Inter, sans-serif;
            font-size: 0.9rem;
            line-height: 20px;
        `
            : `
            background-color: #1EB564;
            color: #FFFFFF;
            font-weight: 400;
            font-family: Poppins, Inter, sans-serif;
            font-size: 0.9rem;
            line-height: 20px;
        `}
`;

const Envios = () => {
    return (
        <PageContainer>
            <SectionTitle>Listagem de pedidos na fila</SectionTitle>
            <CardsContainer>
                <OrderCard>
                    <Avatar />
                    <OrderNumber>3034</OrderNumber>
                    <div style={{textAlign: 'left'}}>
                    <OrderInfo><strong>Endereço:</strong> Rua Bahia de Todos, 12 Apt. B</OrderInfo>
                    <OrderInfo><strong>Local:</strong> Centro - São Paulo SP</OrderInfo>
                    <OrderInfo><strong>Tipo de Entrega:</strong> Fluvial</OrderInfo>
                    <OrderInfo><strong>Nome:</strong> Laura Pereira</OrderInfo>
                    </div>
                    <ButtonGroup>
                        <ActionButton cancel>
                            <FiX /> {/* Ícone de X */}
                            Não Entregue
                        </ActionButton>
                        <ActionButton>Entregar</ActionButton>
                    </ButtonGroup>
                </OrderCard>
                <OrderCard>
                    <Avatar />
                    <OrderNumber>3034</OrderNumber>
                    <div style={{ textAlign: 'left'}}>
                    <OrderInfo><strong style={{ fontWeight: 'bold'}}>Endereço:</strong> Rua Bahia de Todos, 12 Apt. B</OrderInfo>
                    <OrderInfo><strong>Local:</strong> Centro - São Paulo SP</OrderInfo>
                    <OrderInfo><strong>Tipo de Entrega:</strong> Fluvial</OrderInfo>
                    <OrderInfo><strong>Nome:</strong> Laura Pereira</OrderInfo>
                    </div>
                    <ButtonGroup>
                        <ActionButton cancel>
                            <FiX /> {/* Ícone de X */}
                            Não Entregue
                        </ActionButton>
                        <ActionButton>Entregar</ActionButton>
                    </ButtonGroup>
                </OrderCard>
            </CardsContainer>

            <SectionTitle>Listagem de pedidos fora da fila</SectionTitle>
            <CardsContainer>
                <OrderCard>
                    <Avatar />
                    <OrderNumber>3034</OrderNumber>
                    <div style={{ textAlign: 'left' }}>
                    <OrderInfo><strong>Endereço:</strong> Rua Bahia de Todos, 12 Apt. B</OrderInfo>
                    <OrderInfo><strong>Local:</strong> Centro - São Paulo SP</OrderInfo>
                    <OrderInfo><strong>Tipo de Entrega:</strong> Fluvial</OrderInfo>
                    <OrderInfo><strong>Nome:</strong> Laura Pereira</OrderInfo>
                    </div>
                    <ButtonGroup>
                        <ActionButton cancel>
                            <FiX /> {/* Ícone de X */}
                            Não Entregue
                        </ActionButton>
                        <ActionButton>Entregar</ActionButton>
                    </ButtonGroup>
                </OrderCard>
            </CardsContainer>
        </PageContainer>
    );
};

export default Envios;
