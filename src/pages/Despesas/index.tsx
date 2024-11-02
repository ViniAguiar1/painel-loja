import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb } from "react-bootstrap";
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.css';

const PageContainer = styled.div`
    min-height: 100vh;
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
    justify-content: space-between;
`;

const FilterCard = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 11.5625rem;
    height: 9.0625rem;
`;

const CardTitle = styled.h4`
    margin: 0;
    font-size: 1em;
    color: #353535;
    font-weight: 600;
    font-family: Poppins, sans-serif;
`;

const CardItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    color: #060101;
    font-size: 0.9em;
    font-family: Poppins, sans-serif;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    accent-color: #1EB564;
    cursor: pointer;
`;

const FilterButtonsGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
    background-color: ${({ active }) => (active ? "#BF9000" : "#D6D6D6")};
    color: ${({ active }) => (active ? "white" : "#D02626")};
    border: none;
    padding: 8px 15px;
    border-radius: 8px;
    font-size: 0.85em;
    cursor: pointer;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
        if(status === "Em aberto") return "#BF9000";
    }};
    background-color: ${({ status }) => {
        if (status === "Cancelado") return "#F57E771F";
        if (status === "Pago") return "#9EB57826";
        if (status === "Em aberto") return "#FFCC9129";
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

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const ModalTitle = styled.h2`
    margin: 0 0 20px;
`;

const ModalCloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5em;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const DespesasPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("Todos");
    const [showReceived, setShowReceived] = useState(true);
    const [showPendingReceived, setShowPendingReceived] = useState(true);
    const [showPaid, setShowPaid] = useState(true);
    const [showPendingPaid, setShowPendingPaid] = useState(true);
    const [newExpense, setNewExpense] = useState({
        nome: "",
        categoria: 1,
        localizacao: 1,
        preco: "",
    });
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://api.spartacusprimetobacco.com.br/api/lancamentos", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const formattedData = response.data.map(item => ({
                    id: item.codigoLANCAMENTO,
                    nome: item.nomeLANCAMENTO,
                    categoria: item.categoriaLANCAMENTO === 1 ? "Categoria 1" : "Outra Categoria",
                    total: `R$ ${(parseFloat(item.precoLANCAMENTO) / 100).toFixed(2)}`,
                    localizacao: item.localizacaoLANCAMENTO === 1 ? "São Paulo" : "Outra Localização",
                    statusPagamento: item.statusLANCAMENTO === 1 ? "Pago" : item.statusLANCAMENTO === 0 ? "Em aberto" : "Cancelado",
                    data: new Date(item.datacriacaoLANCAMENTO).toLocaleDateString(),
                    imagem: item.imagemLANCAMENTO || "https://via.placeholder.com/50"
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    const handleCreateExpense = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://api.spartacusprimetobacco.com.br/api/lancamentos",
                {
                    nomeLANCAMENTO: newExpense.nome,
                    categoriaLANCAMENTO: newExpense.categoria,
                    localizacaoLANCAMENTO: newExpense.localizacao,
                    statusLANCAMENTO: 0,
                    tipoLANCAMENTO: 2,
                    precoLANCAMENTO: parseFloat(newExpense.preco) * 100,
                    datacriacaoLANCAMENTO: new Date().toISOString(),
                    ativoLANCAMENTO: true,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData([...data, response.data]);
            setIsModalOpen(false);
            setNewExpense({ nome: "", categoria: 1, localizacao: 1, preco: "" });
        } catch (error) {
            console.error("Erro ao criar nova despesa:", error);
        }
    };

    const filteredData = data
        .filter(item => filter === "Todos" || item.statusPagamento === filter)
        .filter(item =>
            (showReceived && item.statusPagamento === "Pago") ||
            (showPendingReceived && item.statusPagamento === "Em aberto") ||
            (showPaid && item.statusPagamento === "Pago") ||
            (showPendingPaid && item.statusPagamento === "Em aberto")
        );

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                    <AddExpenseButton onClick={() => setIsModalOpen(true)}>+ Criar despesa</AddExpenseButton>
                </div>
            </div>

            <Header>
                <CardGroup>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <FilterCard>
                            <CardTitle>Recebimento</CardTitle>
                            <CardItem>
                                <Checkbox
                                    checked={showReceived}
                                    onChange={() => setShowReceived(!showReceived)}
                                /> Recebidos
                            </CardItem>
                            <CardItem>
                                <Checkbox
                                    checked={showPendingReceived}
                                    onChange={() => setShowPendingReceived(!showPendingReceived)}
                                /> Pendentes
                            </CardItem>
                        </FilterCard>
                        <FilterCard>
                            <CardTitle>Pagamento</CardTitle>
                            <CardItem>
                                <Checkbox
                                    checked={showPaid}
                                    onChange={() => setShowPaid(!showPaid)}
                                /> Pago
                            </CardItem>
                            <CardItem>
                                <Checkbox
                                    checked={showPendingPaid}
                                    onChange={() => setShowPendingPaid(!showPendingPaid)}
                                /> Pendentes
                            </CardItem>
                        </FilterCard>
                    </div>
                    <FilterButtonsGroup>
                        <FilterButton active={filter === "Em aberto"} onClick={() => handleFilterChange("Em aberto")}>Em aberto</FilterButton>
                        <FilterButton active={filter === "Pago"} onClick={() => handleFilterChange("Pago")}>Pago</FilterButton>
                        <FilterButton active={filter === "Cancelado"} onClick={() => handleFilterChange("Cancelado")}>Cancelado</FilterButton>
                    </FilterButtonsGroup>
                </CardGroup>
            </Header>

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <Th>Nome</Th>
                            <Th>Categoria</Th>
                            <Th>Total</Th>
                            <Th>Localização</Th>
                            <Th>Status Pagamento</Th>
                            <Th>Data</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.id}>
                                <Td>
                                    <img
                                        style={{ height: '50px', width: 50 }}
                                        src={item.imagem}
                                        alt="Produto"
                                    />
                                </Td>
                                <Td>{item.categoria}</Td>
                                <Td>{item.total}</Td>
                                <Td>{item.localizacao}</Td>
                                <Td><Status status={item.statusPagamento}>{item.statusPagamento}</Status></Td>
                                <Td>{item.data}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>

            <Pagination>
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                    <PageButton
                        key={index}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </PageButton>
                ))}
            </Pagination>

            {/* Modal para criar nova despesa */}
            {isModalOpen && (
                <ModalBackground>
                    <ModalContainer>
                        <ModalCloseButton onClick={() => setIsModalOpen(false)}>&times;</ModalCloseButton>
                        <ModalTitle>Criar Nova Despesa</ModalTitle>
                        <form onSubmit={handleCreateExpense}>
                            <label>Nome da Despesa:</label>
                            <input
                                type="text"
                                value={newExpense.nome}
                                onChange={(e) => setNewExpense({ ...newExpense, nome: e.target.value })}
                                placeholder="Digite o nome"
                                style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                            <label>Categoria:</label>
                            <input
                                type="number"
                                value={newExpense.categoria}
                                onChange={(e) => setNewExpense({ ...newExpense, categoria: Number(e.target.value) })}
                                placeholder="Digite a categoria"
                                style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                            <label>Total:</label>
                            <input
                                type="number"
                                value={newExpense.preco}
                                onChange={(e) => setNewExpense({ ...newExpense, preco: e.target.value })}
                                placeholder="Digite o valor"
                                style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                            <button
                                type="submit"
                                style={{ backgroundColor: '#D02626', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Salvar
                            </button>
                        </form>
                    </ModalContainer>
                </ModalBackground>
            )}
        </PageContainer>
    );
};

export default DespesasPage;
