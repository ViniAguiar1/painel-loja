import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFilter, FaEllipsisV } from 'react-icons/fa';  
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'; // Estilo do menu de contexto
import { useNavigate } from 'react-router-dom';


// Simulação de dados JSON com 30 clientes
// Simulação de dados JSON com nomes, vendas e fotos
const clientes: Cliente[] = [
    { id: 1, nome: 'John Bushmill', status: 'Ativo', pedidos: 127, vendas: 'R$ 12.091', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 2, nome: 'Laura Prichet', status: 'Ativo', pedidos: 15, vendas: 'R$ 231', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 3, nome: 'Mohammad Karim', status: 'Bloqueado', pedidos: 12, vendas: 'R$ 910', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 4, nome: 'Emily Clarke', status: 'Ativo', pedidos: 67, vendas: 'R$ 2.340', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 5, nome: 'James Anderson', status: 'Ativo', pedidos: 49, vendas: 'R$ 1.150', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 6, nome: 'Sophia Lewis', status: 'Bloqueado', pedidos: 88, vendas: 'R$ 5.200', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 7, nome: 'William Johnson', status: 'Ativo', pedidos: 23, vendas: 'R$ 715', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 8, nome: 'Olivia White', status: 'Bloqueado', pedidos: 10, vendas: 'R$ 180', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 9, nome: 'Mason Harris', status: 'Ativo', pedidos: 95, vendas: 'R$ 3.890', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 10, nome: 'Lucas Davis', status: 'Ativo', pedidos: 77, vendas: 'R$ 2.450', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 11, nome: 'Liam Robinson', status: 'Bloqueado', pedidos: 13, vendas: 'R$ 589', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 12, nome: 'Emma Brown', status: 'Ativo', pedidos: 38, vendas: 'R$ 1.400', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 13, nome: 'Noah Thompson', status: 'Ativo', pedidos: 58, vendas: 'R$ 2.300', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 14, nome: 'Charlotte Taylor', status: 'Ativo', pedidos: 65, vendas: 'R$ 3.400', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 15, nome: 'Benjamin Moore', status: 'Bloqueado', pedidos: 99, vendas: 'R$ 4.700', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 16, nome: 'Amelia King', status: 'Ativo', pedidos: 12, vendas: 'R$ 230', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 17, nome: 'Alexander Walker', status: 'Ativo', pedidos: 81, vendas: 'R$ 5.920', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 18, nome: 'Mia Martinez', status: 'Bloqueado', pedidos: 20, vendas: 'R$ 645', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 19, nome: 'Ethan Scott', status: 'Ativo', pedidos: 48, vendas: 'R$ 2.790', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 20, nome: 'Isabella Young', status: 'Bloqueado', pedidos: 29, vendas: 'R$ 1.160', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 21, nome: 'Aiden Lee', status: 'Ativo', pedidos: 53, vendas: 'R$ 3.200', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 22, nome: 'Evelyn Green', status: 'Ativo', pedidos: 37, vendas: 'R$ 2.150', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 23, nome: 'Logan Hall', status: 'Bloqueado', pedidos: 17, vendas: 'R$ 890', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 24, nome: 'Harper Allen', status: 'Ativo', pedidos: 84, vendas: 'R$ 4.510', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 25, nome: 'Henry Martin', status: 'Bloqueado', pedidos: 60, vendas: 'R$ 2.690', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 26, nome: 'Abigail Turner', status: 'Ativo', pedidos: 21, vendas: 'R$ 1.320', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 27, nome: 'Jack Phillips', status: 'Ativo', pedidos: 66, vendas: 'R$ 3.400', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 28, nome: 'Lucas Campbell', status: 'Bloqueado', pedidos: 11, vendas: 'R$ 500', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 29, nome: 'Lily Evans', status: 'Ativo', pedidos: 95, vendas: 'R$ 4.300', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 30, nome: 'Daniel Cooper', status: 'Bloqueado', pedidos: 47, vendas: 'R$ 2.200', foto: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }
  ];
  

interface FilterButtonProps {
  active: boolean;
}

interface Cliente {
    id: number;
    nome: string;
    status: string;
    pedidos: number;
    vendas: string;  // Adicionada a propriedade 'vendas'
    foto: string;    // Adicionada a propriedade 'foto'
  }

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 10px;
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 700px;
  height: 40px;
  margin-right: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: box-shadow 0.3s;

  &:focus {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ffcc00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddClientButton = styled(Button)`
  background-color: #ff0000;
  color: white;
`;


const FilterButton = styled.button<FilterButtonProps>`
  background-color: ${(props) => (props.active ? '#ffcc00' : '#f0f0f0')};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props) => (props.active ? 'black' : '#666')};
`;

const FilterIconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  color: black;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div<{ selected: boolean }>`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  border: 2px solid ${(props) => (props.selected ? '#007bff' : 'transparent')};
  transition: border-color 0.3s ease;
`;

const ClientName = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const ClientStatus = styled.span<{ status: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: ${(props) => (props.status === 'Ativo' ? '#fff7e6' : '#f8d7da')};
  color: ${(props) => (props.status === 'Ativo' ? '#b8860b' : '#721c24')};
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.status === 'Ativo' ? '#ffdd99' : '#f5c6cb')};
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;  // Alinha o texto à esquerda e os botões à direita
  align-items: center;
`;

const PageInfo = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-right: auto;  // Isso garante que o texto "Mostrando X de Y" vá para a esquerda
`;

const PageNumber = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#b8860b' : 'white')};  // Cor do botão ativo
  border: 1px solid #b8860b;  // Borda padrão
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;  // Botão quadrado
  margin: 0 5px;
  color: ${(props) => (props.active ? 'white' : '#b8860b')};  // Cor de texto no botão
`;

const ArrowButton = styled.button`
  background-color: white;
  border: 1px solid #b8860b;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;  // Botão quadrado
  color: #b8860b;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  top: 10px;
  left: 10px;
`;

 
 
const ClientImage = styled.img`
  width: 50px;
  margin-bottom: 10px;
`;

 
const ClientInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const DottedDivider = styled.div`
  border-top: 1px dotted #ccc;
  margin: 10px 0;
`;

const ClientInfoItem = styled.div`
  text-align: center;
`;



const ActionMenuButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;



// Página de Clientes
const ClientesPage: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 15;
  const navigate = useNavigate()
 
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
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())  // Filtro de busca por nome
  )
  .filter((cliente) => 
    activeFilter === 'Todos' || cliente.status === activeFilter  // Filtro de status
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



  return (
    <Container>
      <Title>Listagem de Clientes</Title>
      <Breadcrumb>Dashboard {'>'} Listagem de Clientes</Breadcrumb>
      <Header>
      <SearchBar placeholder="Procurar cliente..." value={searchTerm} onChange={handleSearch} />

        <Actions>
          <Button>Exportar</Button>
          <AddClientButton>+ Adicionar</AddClientButton>
        </Actions>
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
            <ActionMenuButton  onClick={(e) => e.stopPropagation()}>
              <Menu menuButton={<FaEllipsisV />}>
                <MenuItem>Editar</MenuItem>
                <MenuItem>Ver Pedidos</MenuItem>
                <MenuItem>Imprimir Dados</MenuItem>
              </Menu>
            </ActionMenuButton>
            <ClientImage src={cliente.foto} alt={cliente.nome} />
            <ClientName onClick={() => handleClientClick(cliente.id)} style={{ cursor: 'pointer' }}>{cliente.nome}</ClientName>
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


        {/* Botão Anterior */}
        <ArrowButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          {"<"}
        </ArrowButton>

        {/* Números das páginas */}
        {Array.from({ length: totalPages }, (_, index) => (
            <PageNumber
                key={index}
                active={currentPage === index + 1} // Define a página ativa
                onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </PageNumber>
            ))}

        {/* Botão Próximo */}
        <ArrowButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          {">"}
        </ArrowButton>
      </Pagination>
    </Container>
  );
};

export default ClientesPage;
