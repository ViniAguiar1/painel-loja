import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const PageContainer = styled.div`
    min-height: 100vh;
    padding: 20px;
`;

const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`;

const NewStaffButton = styled.button`
    background-color: #D02626;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
    height: 2.5rem;
`;

const StaffTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHead = styled.thead`
    background-color: #f8f9fa;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #f1f1f1;
`;

const TableCell = styled.td`
    padding: 15px;
    text-align: left;
    font-size: 1em;
`;

const IconsContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #6b7280;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    background: ${({ active }) => (active ? "#D02626" : "transparent")};
    color: ${({ active }) => (active ? "#fff" : "#D02626")};
    border: 1px solid #D02626;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const ModalTitle = styled.h2`
    margin-top: 0;
    font-size: 1.5em;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const CancelButton = styled.button`
    background-color: white;
    color: #D02626;
    border: 1px solid #D02626;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
`;

const AddButton = styled.button`
    background-color: #D02626;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
`;

const Staff = () => {
    const initialStaffs = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Staff ${i + 1}`
    }));

    const [staffs, setStaffs] = useState(initialStaffs);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [currentStaffId, setCurrentStaffId] = useState(null);
    const [newStaffName, setNewStaffName] = useState("");

    const itemsPerPage = 10;
    const filteredStaffs = staffs.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);
    const paginatedStaffs = filteredStaffs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const openModal = (isEdit = false, staff = null) => {
        setIsEditModal(isEdit);
        setIsModalOpen(true);
        if (isEdit && staff) {
            setCurrentStaffId(staff.id);
            setNewStaffName(staff.name);
        } else {
            setNewStaffName("");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModal(false);
        setNewStaffName("");
    };

    const handleAddStaff = () => {
        const newStaff = { id: Date.now(), name: newStaffName };
        setStaffs([...staffs, newStaff]);
        closeModal();
        Swal.fire("Adicionado!", "Novo staff foi adicionado com sucesso.", "success");
    };

    const handleEditStaff = () => {
        setStaffs(
            staffs.map(staff =>
                staff.id === currentStaffId ? { ...staff, name: newStaffName } : staff
            )
        );
        closeModal();
        Swal.fire("Atualizado!", "Staff foi atualizado com sucesso.", "success");
    };

    const handleDeleteStaff = (id) => {
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
                setStaffs(staffs.filter(staff => staff.id !== id));
                Swal.fire("Excluído!", "O staff foi excluído.", "success");
            }
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <PageContainer>
            {/* <BreadcrumbItem mainTitle="Staffs" subTitle="Staffs" /> */}
            <h1 style={{ fontFamily: 'Public Sans', color: '#23272E', fontWeight: 700}}>Staffs</h1>
            <Container>
                <div className="d-flex justify-content-between align-items-center my-3">
                    <input
                        type="text"
                        placeholder="Buscar por nome"
                        className="form-control"
                        style={{ maxWidth: "250px", marginBottom: "20px" }}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <NewStaffButton onClick={() => openModal()}>+ Novo Staff</NewStaffButton>
                </div>
                <StaffTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <tbody>
                        {paginatedStaffs.map(staff => (
                            <TableRow key={staff.id}>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>
                                    <IconsContainer>
                                        <IconButton onClick={() => openModal(true, staff)}>
                                            <FiEdit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteStaff(staff.id)}>
                                            <FiTrash />
                                        </IconButton>
                                    </IconsContainer>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </StaffTable>
                <PaginationContainer>
                    <div>Mostrando {paginatedStaffs.length} de {filteredStaffs.length}</div>
                    <div>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationButton
                                key={i + 1}
                                active={i + 1 === currentPage}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </PaginationButton>
                        ))}
                    </div>
                </PaginationContainer>
            </Container>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <CloseButton onClick={closeModal}>
                            <IoMdClose />
                        </CloseButton>
                        <ModalTitle>{isEditModal ? "Editar Staff" : "Novo Staff"}</ModalTitle>
                        <Input
                            type="text"
                            placeholder="Nome do staff"
                            value={newStaffName}
                            onChange={(e) => setNewStaffName(e.target.value)}
                        />
                        <ButtonContainer>
                            <CancelButton onClick={closeModal}>Cancelar</CancelButton>
                            <AddButton onClick={isEditModal ? handleEditStaff : handleAddStaff}>
                                {isEditModal ? "Salvar Alterações" : "Adicionar"}
                            </AddButton>
                        </ButtonContainer>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default Staff;
