import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Grid, Paper } from '@mui/material';
import { Save as SaveIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Breadcrumb } from 'react-bootstrap';

// Tema personalizado
const theme = createTheme({
    palette: {
        primary: {
            main: '#d32f2f',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: 'Poppins, Arial',
    },
});

// Container para o layout completo
const PageContainer = styled.div`
    padding: 2rem;
`;

const Section = styled(Paper)`
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Typography)`
    font-weight: bold;
    color: #333;
`;

const StyledButton = styled(Button)`
    padding: 0.8rem;
    font-weight: bold;
`;

const AddProduct: React.FC = () => {
    const [productData, setProductData] = useState({
        skuPRODUTO: '',
        nomePRODUTO: '',
        descricaoPRODUTO: '',
        precoPRODUTO: '',
        quantidadePRODUTO: '',
        alertaPRODUTO: '',
        categoriaPRODUTO: '',
        imagemPRODUTO: '',
        tipoPRODUTO: '1',  // valor padrão ativo (1)
        acessoPRODUTO: '1', // valor padrão ativo (1)
        ativoPRODUTO: true,
    });
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const token = localStorage.getItem("token");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("skuPRODUTO", productData.skuPRODUTO);
        formData.append("nomePRODUTO", productData.nomePRODUTO);
        formData.append("descricaoPRODUTO", productData.descricaoPRODUTO);
        formData.append("precoPRODUTO", productData.precoPRODUTO);
        formData.append("quantidadePRODUTO", productData.quantidadePRODUTO);
        formData.append("alertaPRODUTO", productData.alertaPRODUTO);
        formData.append("categoriaPRODUTO", productData.categoriaPRODUTO);
        formData.append("imagemPRODUTO", productData.imagemPRODUTO);
        formData.append("tipoPRODUTO", productData.tipoPRODUTO);
        formData.append("acessoPRODUTO", productData.acessoPRODUTO);
        formData.append("ativoPRODUTO", productData.ativoPRODUTO.toString());

        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        try {
            await axios.post('https://api.spartacusprimetobacco.com.br/api/produtos', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Produto adicionado com sucesso!");
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            alert("Erro ao adicionar produto.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <PageContainer>
                <div>
                    <h1>Adicionar Produto</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Adicionar Produto</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Section>
                            <Typography variant="h6" gutterBottom>Informações Básicas</Typography>
                            <TextField label="SKU" name="skuPRODUTO" variant="outlined" fullWidth value={productData.skuPRODUTO} onChange={handleChange} required margin="normal" />
                            <TextField label="Nome do Produto" name="nomePRODUTO" variant="outlined" fullWidth value={productData.nomePRODUTO} onChange={handleChange} required margin="normal" />
                            <TextField label="Descrição do Produto" name="descricaoPRODUTO" variant="outlined" fullWidth multiline rows={4} value={productData.descricaoPRODUTO} onChange={handleChange} required margin="normal" />
                        </Section>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Section>
                            <Typography variant="h6" gutterBottom>Detalhes do Produto</Typography>
                            <TextField label="Preço" name="precoPRODUTO" variant="outlined" fullWidth type="number" value={productData.precoPRODUTO} onChange={handleChange} required margin="normal" />
                            <TextField label="Quantidade" name="quantidadePRODUTO" variant="outlined" fullWidth type="number" value={productData.quantidadePRODUTO} onChange={handleChange} required margin="normal" />
                            <TextField label="Alerta de Estoque" name="alertaPRODUTO" variant="outlined" fullWidth type="number" value={productData.alertaPRODUTO} onChange={handleChange} required margin="normal" />
                            <TextField label="Categoria" name="categoriaPRODUTO" variant="outlined" fullWidth value={productData.categoriaPRODUTO} onChange={handleChange} required margin="normal" />
                        </Section>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Section>
                            <Typography variant="h6" gutterBottom>Imagem do Produto</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField label="URL da Imagem" name="imagemPRODUTO" variant="outlined" fullWidth value={productData.imagemPRODUTO} onChange={handleChange} margin="normal" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        fullWidth
                                        margin="normal"
                                    >
                                        Upload Imagem
                                        <input type="file" hidden onChange={handleFileChange} />
                                    </Button>
                                </Grid>
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={productData.ativoPRODUTO}
                                        onChange={() => setProductData(prevData => ({ ...prevData, ativoPRODUTO: !prevData.ativoPRODUTO }))}
                                        color="primary"
                                    />
                                }
                                label="Produto Ativo"
                                style={{ marginTop: '1rem' }}
                            />
                        </Section>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Section>
                            <Typography variant="h6" gutterBottom>Configurações do Produto</Typography>
                            <TextField label="Tipo do Produto (1=Ativo, 0=Inativo)" name="tipoPRODUTO" variant="outlined" fullWidth type="number" value={productData.tipoPRODUTO} onChange={handleChange} required margin="normal" />
                            <TextField label="Acesso do Produto (1=Ativo, 0=Inativo)" name="acessoPRODUTO" variant="outlined" fullWidth type="number" value={productData.acessoPRODUTO} onChange={handleChange} required margin="normal" />
                        </Section>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={loading}
                            fullWidth
                            onClick={handleSubmit}
                        >
                            {loading ? 'Salvando...' : 'Salvar Produto'}
                        </StyledButton>
                    </Grid>
                </Grid>
            </PageContainer>
        </ThemeProvider>
    );
};

export default AddProduct;
