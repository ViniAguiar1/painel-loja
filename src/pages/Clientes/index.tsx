import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFilter, FaEllipsisV } from 'react-icons/fa';  
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Interface ajustada para dados da API
interface Cliente {
    id: number;
    nome: string;
    status: string;
    pedidos: number;
    vendas: string;
    foto: string;
}

// Styled Components
const Container = styled.div` padding: 20px; `;
const Header = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; `;
const Title = styled.h1` font-size: 24px; font-weight: bold; margin-bottom: 10px; `;
const Breadcrumb = styled.div` font-size: 14px; color: #6c757d; margin-bottom: 10px; `;
const SearchBar = styled.input` padding: 10px; width: 100%; max-width: 700px; height: 40px; margin-right: auto; border: 1px solid #ccc; border-radius: 10px; font-size: 16px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); outline: none; transition: box-shadow 0.3s; &:focus { box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); } `;
const Actions = styled.div` display: flex; align-items: center; gap: 10px; `;
const Button = styled.button` padding: 10px 20px; background-color: #ffcc00; border: none; border-radius: 4px; cursor: pointer; `;
const AddClientButton = styled(Button)` background-color: #ff0000; color: white; `;
const FilterButton = styled.button<{ active: boolean }>` background-color: ${(props) => (props.active ? '#ffcc00' : '#f0f0f0')}; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px; color: ${(props) => (props.active ? 'black' : '#666')}; `;
const FilterIconButton = styled.button` display: flex; align-items: center; gap: 5px; background-color: #ffcc00; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; color: black; `;
const Grid = styled.div` display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-top: 20px; `;
const Card = styled.div<{ selected: boolean }>` background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); text-align: center; position: relative; border: 2px solid ${(props) => (props.selected ? '#007bff' : 'transparent')}; transition: border-color 0.3s ease; `;
const ClientName = styled.h2` font-size: 18px; font-weight: bold; `;
const ClientStatus = styled.span<{ status: string }>` display: inline-block; padding: 5px 10px; border-radius: 8px; background-color: ${(props) => (props.status === 'Ativo' ? '#fff7e6' : '#f8d7da')}; color: ${(props) => (props.status === 'Ativo' ? '#b8860b' : '#721c24')}; margin-bottom: 10px; border: 1px solid ${(props) => (props.status === 'Ativo' ? '#ffdd99' : '#f5c6cb')}; `;
const Pagination = styled.div` margin-top: 20px; display: flex; justify-content: center; align-items: center; gap: 5px; `;
const PageInfo = styled.div` font-size: 14px; color: #6c757d; margin-right: auto; `;
const PageNumber = styled.button<{ active: boolean }>` background-color: ${(props) => (props.active ? '#b8860b' : 'white')}; border: 1px solid #b8860b; padding: 5px 10px; cursor: pointer; border-radius: 4px; margin: 0 5px; color: ${(props) => (props.active ? 'white' : '#b8860b')}; `;
const ArrowButton = styled.button` background-color: white; border: 1px solid #b8860b; padding: 5px 10px; cursor: pointer; border-radius: 4px; color: #b8860b; `;
const Ellipsis = styled.span` padding: 5px 10px; color: #b8860b; `;
const Checkbox = styled.input.attrs({ type: 'checkbox' })` position: absolute; top: 10px; left: 10px; `;
const ClientImage = styled.img` width: 50px; margin-bottom: 10px; `;
const ClientInfo = styled.div` display: flex; justify-content: space-between; margin-top: 10px; `;
const DottedDivider = styled.div` border-top: 1px dotted #ccc; margin: 10px 0; `;
const ClientInfoItem = styled.div` text-align: center; `;
const ActionMenuButton = styled.div` position: absolute; top: 10px; right: 10px; cursor: pointer; `;

// Página de Clientes
const ClientesPage: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [selectedClient, setSelectedClient] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 15;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/usuarios?tipo=6&limit=1000', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const clientesData = response.data.map((usuario: any) => ({
                    id: usuario.codigoUSUARIO,
                    nome: usuario.nomeUSUARIO,
                    status: usuario.ativoUSUARIO ? 'Ativo' : 'Bloqueado',
                    pedidos: 0,
                    vendas: 'R$ 0,00',
                    foto: usuario.imagemUSUARIO,
                }));
                
                setClientes(clientesData);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, [token]);

    const handleSelectClient = (id: number) => {
        setSelectedClient(selectedClient === id ? null : id);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleClientClick = (id: number) => {
        navigate(`/client-details/${id}`);
    };

    const filteredClients = clientes
        .filter((cliente) =>
            cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((cliente) =>
            activeFilter === 'Todos' || cliente.status === activeFilter
        );

    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const paginatedClients = filteredClients.slice(
        (currentPage - 1) * clientsPerPage,
        currentPage * clientsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPaginationButtons = () => {
        const paginationButtons = [];

        if (totalPages <= 5) {
            // Show all pages if there are 5 or less
            for (let i = 1; i <= totalPages; i++) {
                paginationButtons.push(
                    <PageNumber key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                        {i}
                    </PageNumber>
                );
            }
        } else {
            // Show first page
            paginationButtons.push(
                <PageNumber key={1} active={1 === currentPage} onClick={() => handlePageChange(1)}>
                    1
                </PageNumber>
            );

            if (currentPage > 3) {
                paginationButtons.push(<Ellipsis key="start-ellipsis">...</Ellipsis>);
            }

            // Show middle pages
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
                paginationButtons.push(
                    <PageNumber key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                        {i}
                    </PageNumber>
                );
            }

            if (currentPage < totalPages - 2) {
                paginationButtons.push(<Ellipsis key="end-ellipsis">...</Ellipsis>);
            }

            // Show last page
            paginationButtons.push(
                <PageNumber key={totalPages} active={totalPages === currentPage} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </PageNumber>
            );
        }

        return paginationButtons;
    };

    return (
        <Container>
            <Title>Listagem de Clientes</Title>
            <Breadcrumb>Dashboard {'>'} Listagem de Clientes</Breadcrumb>
            <Header>
                <SearchBar placeholder="Procurar cliente..." value={searchTerm} onChange={handleSearch} />
                {/* <Actions>
                    <Button>Exportar</Button>
                    <AddClientButton>+ Adicionar</AddClientButton>
                </Actions> */}
            </Header>
            <Header style={{marginTop:30, marginBottom:30}}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <FilterButton active={activeFilter === 'Todos'} onClick={() => setActiveFilter('Todos')}>
                        Todos
                    </FilterButton>
                    <FilterButton active={activeFilter === 'Ativo'} onClick={() => setActiveFilter('Ativo')}>
                        Ativos
                    </FilterButton>
                    <FilterButton active={activeFilter === 'Bloqueado'} onClick={() => setActiveFilter('Bloqueado')}>
                        Bloqueados
                    </FilterButton>
                </div>
                <Actions>
                    <FilterIconButton>
                        <FaFilter /> Filters
                    </FilterIconButton>
                </Actions>
            </Header>

            <Grid>
                {paginatedClients.map((cliente) => (
                    <Card
                        key={cliente.id}
                        selected={selectedClient === cliente.id}
                        onClick={() => handleSelectClient(cliente.id)}
                    >
                        <Checkbox checked={selectedClient === cliente.id} readOnly />
                        <ActionMenuButton onClick={(e) => e.stopPropagation()}>
                            <Menu menuButton={<FaEllipsisV />}>
                                <MenuItem>Editar</MenuItem>
                                <MenuItem>Ver Pedidos</MenuItem>
                                <MenuItem>Imprimir Dados</MenuItem>
                            </Menu>
                        </ActionMenuButton>
                        <ClientImage src={cliente.foto} alt={cliente.nome} />
                        <ClientName onClick={() => handleClientClick(cliente.id)} style={{ cursor: 'pointer' }}>
                            {cliente.nome}
                        </ClientName>
                        <ClientStatus status={cliente.status}>{cliente.status}</ClientStatus>
                        <DottedDivider />
                        <ClientInfo>
                            <ClientInfoItem>
                                <div>Pedidos</div>
                                <div>{cliente.pedidos}</div>
                            </ClientInfoItem>
                            <ClientInfoItem>
                                <div>Vendas</div>
                                <div>{cliente.vendas}</div>
                            </ClientInfoItem>
                        </ClientInfo>
                    </Card>
                ))}
            </Grid>

            <Pagination>
                <PageInfo>
                    Mostrando {currentPage * clientsPerPage - clientsPerPage + 1}-
                    {Math.min(currentPage * clientsPerPage, filteredClients.length)} de {filteredClients.length}
                </PageInfo>
                <ArrowButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    {"<"}
                </ArrowButton>
                {renderPaginationButtons()}
                <ArrowButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    {">"}
                </ArrowButton>
            </Pagination>
        </Container>
    );
};

export default ClientesPage;
