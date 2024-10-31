import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

const PageContainer = styled.div` min-height: 100vh; padding: 20px; `;
const Container = styled.div` width: 100%; margin: 0 auto; `;
const NewLinkButton = styled.button` background-color: #D02626; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-bottom: 20px; height: 2.5rem; `;
const LinksTable = styled.table` width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); `;
const TableHead = styled.thead` background-color: #f8f9fa; `;
const TableRow = styled.tr` border-bottom: 1px solid #f1f1f1; `;
const TableCell = styled.td` padding: 15px; text-align: left; font-size: 1em; `;
const LinkCell = styled.a` color: #007bff; text-decoration: none; cursor: pointer; &:hover { text-decoration: underline; } `;
const IconsContainer = styled.div` display: flex; gap: 10px; `;
const IconButton = styled.button` background: none; border: none; font-size: 18px; cursor: pointer; color: #6b7280; `;
const PaginationContainer = styled.div` display: flex; justify-content: space-between; align-items: center; margin-top: 20px; `;
const PaginationButton = styled.button<{ active: boolean }>` background: ${({ active }) => (active ? "#D02626" : "transparent")}; color: ${({ active }) => (active ? "#fff" : "#D02626")}; border: 1px solid #D02626; padding: 5px 10px; margin: 0 5px; cursor: pointer; border-radius: 3px; `;
const ModalOverlay = styled.div` position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; `;
const ModalContent = styled.div` background: white; padding: 20px; width: 400px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); position: relative; `;
const ModalTitle = styled.h2` margin-top: 0; font-size: 1.5em; `;
const CloseButton = styled.button` background: none; border: none; position: absolute; top: 10px; right: 10px; font-size: 20px; cursor: pointer; color: #555; `;
const Input = styled.input` width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; font-size: 1em; `;
const ButtonContainer = styled.div` display: flex; justify-content: flex-end; gap: 10px; `;
const CancelButton = styled.button` background-color: white; color: #D02626; border: 1px solid #D02626; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1em; `;
const AddButton = styled.button` background-color: #D02626; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1em; `;

interface Link {
    id: number;
    name: string;
    url: string;
    date: string;
}

const LinksPage = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [currentLinkId, setCurrentLinkId] = useState<number | null>(null);
    const [newLinkName, setNewLinkName] = useState("");
    const [newLinkURL, setNewLinkURL] = useState("");
    const token = localStorage.getItem("token");
    const itemsPerPage = 3;

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/links', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const linksData = response.data.map((link: any) => ({
                id: link.idLINK,
                name: link.logLINK,
                url: link.valorLINK,
                date: new Date().toLocaleString(),
            }));
            setLinks(linksData);
        } catch (error) {
            console.error("Erro ao buscar links:", error);
        }
    };

    const openModal = (isEdit = false, link: Link | null = null) => {
        setIsEditModal(isEdit);
        setIsModalOpen(true);
        if (isEdit && link) {
            setCurrentLinkId(link.id);
            setNewLinkName(link.name);
            setNewLinkURL(link.url);
        } else {
            setNewLinkName("");
            setNewLinkURL("");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModal(false);
        setNewLinkName("");
        setNewLinkURL("");
    };

    const handleAddLink = async () => {
        const newLink = {
            valorLINK: newLinkURL,
            logLINK: newLinkName,
            ativoLINK: 1
        };

        try {
            const response = await axios.post('https://api.spartacusprimetobacco.com.br/api/links', newLink, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const addedLink = response.data;
            setLinks([
                ...links,
                {
                    id: addedLink.idLINK,
                    name: addedLink.logLINK,
                    url: addedLink.valorLINK,
                    date: new Date().toLocaleString(),
                },
            ]);
            closeModal();
            Swal.fire("Adicionado!", "Novo link foi adicionado com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao adicionar link:", error);
        }
    };

    const handleEditLink = async () => {
        const updatedLink = {
            valorLINK: newLinkURL,
            logLINK: newLinkName,
            ativoLINK: 1
        };

        try {
            await axios.put(`https://api.spartacusprimetobacco.com.br/api/links/${currentLinkId}`, updatedLink, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLinks(
                links.map(link =>
                    link.id === currentLinkId ? { ...link, name: newLinkName, url: newLinkURL } : link
                )
            );
            closeModal();
            Swal.fire("Atualizado!", "Link foi atualizado com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao editar link:", error);
        }
    };

    const handleDeleteLink = async (id: number) => {
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
                    await axios.delete(`https://api.spartacusprimetobacco.com.br/api/links/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setLinks(links.filter(link => link.id !== id));
                    Swal.fire("Excluído!", "O link foi excluído.", "success");
                } catch (error) {
                    console.error("Erro ao excluir link:", error);
                }
            }
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredLinks = links.filter(link =>
        link.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredLinks.length / itemsPerPage);
    const paginatedLinks = filteredLinks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <PageContainer>
            <h1 style={{ color: '#23272E', fontFamily: 'Public Sans', fontWeight: 700 }}>Links</h1>
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
                    <NewLinkButton onClick={() => openModal()}>+ Novo Link</NewLinkButton>
                </div>
                <LinksTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Data e Hora</TableCell>
                            <TableCell>Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <tbody>
                        {paginatedLinks.map(link => (
                            <TableRow key={link.id}>
                                <TableCell>
                                    <LinkCell href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.name}
                                    </LinkCell>
                                </TableCell>
                                <TableCell>{link.date}</TableCell>
                                <TableCell>
                                    <IconsContainer>
                                        <IconButton onClick={() => openModal(true, link)}>
                                            <FiEdit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteLink(link.id)}>
                                            <FiTrash />
                                        </IconButton>
                                    </IconsContainer>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </LinksTable>
                <PaginationContainer>
                    <div>Mostrando {paginatedLinks.length} de {filteredLinks.length}</div>
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
                        <ModalTitle>{isEditModal ? "Editar Link" : "Novo Link"}</ModalTitle>
                        <Input
                            type="text"
                            placeholder="Nome do link"
                            value={newLinkName}
                            onChange={(e) => setNewLinkName(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="URL do link"
                            value={newLinkURL}
                            onChange={(e) => setNewLinkURL(e.target.value)}
                        />
                        <ButtonContainer>
                            <CancelButton onClick={closeModal}>Cancelar</CancelButton>
                            <AddButton onClick={isEditModal ? handleEditLink : handleAddLink}>
                                {isEditModal ? "Salvar Alterações" : "Adicionar"}
                            </AddButton>
                        </ButtonContainer>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
};

export default LinksPage;
