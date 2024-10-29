import React, { useState } from "react";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { Table, Button, Pagination, InputGroup, FormControl, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";

const FretesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    const itemsPerPage = 10;
    const totalItems = 45;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleEdit = (data) => {
        setEditData(data);
        setShowEditModal(true);
    };

    const handleDelete = () => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#D02626",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Excluído!", "O registro foi excluído.", "success");
                // Aqui você pode adicionar a lógica para excluir o item
            }
        });
    };

    const handleSave = () => {
        // Lógica para salvar as alterações
        console.log("Alterações salvas:", editData);
        setShowEditModal(false);
        Swal.fire("Salvo!", "As alterações foram salvas com sucesso.", "success");
    };

    const renderTableRows = () => {
        return Array.from({ length: itemsPerPage }, (_, index) => (
            <tr key={index}>
                <td>Nome da Cidade</td>
                <td>R$ 50,00</td>
                <td>1 Jan 2024</td>
                <td>
                    <Button variant="link" size="sm" onClick={() => handleEdit({ city: "Nome da Cidade", price: "R$ 50,00", date: "1 Jan 2024" })} style={{ color: "#6b7280" }}>
                        <FaEdit />
                    </Button>
                    <Button variant="link" size="sm" onClick={handleDelete} style={{ color: "#6b7280" }}>
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
                <Button style={{ backgroundColor: "#D02626", borderColor: "#D02626", fontFamily: "Public Sans", borderRadius: 8 }}>
                    + Novo Gerente
                </Button>
            </div>
            <Table bordered hover responsive style={{ fontFamily: "Public Sans", backgroundColor: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>LOCALIDADE</th>
                        <th>PREÇO</th>
                        <th>DATA DE CRIAÇÃO</th>
                        <th>AÇÃO</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
                <div>Mostrando {itemsPerPage} de {totalItems}</div>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ color: "#D02626" }}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
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
                        disabled={currentPage === totalPages}
                        style={{ color: "#D02626" }}
                    />
                </Pagination>
            </div>

            {/* Modal de Edição */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Frete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Localidade</label>
                            <input type="text" className="form-control" defaultValue={editData.city} onChange={(e) => setEditData({ ...editData, city: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Preço</label>
                            <input type="text" className="form-control" defaultValue={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data de Criação</label>
                            <input type="text" className="form-control" defaultValue={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
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
