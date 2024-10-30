import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  color: #353535;
  margin-bottom: 10px;
  font-family: 'Poppins', sans-serif;
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Button = styled.button`
  background-color: #bf9000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchInput = styled.input`
  padding: 8px 12px 8px 35px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f5f7fa;
  color: #666;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #aaa;
`;

const DateButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e1e4e8;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
  color: #666;
`;

const Total = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  font-size: 14px;
  color: #333;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.active ? '#d4a200' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#666')};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 2px;
  cursor: pointer;
  font-size: 14px;
`;

const Saidas: React.FC = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Exemplo de um conjunto maior de produtos para demonstração
  const data = Array.from({ length: 100 }, (_, index) => ({
    nome: `Nome do produto ${index + 1}`,
    quantidade: Math.floor(Math.random() * 100) + 1,
    valor: 'R$ 150,00',
    valorLiquido: 'R$ 150,00',
  }));

  const filteredData = data.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reseta para a primeira página ao realizar uma nova busca
  };

  return (
    <Container>
      <Header>Saídas</Header>
      <SubHeader>
        <div><p style={{ color: '#353535', fontWeight: 500, fontSize: 20 }}>Produtos</p></div>
        <ActionsContainer>
          <Button>Ver gráfico</Button>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Buscar por nome"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <DateButton>
            <Icon icon={faCalendarAlt} />
            Selecionar data
          </DateButton>
        </ActionsContainer>
      </SubHeader>
      <Total>Total R$ 4.680</Total>
      <Table>
        <thead>
          <tr>
            <TableHeader>Produto</TableHeader>
            <TableHeader>Quantidade</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Valor Líquido</TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <img src="https://via.placeholder.com/50" alt="Produto" style={{ marginRight: '10px', width: 50, height: 50 }} />
                {item.nome}
              </TableCell>
              <TableCell>{item.quantidade}</TableCell>
              <TableCell>{item.valor}</TableCell>
              <TableCell>{item.valorLiquido}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default Saidas;
