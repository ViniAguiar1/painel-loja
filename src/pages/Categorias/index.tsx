import React, { useState, useEffect } from "react";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton, Pagination, Box, Modal } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const navigate = useNavigate();

    const carregaCategorias = () => {
        const token = localStorage.getItem("token");
        
        fetch("https://api.spartacusprimetobacco.com.br/api/categorias", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((result) => {
            const mappedCategorias = result.map((categoria) => ({
                id: categoria.codigoCATEGORIA,
                name: categoria.nomeCATEGORIA,
                image: categoria.imagemCATEGORIA,
            }));
            setCategorias(mappedCategorias);
        })
        .catch((error) => console.error(error));
    };

    useEffect(() => {
        carregaCategorias();
    }, []);

    const handleNewCategoryClick = () => {
        navigate('/add-categorie');
    };

    const handleDeleteCategory = (id) => {
        const token = localStorage.getItem("token");

        fetch(`https://api.spartacusprimetobacco.com.br/api/categorias/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                setCategorias(categorias.filter((categoria) => categoria.id !== id));
            } else {
                console.error("Erro ao excluir a categoria");
            }
        })
        .catch((error) => console.error(error));
    };

    const handleEditCategory = (categoria) => {
        setCategoriaSelecionada(categoria);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCategoriaSelecionada(null);
    };

    const handleSaveCategory = () => {
        const token = localStorage.getItem("token");

        fetch(`https://api.spartacusprimetobacco.com.br/api/categorias/${categoriaSelecionada.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ nomeCATEGORIA: categoriaSelecionada.name })
        })
        .then((response) => {
            if (response.ok) {
                setCategorias(categorias.map((categoria) =>
                    categoria.id === categoriaSelecionada.id
                        ? { ...categoria, name: categoriaSelecionada.name }
                        : categoria
                ));
                handleCloseModal();
            } else {
                console.error("Erro ao atualizar a categoria");
            }
        })
        .catch((error) => console.error(error));
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <BreadcrumbItem mainTitle="Dashboard" subTitle="Categoria de Produtos" />
            
            <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
                <TextField variant="outlined" label="Buscar categoria" size="small" />
                <Button variant="contained" color="error" size="large" onClick={handleNewCategoryClick}>+ Nova Categoria</Button>
            </Box>
            
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Data de Criação</TableCell>
                            <TableCell align="center">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <img
                                            src={categoria.image || "https://via.placeholder.com/30"}
                                            alt="Categoria"
                                            style={{ marginRight: '10px', borderRadius: '50%', width: 50, height: 50 }}
                                        />
                                        {categoria.name}
                                    </Box>
                                </TableCell>
                                <TableCell>{categoria.dataCriacao || "Data não disponível"}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="default" aria-label="view">
                                        <Visibility />
                                    </IconButton>
                                    <IconButton color="default" aria-label="edit" onClick={() => handleEditCategory(categoria)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="default" aria-label="delete" onClick={() => handleDeleteCategory(categoria.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Box display="flex" justifyContent="center" mt={3}>
                <Pagination count={2} color="primary" />
            </Box>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ padding: '20px', backgroundColor: 'white', margin: 'auto', mt: 5, width: 400, borderRadius: 2 }}>
                    <h2>Editar Categoria</h2>
                    <TextField
                        fullWidth
                        label="Nome da Categoria"
                        value={categoriaSelecionada ? categoriaSelecionada.name : ""}
                        onChange={(e) => setCategoriaSelecionada({ ...categoriaSelecionada, name: e.target.value })}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSaveCategory}>Salvar</Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default CategoriasPage;
