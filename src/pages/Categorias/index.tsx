import React from "react";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton, Pagination, Box } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CategoriasPage = () => {
    const categorias = [
        { id: 1, nome: "Camiseta", dataCriacao: "01 Março 2024" },
        { id: 2, nome: "Camiseta", dataCriacao: "25 Fevereiro 2024" },
        { id: 3, nome: "Camiseta", dataCriacao: "01 Fevereiro 2024" },
        { id: 4, nome: "Camiseta", dataCriacao: "01 Fevereiro 2024" },
        { id: 5, nome: "Camiseta", dataCriacao: "13 Janeiro 2024" },
        { id: 6, nome: "Camiseta", dataCriacao: "12 Dezembro 2023" },
    ];
        const navigate = useNavigate();
    
        const handleNewCategoryClick = () => {
            navigate('/add-categorie');
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
                                            src="https://via.placeholder.com/30"
                                            alt="Categoria"
                                            style={{ marginRight: '10px', borderRadius: '50%' }}
                                        />
                                        {categoria.nome}
                                    </Box>
                                </TableCell>
                                <TableCell>{categoria.dataCriacao}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" aria-label="view">
                                        <Visibility />
                                    </IconButton>
                                    <IconButton color="secondary" aria-label="edit">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" aria-label="delete">
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
        </Box>
    );
};

export default CategoriasPage;