import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, Modal } from "react-bootstrap";
import axios from "axios";

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
  background-color: #bf9000;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: #bf9000;
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
  const [configuracoes, setConfiguracoes] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchConfiguracoes = async () => {
      try {
        const response = await axios.get("https://api.spartacusprimetobacco.com.br/api/configuracoes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setConfiguracoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("https://api.spartacusprimetobacco.com.br/api/usuarios", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const usuariosFiltrados = response.data.filter(user => user.tipoUSUARIO !== 6);
        setUsuarios(usuariosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchConfiguracoes();
    fetchUsuarios();
  }, []);

  const totalPages = Math.ceil(usuarios.length / itemsPerPage);
  const currentData = usuarios.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleModalOpen = () => {
    setFormData(configuracoes);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://api.spartacusprimetobacco.com.br/api/configuracoes/${configuracoes.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setConfiguracoes(formData);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error);
    }
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
            <Input type="text" value={configuracoes.nomeConfiguracoes || "SPARTACUS"} readOnly />
          </InputGroup>
          <ColorPickerContainer>
            <ColorPickerLabel>Cor do sistema</ColorPickerLabel>
            <ColorPicker style={{ backgroundColor: configuracoes.corConfiguracoes || "#BF9000" }} />
          </ColorPickerContainer>
          <InputGroup>
            <Label>Chave API</Label>
            <Input type="text" value={configuracoes.key_payConfiguracoes || ""} readOnly />
          </InputGroup>
          <InputGroup>
            <Label>Telegram</Label>
            <Input type="text" value={configuracoes.supportConfiguracoes || ""} readOnly />
          </InputGroup>
          <ButtonContainer>
            <Button onClick={handleModalOpen}>Atualizar</Button>
          </ButtonContainer>
        </FormSection>

        <SectionTitle>Histórico de Acesso</SectionTitle>
        <Table>
          <thead>
            <tr>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Telefone</TableHeader>
              <TableHeader>Localização</TableHeader>
              <TableHeader>Último Login</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentData.map((usuario) => (
              <TableRow key={usuario.codigoUSUARIO}>
                <TableCell>
                  <img
                    src={usuario.imagemUSUARIO}
                    alt="Avatar"
                    style={{ marginRight: "10px", borderRadius: "50%", width: 50, height: 50 }}
                  />
                  {usuario.nomeUSUARIO}
                </TableCell>
                <TableCell>{usuario.emailUSUARIO}</TableCell>
                <TableCell>{usuario.telefoneUSUARIO}</TableCell>
                <TableCell>{usuario.localizacaoUSUARIO}</TableCell>
                <TableCell>{new Date(usuario.logUSUARIO).toLocaleString()}</TableCell>
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

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Configurações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Label>Nome do sistema</Label>
            <Input
              type="text"
              name="nomeConfiguracoes"
              value={formData.nomeConfiguracoes || ""}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>Cor do sistema</Label>
            <Input
              type="text"
              name="corConfiguracoes"
              value={formData.corConfiguracoes || ""}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>Chave API</Label>
            <Input
              type="text"
              name="key_payConfiguracoes"
              value={formData.key_payConfiguracoes || ""}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>Telegram</Label>
            <Input
              type="text"
              name="supportConfiguracoes"
              value={formData.supportConfiguracoes || ""}
              onChange={handleInputChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdate}>Salvar</Button>
          <Button onClick={handleModalClose}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ConfiguracoesPage;
