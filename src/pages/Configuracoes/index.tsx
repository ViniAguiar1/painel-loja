import React, { useState } from "react";
import styled from "styled-components";
// import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { Breadcrumb } from "react-bootstrap";

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #353535;
  margin-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f5f7fa;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
`;

const ColorPickerLabel = styled(Label)`
  margin-bottom: 5px;
`;

const ColorPicker = styled.div`
  width: 40px;
  height: 40px;
  background-color: #BF9000;
  border-radius: 5px;
//   margin-top: 8px;
`;

const ButtonContainer = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #BF9000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #a68000;
  }
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

const ConfiguracoesPage = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const data = Array.from({ length: 35 }, (_, index) => ({
    usuario: `Nome do Usuário ${index + 1}`,
    horario: "14:00",
    data: "15/10/21",
  }));

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
       <div>
                    <h2>Configurações</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Configurações</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
      <Container>
        <SectionTitle>Informações do Sistema</SectionTitle>
        <FormSection>
          <InputGroup>
            <Label>Nome do sistema</Label>
            <Input type="text" placeholder="SPARTACUS" />
          </InputGroup>
          <ColorPickerContainer>
            <ColorPickerLabel>Cor do sistema</ColorPickerLabel>
            <ColorPicker />
          </ColorPickerContainer>
          <InputGroup>
            <Label>Chave API</Label>
            <Input type="text" placeholder="Smartwatch E2" />
          </InputGroup>
          <InputGroup>
            <Label>Telegram</Label>
            <Input type="text" placeholder="Smartwatch E2" />
          </InputGroup>
          <ButtonContainer>
            <Button>Atualizar</Button>
          </ButtonContainer>
        </FormSection>

        <SectionTitle>Histórico de Acesso</SectionTitle>
        <Table>
          <thead>
            <tr>
              <TableHeader>Usuário</TableHeader>
              <TableHeader>Horário</TableHeader>
              <TableHeader>Data</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                    alt="Avatar"
                    style={{ marginRight: "10px", borderRadius: "50%", width: 50, height: 50 }}
                  />
                  {item.usuario}
                </TableCell>
                <TableCell>{item.horario}</TableCell>
                <TableCell>{item.data}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      </Container>
    </React.Fragment>
  );
};

export default ConfiguracoesPage;
