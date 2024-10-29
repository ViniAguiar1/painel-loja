import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import BreadcrumbItem from "../../Common/BreadcrumbItem";

const PageContainer = styled.div`
    background-color: #f7f8fa;
    min-height: 100vh;
    padding: 20px;
`;

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

const NewAvisoButton = styled.button`
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

const AvisosGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const AvisoCard = styled.div`
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
    margin-top: 0;
    font-size: 1.2em;
`;

const Description = styled.p`
    margin: 5px 0;
    color: #555;
    font-size: 0.9em;
`;

const DateText = styled.p`
    font-weight: bold;
    font-size: 0.9em;
    color: #777;
`;

const IconsContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #333;
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

const Notification = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4BB543;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-size: 1em;
    z-index: 1001;
`;

const AvisosPage = () => {
    const [avisos, setAvisos] = useState([
        {
            id: 1,
            title: "Aviso 1",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            date: "12 Jan 2024"
        },
        {
            id: 2,
            title: "Aviso 2",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            date: "03 Fev 2024"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [currentAvisoId, setCurrentAvisoId] = useState(null);
    const [newAvisoTitle, setNewAvisoTitle] = useState("");
    const [newAvisoDescription, setNewAvisoDescription] = useState("");
    const [notificationVisible, setNotificationVisible] = useState(false);

    const handleAddAviso = () => {
        const newAviso = {
            id: Date.now(),
            title: newAvisoTitle,
            description: newAvisoDescription,
            date: format(new Date(), "dd MMM yyyy", { locale: ptBR })
        };

        setAvisos([...avisos, newAviso]);
        closeModal();
        showNotification();
    };

    const handleEditAviso = () => {
        setAvisos(
            avisos.map(aviso =>
                aviso.id === currentAvisoId
                    ? { ...aviso, title: newAvisoTitle, description: newAvisoDescription }
                    : aviso
            )
        );
        closeModal();
        showNotification("Aviso editado com sucesso!");
    };

    const handleDeleteAviso = (id) => {
        setAvisos(avisos.filter(aviso => aviso.id !== id));
        showNotification("Aviso excluído com sucesso!");
    };

    const openModal = (isEdit = false, aviso = null) => {
        setIsEditModal(isEdit);
        setIsModalOpen(true);
        if (isEdit && aviso) {
            setCurrentAvisoId(aviso.id);
            setNewAvisoTitle(aviso.title);
            setNewAvisoDescription(aviso.description);
        } else {
            setNewAvisoTitle("");
            setNewAvisoDescription("");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModal(false);
        setNewAvisoTitle("");
        setNewAvisoDescription("");
    };

    const showNotification = (message = "Aviso adicionado com sucesso!") => {
        setNotificationVisible(message);
        setTimeout(() => setNotificationVisible(false), 3000);
    };

    return (
        <PageContainer>
            <BreadcrumbItem mainTitle="" subTitle="Avisos Gerais" />
            <Container>
                <NewAvisoButton onClick={() => openModal()}>+ Novo Aviso</NewAvisoButton>
                <AvisosGrid>
                    {avisos.map((aviso) => (
                        <AvisoCard key={aviso.id}>
                            <IconsContainer>
                                <IconButton onClick={() => openModal(true, aviso)}>
                                    <FiEdit />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteAviso(aviso.id)}>
                                    <FiTrash />
                                </IconButton>
                            </IconsContainer>
                            <Title>{aviso.title}</Title>
                            <Description>{aviso.description}</Description>
                            <DateText>Data: {aviso.date}</DateText>
                        </AvisoCard>
                    ))}
                </AvisosGrid>
            </Container>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <CloseButton onClick={closeModal}>
                            <IoMdClose />
                        </CloseButton>
                        <ModalTitle>{isEditModal ? "Editar Aviso" : "Criar Aviso Novo"}</ModalTitle>
                        <Input
                            type="text"
                            placeholder="Inclua o título do aviso"
                            value={newAvisoTitle}
                            onChange={(e) => setNewAvisoTitle(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Inclua a mensagem"
                            value={newAvisoDescription}
                            onChange={(e) => setNewAvisoDescription(e.target.value)}
                        />
                        <ButtonContainer>
                            <CancelButton onClick={closeModal}>Cancelar</CancelButton>
                            <AddButton onClick={isEditModal ? handleEditAviso : handleAddAviso}>
                                {isEditModal ? "Salvar" : "Adicionar"}
                            </AddButton>
                        </ButtonContainer>
                    </ModalContent>
                </ModalOverlay>
            )}

            {notificationVisible && (
                <Notification>{notificationVisible}</Notification>
            )}
        </PageContainer>
    );
};

export default AvisosPage;
