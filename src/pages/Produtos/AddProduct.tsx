import React, { useState } from 'react';
import styled from 'styled-components';
import { FiImage } from 'react-icons/fi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const TitleBreadcrumbWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin: 0;
`;

const Breadcrumb = styled.div`
    color: #aaa;
    font-size: 14px;
    margin-top: 5px;

    span {
        color: #D02626;
        cursor: pointer;
    }

    span:not(:last-child)::after {
        content: " > ";
        color: #aaa;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

const CancelButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    font-size: 14px;
`;

const AddButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #D02626;
    color: white;
    cursor: pointer;
    font-size: 14px;
`;

const Content = styled.div`
    display: flex;
    gap: 20px;
`;

const LeftPanel = styled.div`
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RightPanel = styled.div`
    flex: 2;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: white;
`;

const SectionTitle = styled.h3`
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
`;

const Thumbnail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    text-align: center;
    color: #666;
    position: relative;
`;

const IconWrapper = styled.div`
    font-size: 40px;
    color: #D02626;
    margin-bottom: 10px;
`;

const UploadText = styled.span`
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
`;

const UploadButton = styled.button`
    background-color: #f5f5f5;
    color: #D02626;
    border: 1px solid #D02626;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
`;

const Textarea = styled.textarea`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    resize: none;
`;

const AddProduct: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = () => {
        const token = localStorage.getItem('token');
        const newProduct = {
            skuPRODUTO: "ABC123", // Exemplo de SKU, ajuste conforme necessário
            nomePRODUTO: name,
            descricaoPRODUTO: description,
            precoPRODUTO: 100.00, // Exemplo de preço, ajuste conforme necessário
            quantidadePRODUTO: 10, // Exemplo de quantidade, ajuste conforme necessário
            alertaPRODUTO: 5, // Exemplo de alerta de estoque, ajuste conforme necessário
            categoriaPRODUTO: 1, // ID de categoria como exemplo, ajuste conforme necessário
            localizacaoPRODUTO: 1, // ID de localização como exemplo, ajuste conforme necessário
            imagemPRODUTO: image,
            tipoPRODUTO: 1, // ID do tipo de produto, ajuste conforme necessário
            acessoPRODUTO: 1, // Tipo de acesso, ajuste conforme necessário
            ativoPRODUTO: true // Ativo como padrão
        };

        fetch("https://api.spartacusprimetobacco.com.br/api/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newProduct)
        })
        .then((response) => {
            if (response.ok) {
                MySwal.fire({
                    title: 'Sucesso!',
                    text: 'Produto adicionado com sucesso!',
                    icon: 'success',
                    confirmButtonColor: '#D02626',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/produtos'); // Redireciona para a página de produtos
                });

                setName('');
                setDescription('');
                setImage(null);
            } else {
                throw new Error("Erro ao adicionar o produto");
            }
        })
        .catch((error) => {
            console.error(error);
            MySwal.fire({
                title: 'Erro',
                text: 'Não foi possível adicionar o produto.',
                icon: 'error',
                confirmButtonColor: '#D02626',
                confirmButtonText: 'OK'
            });
        });
    };

    return (
        <Container>
            <Header>
                <TitleBreadcrumbWrapper>
                    <Title>Adicionar Produto</Title>
                    <Breadcrumb>
                        <span>Dashboard</span>
                        <span>Produtos</span>
                        <span>Adicionar Produto</span>
                    </Breadcrumb>
                </TitleBreadcrumbWrapper>
                <ButtonGroup>
                    <CancelButton onClick={() => navigate('/produtos')}>Cancelar</CancelButton>
                    <AddButton onClick={handleAddProduct}>Adicionar Produto</AddButton>
                </ButtonGroup>
            </Header>
            <Content>
                <LeftPanel>
                    <SectionTitle>Miniatura do produto</SectionTitle>
                    <span>Foto</span>
                    <Thumbnail>
                        {!image ? (
                            <>
                                <IconWrapper>
                                    <FiImage />
                                </IconWrapper>
                                <UploadText>Arraste e solte a imagem aqui ou clique em adicionar imagem</UploadText>
                            </>
                        ) : (
                            <img src={image} alt="Thumbnail Preview" style={{ width: '100%', borderRadius: '8px' }} />
                        )}
                        <HiddenFileInput
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            onChange={handleImageUpload}
                        />
                        <UploadButton onClick={() => document.getElementById('fileInput')?.click()}>
                            Adicionar Imagem
                        </UploadButton>
                    </Thumbnail>
                </LeftPanel>
                <RightPanel>
                    <SectionTitle>Informações Gerais</SectionTitle>
                    <FormGroup>
                        <Label>Nome do Produto</Label>
                        <Input
                            type="text"
                            placeholder="Digite o nome do produto aqui..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descrição</Label>
                        <Textarea
                            rows={4}
                            placeholder="Digite a descrição do produto aqui..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormGroup>
                </RightPanel>
            </Content>
        </Container>
    );
};

export default AddProduct;
