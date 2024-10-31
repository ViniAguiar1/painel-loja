import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import axios from "axios";

const PageContainer = styled.div` min-height: 100vh; padding: 20px; `;
const Container = styled.div` max-width: 900px; margin: 0 auto; `;
const NewAvisoButton = styled.button` background-color: #D02626; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-bottom: 20px; height: 2.5rem; `;
const AvisosGrid = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; `;
const AvisoCard = styled.div` background-color: #FFFFFF; padding: 20px; border-radius: 8px; position: relative; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); `;
const Title = styled.h3` margin-top: 0; font-size: 1.2em; `;
const Description = styled.p` margin: 5px 0; color: #555; font-size: 0.9em; `;
const DateText = styled.p` font-weight: bold; font-size: 0.9em; color: #777; `;
const IconsContainer = styled.div` position: absolute; top: 10px; right: 10px; display: flex; gap: 10px; `;
const IconButton = styled.button` background: none; border: none; font-size: 18px; cursor: pointer; color: #333; `;
const ModalOverlay = styled.div` position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; `;
const ModalContent = styled.div` background: white; padding: 20px; width: 400px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); position: relative; `;
const ModalTitle = styled.h2` margin-top: 0; font-size: 1.5em; `;
const CloseButton = styled.button` background: none; border: none; position: absolute; top: 10px; right: 10px; font-size: 20px; cursor: pointer; color: #555; `;
const Input = styled.input` width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; font-size: 1em; `;
const ButtonContainer = styled.div` display: flex; justify-content: flex-end; gap: 10px; `;
const CancelButton = styled.button` background-color: white; color: #D02626; border: 1px solid #D02626; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1em; `;
const AddButton = styled.button` background-color: #D02626; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1em; `;
const Notification = styled.div` position: fixed; top: 20px; right: 20px; background-color: #4BB543; color: white; padding: 10px 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); font-size: 1em; z-index: 1001; `;

interface Aviso {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
}

const AvisosPage = () => {
    const [avisos, setAvisos] = useState<Aviso[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [currentAvisoId, setCurrentAvisoId] = useState<number | null>(null);
    const [newAvisoTitle, setNewAvisoTitle] = useState("");
    const [newAvisoDescription, setNewAvisoDescription] = useState("");
    const [newAvisoImage, setNewAvisoImage] = useState("");
    const [notificationVisible, setNotificationVisible] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAvisos = async () => {
            try {
                const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/notificacoes', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const avisosData = response.data.map((notificacao: any) => ({
                    id: notificacao.codigoNOTIFICACAO, // Usando codigoNOTIFICACAO como id principal
                    title: notificacao.tituloNOTIFICACAO,
                    description: notificacao.corpoNOTIFICACAO,
                    date: format(new Date(notificacao.dataNOTIFICACAO), "dd MMM yyyy", { locale: ptBR }),
                    image: notificacao.imagemNOTIFICACAO,
                }));
                setAvisos(avisosData);
            } catch (error) {
                console.error("Erro ao buscar avisos:", error);
            }
        };

        fetchAvisos();
    }, [token]);

    const handleAddAviso = async () => {
        const newAviso = {
            tituloNOTIFICACAO: newAvisoTitle,
            corpoNOTIFICACAO: newAvisoDescription,
            dataNOTIFICACAO: new Date().toISOString(),
            imagemNOTIFICACAO: newAvisoImage,
            ativoNOTIFICACAO: true
        };

        try {
            const response = await axios.post('https://api.spartacusprimetobacco.com.br/api/notificacoes', newAviso, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const addedAviso = response.data;
            setAvisos([...avisos, {
                id: addedAviso.codigoNOTIFICACAO,
                title: addedAviso.tituloNOTIFICACAO,
                description: addedAviso.corpoNOTIFICACAO,
                date: format(new Date(addedAviso.dataNOTIFICACAO), "dd MMM yyyy", { locale: ptBR }),
                image: addedAviso.imagemNOTIFICACAO
            }]);
            closeModal();
            showNotification("Aviso adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar aviso:", error);
        }
    };

    const handleEditAviso = async () => {
        const updatedAviso = {
            tituloNOTIFICACAO: newAvisoTitle,
            corpoNOTIFICACAO: newAvisoDescription,
            dataNOTIFICACAO: new Date().toISOString(),
            imagemNOTIFICACAO: newAvisoImage,
            ativoNOTIFICACAO: true
        };

        try {
            await axios.put(`https://api.spartacusprimetobacco.com.br/api/notificacoes/${currentAvisoId}`, updatedAviso, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAvisos(
                avisos.map(aviso =>
                    aviso.id === currentAvisoId
                        ? { ...aviso, title: newAvisoTitle, description: newAvisoDescription, image: newAvisoImage }
                        : aviso
                )
            );
            closeModal();
            showNotification("Aviso editado com sucesso!");
        } catch (error) {
            console.error("Erro ao editar aviso:", error);
        }
    };

    const handleDeleteAviso = async (id: number) => {
        try {
            await axios.delete(`https://api.spartacusprimetobacco.com.br/api/notificacoes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAvisos(avisos.filter(aviso => aviso.id !== id));
            showNotification("Aviso excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir aviso:", error);
        }
    };

    const openModal = (isEdit = false, aviso: Aviso | null = null) => {
        setIsEditModal(isEdit);
        setIsModalOpen(true);
        if (isEdit && aviso) {
            setCurrentAvisoId(aviso.id);
            setNewAvisoTitle(aviso.title);
            setNewAvisoDescription(aviso.description);
            setNewAvisoImage(aviso.image);
        } else {
            setNewAvisoTitle("");
            setNewAvisoDescription("");
            setNewAvisoImage("");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModal(false);
        setNewAvisoTitle("");
        setNewAvisoDescription("");
        setNewAvisoImage("");
    };

    const showNotification = (message: string) => {
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
                            {aviso.image && <img src={aviso.image} alt={aviso.title} style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }} />}
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
