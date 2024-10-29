import React, { useState } from "react";
import styled from "styled-components";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { Breadcrumb } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';

const PageContainer = styled.div`
    min-height: 100vh;
    // padding: 20px;
    // background-color: #f9fafb;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

const CardGroup = styled.div`
    display: flex;
    gap: 22rem;
    // background-color: red;
    justify-content: space-between
`;

const FilterCard = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 11.5625rem,
    height: 9.0625rem
`;

const CardTitle = styled.h4`
    margin: 0;
    font-size: 1em;
    color: #353535;
    font-weight: 600;
    font-family: Poppins,
    font-weight: 500
`;

const CardItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    color: #060101;
    font-size: 0.9em;
    font-family: Poppins,
    font-weight: 500
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    accent-color: #1EB564;
    cursor: pointer;

    &:checked {
        background-color: #1EB564;
        color: #FFFFFF;
    }
    
    /* Safari */
    &::before {
        content: '';
        display: block;
        background-color: #1EB564;
    }

    &:checked::after {
        color: #FFFFFF;
    }
`;

const FilterButtonsGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    // margin-right: rem
`;

const FilterButton = styled.button`
    background-color: ${({ color }) => color || "#D02626"};
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 8px;
    font-size: 0.85em;
    cursor: pointer;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DateButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: #f3f3f3;
    }
`;

const AddExpenseButton = styled.button`
    background-color: #D02626;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.85em;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Estilos adicionais para a tabela
const TableContainer = styled.div`
    margin-top: 20px;
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    background-color: #f9fafb;
    font-weight: 600;
    padding: 12px;
    border-bottom: 2px solid #f1f1f1;
    text-align: left;
`;

const Td = styled.td`
    padding: 12px;
    border-bottom: 1px solid #f1f1f1;
    text-align: left;
`;

const Status = styled.span`
    padding: 5px 10px;
    border-radius: 5px;
    color: ${({ status }) => {
        if(status === "Cancelado") return "#D02626";
        if(status === "Pago") return "#1EB564";
        if(status === "A prazo") return "#BF9000"
    }};
    background-color: ${({ status }) => {
        if (status === "Cancelado") return "#F57E771F";
        if (status === "Pago") return "#9EB57826";
        if (status === "A prazo") return "##FFCC9129";
        return "#E0E0E0";
    }};
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
`;

const PageButton = styled.button`
    background-color: ${({ active }) => (active ? "#BF9000" : "#F3F3F3")};
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background-color: #ffd54f;
    }
`;

// Dados mockados de pedidos
const pedidos = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    nome: "Lorem ipsum",
    categoria: "Nome categoria",
    total: "R$ 150,00",
    localizacao: "São Paulo",
    statusPagamento: index % 3 === 0 ? "Cancelado" : index % 2 === 0 ? "Pago" : "A prazo",
    statusRecebimento: index % 3 === 0 ? "Cancelado" : index % 2 === 0 ? "Pago" : "A prazo",
    data: "DD/MM/AA",
}));

const DespesasPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedData = pedidos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <PageContainer>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1>Despesas</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Despesas</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <div style={{marginBottom: 8}}>
                        <FilterButton style={{ backgroundColor: '#D6D6D6', color: '#D02626', marginRight: 6}}>A prazo</FilterButton>
                        <FilterButton style={{ backgroundColor: '#D6D6D6', color: '#D02626', marginRight: 6 }}>Estoque</FilterButton>
                        <AddExpenseButton>+ Criar despesa</AddExpenseButton>
                    </div>
                </div>
            </div>

            <Header>
                <CardGroup>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10}}>
                        <FilterCard>
                            <CardTitle>Recebimento</CardTitle>
                            <CardItem>
                                <Checkbox type="checkbox" defaultChecked /> Recebidos
                            </CardItem>
                            <CardItem>
                                <Checkbox type="checkbox" defaultChecked /> Pendentes
                            </CardItem>
                        </FilterCard>
                        <FilterCard>
                            <CardTitle>Pagamento</CardTitle>
                            <CardItem>
                                <Checkbox type="checkbox" defaultChecked /> Pago
                            </CardItem>
                            <CardItem>
                                <Checkbox type="checkbox" defaultChecked /> Pendentes
                            </CardItem>
                        </FilterCard>
                    </div>
                    <div>
                        <FilterButtonsGroup>
                            <DateButton>
                                <i className="fa fa-calendar"></i> Selecionar data
                            </DateButton>
                            <DateButton>
                                <i className="fa fa-calendar-alt"></i> Selecionar Período
                            </DateButton>
                        </FilterButtonsGroup>
                    </div>
                </CardGroup>
            </Header>

            {/* Tabela de despesas mockadas */}
            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <Th>Nome</Th>
                            <Th>Categoria</Th>
                            <Th>Total</Th>
                            <Th>Localização</Th>
                            <Th>Status Pagamento</Th>
                            <Th>Status Recebimento</Th>
                            <Th>Data</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((pedido) => (
                            <tr key={pedido.id}>
                                <Td><img style={{
                                    height: '50px', width: 50
                                }} src="data:image/jpeg;base64,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" alt="Produto" /></Td>
                                <Td>{pedido.categoria}</Td>
                                <Td>{pedido.total}</Td>
                                <Td>{pedido.localizacao}</Td>
                                <Td><Status status={pedido.statusPagamento}>{pedido.statusPagamento}</Status></Td>
                                <Td><Status status={pedido.statusRecebimento}>{pedido.statusRecebimento}</Status></Td>
                                <Td>{pedido.data}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>

            {/* Paginação */}
            <Pagination>
                {Array.from({ length: Math.ceil(pedidos.length / itemsPerPage) }, (_, index) => (
                    <PageButton
                        key={index}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </PageButton>
                ))}
            </Pagination>
        </PageContainer>
    );
};

export default DespesasPage;
