import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { Table, Button, Pagination, InputGroup, FormControl, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";

const CuponsPage = () => {
    const [cupons, setCupons] = useState([]);
    const [filteredCupons, setFilteredCupons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editData, setEditData] = useState({});
    const [newData, setNewData] = useState({
        nomeCUPOM: "",
        tipoCUPOM: "",
        valorCUPOM: "",
        dataInicioCUPOM: "",
        dataFimCUPOM: "",
        ativoCUPOM: true
    });
    const itemsPerPage = 10;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchCupons();
    }, []);

    useEffect(() => {
        setFilteredCupons(
            cupons.filter((cupom) =>
                cupom.nomeCUPOM.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, cupons]);

    const fetchCupons = async () => {
        try {
            const response = await axios.get("http://192.168.15.35:8000/api/cupons", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCupons(response.data || []);
        } catch (error) {
            console.error("Erro ao buscar cupons:", error);
        }
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const openEditModal = (data) => {
        setEditData(data);
        setShowEditModal(true);
    };

    const openAddModal = () => setShowAddModal(true);

    const closeModal = () => {
        setShowEditModal(false);
        setShowAddModal(false);
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                nomeCUPOM: editData.nomeCUPOM,
                tipoCUPOM: editData.tipoCUPOM,
                valorCUPOM: editData.valorCUPOM,
                dataInicioCUPOM: editData.dataInicioCUPOM,
                dataFimCUPOM: editData.dataFimCUPOM,
                ativoCUPOM: editData.ativoCUPOM,
            };

            await axios.put(`http://192.168.15.35:8000/api/cupons/${editData.codigoCUPOM}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCupons();
            closeModal();
            Swal.fire("Salvo!", "As alterações foram salvas com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
        }
    };

    const handleAddCupom = async () => {
        try {
            await axios.post("http://192.168.15.35:8000/api/cupons", newData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCupons();
            closeModal();
            Swal.fire("Adicionado!", "Novo cupom foi adicionado com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao adicionar cupom:", error);
        }
    };

    const handleDelete = async (codigoCUPOM) => {
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
                    await axios.delete(`http://192.168.15.35:8000/api/cupons/${codigoCUPOM}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    fetchCupons();
                    Swal.fire("Excluído!", "O cupom foi excluído.", "success");
                } catch (error) {
                    console.error("Erro ao excluir cupom:", error);
                }
            }
        });
    };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedCupons = filteredCupons.slice(startIndex, startIndex + itemsPerPage);

        return paginatedCupons.map((cupom) => (
            <tr key={cupom.codigoCUPOM}>
                <td>{cupom.nomeCUPOM}</td>
                <td>{cupom.tipoCUPOM}</td>
                <td>{parseFloat(cupom.valorCUPOM).toFixed(2)}</td>
                <td>{format(new Date(cupom.dataInicioCUPOM), "dd/MM/yyyy")}</td>
                <td>{format(new Date(cupom.dataFimCUPOM), "dd/MM/yyyy")}</td>
                <td>
                    <Button variant="link" size="sm" onClick={() => openEditModal(cupom)} style={{ color: "#6b7280" }}>
                        <FaEdit />
                    </Button>
                    <Button variant="link" size="sm" onClick={() => handleDelete(cupom.codigoCUPOM)} style={{ color: "#6b7280" }}>
                        <FaTrash />
                    </Button>
                </td>
            </tr>
        ));
    };

    return (
        <React.Fragment>
            <BreadcrumbItem mainTitle="Listagem de Cupons" subTitle="Cupons" />
            <div className="d-flex justify-content-between align-items-center my-3">
                <InputGroup style={{ maxWidth: "250px" }}>
                    <FormControl
                        placeholder="Buscar por Nome do Cupom"
                        aria-label="Buscar por Nome do Cupom"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Text style={{ backgroundColor: "#f1f1f1" }}>
                        <i className="bi bi-search" style={{ color: "#D02626" }}></i>
                    </InputGroup.Text>
                </InputGroup>
                <Button style={{ backgroundColor: "#D02626", borderColor: "#D02626", fontFamily: "Public Sans", borderRadius: 8 }} onClick={openAddModal}>
                    + Novo Cupom
                </Button>
            </div>
            <Table bordered hover responsive style={{ fontFamily: "Public Sans", backgroundColor: "#ffffff" }}>
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>TIPO</th>
                        <th>VALOR</th>
                        <th>DATA INÍCIO</th>
                        <th>DATA FIM</th>
                        <th>AÇÃO</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
                <div>Mostrando {itemsPerPage} de {filteredCupons.length}</div>
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ color: "#D02626" }}
                    />
                    {Array.from({ length: Math.ceil(filteredCupons.length / itemsPerPage) }, (_, index) => (
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
                        disabled={currentPage === Math.ceil(filteredCupons.length / itemsPerPage)}
                        style={{ color: "#D02626" }}
                    />
                </Pagination>
            </div>

            {/* Modal de Edição */}
            <Modal show={showEditModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cupom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input type="text" className="form-control" value={editData.nomeCUPOM} onChange={(e) => setEditData({ ...editData, nomeCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo</label>
                            <input type="text" className="form-control" value={editData.tipoCUPOM} onChange={(e) => setEditData({ ...editData, tipoCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor</label>
                            <input type="number" className="form-control" value={editData.valorCUPOM} onChange={(e) => setEditData({ ...editData, valorCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data de Início</label>
                            <input type="date" className="form-control" value={editData.dataInicioCUPOM} onChange={(e) => setEditData({ ...editData, dataInicioCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data de Fim</label>
                            <input type="date" className="form-control" value={editData.dataFimCUPOM} onChange={(e) => setEditData({ ...editData, dataFimCUPOM: e.target.value })} />
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

            {/* Modal de Adição de Cupom */}
            <Modal show={showAddModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Cupom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input type="text" className="form-control" value={newData.nomeCUPOM} onChange={(e) => setNewData({ ...newData, nomeCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo</label>
                            <input type="text" className="form-control" value={newData.tipoCUPOM} onChange={(e) => setNewData({ ...newData, tipoCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Valor</label>
                            <input type="number" className="form-control" value={newData.valorCUPOM} onChange={(e) => setNewData({ ...newData, valorCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data de Início</label>
                            <input type="date" className="form-control" value={newData.dataInicioCUPOM} onChange={(e) => setNewData({ ...newData, dataInicioCUPOM: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Data de Fim</label>
                            <input type="date" className="form-control" value={newData.dataFimCUPOM} onChange={(e) => setNewData({ ...newData, dataFimCUPOM: e.target.value })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" style={{ backgroundColor: "#D02626", borderColor: "#D02626" }} onClick={handleAddCupom}>
                        Adicionar Cupom
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default CuponsPage;
