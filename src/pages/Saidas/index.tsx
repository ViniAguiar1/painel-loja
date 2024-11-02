import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faBan } from '@fortawesome/free-solid-svg-icons';

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
  cursor: not-allowed;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.5;
  display: flex;
  align-items: center;
  gap: 8px;
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

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f5f7fa;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  color: #666;
`;

const StyledDatePicker = styled(DatePicker)`
  border: none;
  background: transparent;
  font-size: 14px;
  color: #666;
  outline: none;
  width: 80px;

  &::placeholder {
    color: #aaa;
  }
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
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/lancamentos');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar as despesas:', error);
      }
    };
    fetchExpenses();
  }, []);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.datacriacaoLANCAMENTO);
    const isWithinDateRange = startDate && endDate ? itemDate >= startDate && itemDate <= endDate : true;
    const isMatchSearchTerm = item.nomeLANCAMENTO.toLowerCase().includes(searchTerm.toLowerCase());
    return isMatchSearchTerm && isWithinDateRange;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Container>
      <Header>Saídas</Header>
      <SubHeader>
        <div><p style={{ color: '#353535', fontWeight: 500, fontSize: 20 }}>Despesas</p></div>
        <ActionsContainer>
          <Button disabled>
            <FontAwesomeIcon icon={faBan} />
            Ver gráfico
          </Button>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Buscar por nome"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <DateRangeContainer>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <StyledDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Início"
            />
            <span>–</span>
            <StyledDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Fim"
            />
          </DateRangeContainer>
        </ActionsContainer>
      </SubHeader>
      <Total>Total de despesas</Total>
      <Table>
        <thead>
          <tr>
            <TableHeader>Despesa</TableHeader>
            <TableHeader>Preço</TableHeader>
            <TableHeader>Data</TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <TableRow key={item.codigoLANCAMENTO}>
              <TableCell>
                <img src="https://via.placeholder.com/50" alt="Despesa" style={{ marginRight: '10px', width: 50, height: 50 }} />
                {item.nomeLANCAMENTO}
              </TableCell>
              <TableCell>R$ {parseFloat(item.precoLANCAMENTO).toFixed(2)}</TableCell>
              <TableCell>{new Date(item.datacriacaoLANCAMENTO).toLocaleDateString()}</TableCell>
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
