import React, { useState, useEffect } from "react";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { Table, Button, Pagination, InputGroup, FormControl, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";

const FretesPage = () => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    const itemsPerPage = 10;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get("https://api.spartacusprimetobacco.com.br/api/localizacoes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLocations(response.data);
        } catch (error) {
            console.error("Erro ao buscar localizações:", error);
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const openEditModal = (data) => {
        setEditData(data);
        setShowEditModal(true);
    };

    const closeModal = () => setShowEditModal(false);

    const handleSave = async () => {
        try {
            const updatedData = {
                localizacao: editData.localizacao,
                preco: parseFloat(editData.preco),
                datacriacao: editData.datacriacao,
                cepinicialdatacriacao: editData.cepinicialdatacriacao,
                cepfinaldatacriacao: editData.cepfinaldatacriacao,
                ativo: editData.ativo,
            };

            await axios.put(`https://api.spartacusprimetobacco.com.br/api/localizacoes/${editData.codigo}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchLocations();
            closeModal();
            Swal.fire("Salvo!", "As alterações foram salvas com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
        }
    };

    const handleDelete = async (codigo) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#D02626",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://api.spartacusprimetobacco.com.br/api/localizacoes/${codigo}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    fetchLocations();
                    Swal.fire("Excluído!", "O registro foi excluído.", "success");
                } catch (error) {
                    console.error("Erro ao excluir registro:", error);
                }
            }
        });
    };

    const handleAddLocation = async () => {
        const newLocation = {
            localizacao: "Nova Localidade",
            preco: 50,
            datacriacao: new Date().toISOString().split("T")[0],
            cepinicialdatacriacao: "01000-000",
            cepfinaldatacriacao: "02000-000",
            ativo: true
        };

        try {
            await axios.post("https://api.spartacusprimetobacco.com.br/api/localizacoes", newLocation, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchLocations();
            Swal.fire("Adicionado!", "Nova localização foi adicionada com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao adicionar localização:", error);
        }
    };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedLocations = locations.slice(startIndex, startIndex + itemsPerPage);

        return paginatedLocations.map((location) => (
            <tr key={location.codigo}>
                <td>{location.localizacao}</td>
                <td>R$ {parseFloat(location.preco).toFixed(2)}</td>
                <td>{location.cepinicialdatacriacao}</td>
                <td>{location.cepfinaldatacriacao}</td>
                <td>{location.datacriacao}</td>
                <td>
                    <Button variant="link" size="sm" onClick={() => openEditModal(location)} style={{ color: "#6b7280" }}>
                        <FaEdit />
                    </Button>
                    <Button variant="link" size="sm" onClick={() => handleDelete(location.codigo)} style={{ color: "#6b7280" }}>
                        <FaTrash />
                    </Button>
                </td>
            </tr>
        ));
    };

    return (
        <React.Fragment>
            <BreadcrumbItem mainTitle="Listagem de Frete" subTitle="Fretes" />
            <div className="d-flex justify-content-between align-items-center my-3">
                <InputGroup style={{ maxWidth: "250px" }}>
                    <FormControl placeholder="Buscar por CEP" aria-label="Buscar por CEP" />
                    <InputGroup.Text style={{ backgroundColor: "#f1f1f1" }}>
                        <i className="bi bi-search" style={{ color: "#D02626" }}></i>
                    </InputGroup.Text>
                </InputGroup>
                <Button style={{ backgroundColor: "#D02626", borderColor: "#D02626", fontFamily: "Public Sans", borderRadius: 8 }} onClick={handleAddLocation}>
                    + Nova Localização
                </Button>
            </div>
            <Table bordered hover responsive style={{ fontFamily: "Public Sans", backgroundColor: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>LOCALIDADE</th>
                        <th>PREÇO</th>
                        <th>CEP INICIAL</th>
                        <th>CEP FINAL</th>
                        <th>DATA DE CRIAÇÃO</th>
                        <th>AÇÃO</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
                <div>Mostrando {itemsPerPage} de {locations.length}</div>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ color: "#D02626" }}
                    />
                    {Array.from({ length: Math.ceil(locations.length / itemsPerPage) }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                            style={index + 1 === currentPage ? { backgroundColor: "#D02626", color: "#fff" } : { color: "#D02626" }}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(locations.length / itemsPerPage)}
                        style={{ color: "#D02626" }}
                    />
                </Pagination>
            </div>

            {/* Modal de Edição */}
            <Modal show={showEditModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Frete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Localidade</label>
                            <input type="text" className="form-control" value={editData.localizacao} onChange={(e) => setEditData({ ...editData, localizacao: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preço</label>
                            <input type="number" className="form-control" value={editData.preco} onChange={(e) => setEditData({ ...editData, preco: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data de Criação</label>
                            <input type="date" className="form-control" value={editData.datacriacao} onChange={(e) => setEditData({ ...editData, datacriacao: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">CEP Inicial</label>
                            <input type="text" className="form-control" value={editData.cepinicialdatacriacao} onChange={(e) => setEditData({ ...editData, cepinicialdatacriacao: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">CEP Final</label>
                            <input type="text" className="form-control" value={editData.cepfinaldatacriacao} onChange={(e) => setEditData({ ...editData, cepfinaldatacriacao: e.target.value })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" style={{ backgroundColor: "#D02626", borderColor: "#D02626" }} onClick={handleSave}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default FretesPage;
