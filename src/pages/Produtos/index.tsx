import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const PageContainer = styled.div`
    // background-color: #f7f8fa;
    min-height: 100vh;
    padding: 20px;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const FilterButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const FilterButton = styled.button`
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${props => (props.active ? "#e0e7ff" : "#f1f3f5")};
    color: ${props => (props.active ? "#4f46e5" : "#333")};
    font-size: 0.9em;

    &:hover {
        background-color: #e0e7ff;
        color: #4f46e5;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const SearchInput = styled.input`
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9em;
`;

const FilterIconButton = styled.button`
    padding: 8px 12px;
    border: none;
    background-color: #f1f3f5;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    color: #333;

    &:hover {
        background-color: #e0e7ff;
        color: #4f46e5;
    }
`;

const NewProductButton = styled.button`
    background-color: #D02626;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const Thead = styled.thead`
    background-color: #f1f3f5;
`;

const Th = styled.th`
    padding: 15px;
    font-weight: bold;
    color: #333;
    text-align: left;
    font-size: 0.9em;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const Td = styled.td`
    padding: 15px;
    color: #555;
    font-size: 0.9em;
    text-align: left;
`;

const ProductImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 10px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
    margin-right: 10px;
    accent-color: ${({ isAllChecked, isChecked }) => 
        isAllChecked ? "#DAA520" : isChecked ? "#4CAF50" : "#ddd"};
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
    color: #777;
    margin-right: 10px;

    &:hover {
        color: #333;
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    padding: 10px;
    margin: 0 5px;
    border: none;
    background-color: ${props => (props.active ? "#D02626" : "#f1f3f5")};
    color: ${props => (props.active ? "#fff" : "#333")};
    cursor: pointer;
    border-radius: 5px;
    font-size: 1em;

    &:hover {
        background-color: #D02626;
        color: #fff;
    }
`;

const ProdutosPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("todos");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const navigate = useNavigate();

    function redirectToAddProduct() {
        navigate("/add-product");
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
    
        fetch("https://api.spartacusprimetobacco.com.br/api/produtos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const mappedProdutos = data.map(produto => ({
                id: produto.codigoPRODUTO,
                nome: produto.nomePRODUTO,
                custo: parseFloat(produto.precoPRODUTO).toFixed(2),
                quantidade: parseInt(produto.quantidadePRODUTO),
                alerta: produto.alertaPRODUTO,
                localizacao: "São Paulo", // Substitua conforme necessário
                imagem: produto.imagemPRODUTO,
                publicado: produto.ativoPRODUTO === 1,
            }));
            setProdutos(mappedProdutos);
        })
        .catch(error => console.error("Erro ao buscar produtos:", error));
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === currentItems.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(currentItems.map((produto) => produto.id));
        }
    };

    const handleSelectProduct = (id) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((productId) => productId !== id)
                : [...prevSelected, id]
        );
    };

    const filteredProducts = produtos.filter((produto) => {
        if (activeFilter === "publicados" && !produto.publicado) return false;
        if (activeFilter === "baixo-estoque" && produto.quantidade > 50) return false;
        if (activeFilter === "rascunho" && produto.publicado) return false;
        if (searchTerm && !produto.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const handleEdit = (produto) => {
        setProdutoSelecionado(produto);
        setShowEditModal(true);
    };

    const handleSaveChanges = () => {
        const token = localStorage.getItem("token");
    
        fetch(`https://api.spartacusprimetobacco.com.br/api/produtos/${produtoSelecionado.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                skuPRODUTO: produtoSelecionado.sku,
                nomePRODUTO: produtoSelecionado.nome,
                descricaoPRODUTO: produtoSelecionado.descricao,
                precoPRODUTO: produtoSelecionado.custo,
                quantidadePRODUTO: produtoSelecionado.quantidade,
                alertaPRODUTO: produtoSelecionado.alerta,
                categoriaPRODUTO: produtoSelecionado.categoria,
                localizacaoPRODUTO: produtoSelecionado.localizacao,
                imagemPRODUTO: produtoSelecionado.imagem,
                tipoPRODUTO: produtoSelecionado.tipo,
                acessoPRODUTO: produtoSelecionado.acesso,
                ativoPRODUTO: produtoSelecionado.publicado,
            })
        })
        .then(response => {
            if (response.ok) {
                setShowEditModal(false);
                // Atualize o estado dos produtos aqui se necessário
            } else {
                console.error("Erro ao atualizar o produto");
            }
        })
        .catch(error => console.error("Erro ao salvar alterações:", error));
    };
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProdutoSelecionado({ ...produtoSelecionado, imagem: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };   
    
    const handleDelete = (id) => {
        const token = localStorage.getItem("token");
    
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Essa ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://api.spartacusprimetobacco.com.br/api/produtos/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== id));
                        Swal.fire(
                            'Excluído!',
                            'O produto foi excluído com sucesso.',
                            'success'
                        );
                    } else {
                        Swal.fire('Erro!', 'Não foi possível excluir o produto.', 'error');
                    }
                })
                .catch(error => {
                    console.error("Erro ao realizar a exclusão:", error);
                    Swal.fire('Erro!', 'Ocorreu um erro ao excluir o produto.', 'error');
                });
            }
        });
    };    
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <PageContainer>
        {showEditModal && (
    <div style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
        padding: "20px"
    }}>
        <div style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            width: "500px",
            maxHeight: "80vh",
            overflowY: "auto",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            marginTop: "40px"
        }}>
            <h2 style={{ marginBottom: "20px" }}>Editar Produto</h2>
            <label>Nome do Produto</label>
            <input
                type="text"
                value={produtoSelecionado?.nome || ""}
                onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, nome: e.target.value })}
                style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.3s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
            <label>Preço</label>
            <input
                type="text"
                value={produtoSelecionado?.custo || ""}
                onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, custo: e.target.value })}
                style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.3s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
            <label>Quantidade</label>
            <input
                type="text"
                value={produtoSelecionado?.quantidade || ""}
                onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, quantidade: e.target.value })}
                style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.3s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
            />
            <label>Imagem do Produto</label>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "10px" }}>
                <div style={{ position: "relative" }}>
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        style={{
                            position: "absolute",
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            cursor: "pointer"
                        }} 
                    />
                    <button style={{
                        padding: "10px 20px",
                        backgroundColor: "#4f46e5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}>
                        Escolher arquivo
                    </button>
                </div>
                {produtoSelecionado?.imagem && (
                    <img src={produtoSelecionado.imagem} alt="Preview" style={{ width: "100%", maxWidth: "150px", borderRadius: "8px" }} />
                )}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button onClick={() => setShowEditModal(false)} style={{ padding: "8px 16px", backgroundColor: "#f1f1f1", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancelar</button>
                <button onClick={handleSaveChanges} style={{ padding: "8px 16px", backgroundColor: "#D02626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Salvar Alterações</button>
            </div>
        </div>
    </div>
)}

            <BreadcrumbItem mainTitle="" subTitle="Produtos" />
            <Container>
                <FilterContainer>
                    <FilterButtons>
                        <FilterButton active={activeFilter === "todos"} onClick={() => handleFilterChange("todos")}>
                            Todos os produtos
                        </FilterButton>
                        <FilterButton active={activeFilter === "publicados"} onClick={() => handleFilterChange("publicados")}>
                            Publicados
                        </FilterButton>
                        <FilterButton active={activeFilter === "baixo-estoque"} onClick={() => handleFilterChange("baixo-estoque")}>
                            Baixo Estoque
                        </FilterButton>
                        <FilterButton active={activeFilter === "rascunho"} onClick={() => handleFilterChange("rascunho")}>
                            Rascunho
                        </FilterButton>
                    </FilterButtons>

                    <SearchContainer>
                        <SearchInput 
                            type="text" 
                            placeholder="Buscar produto" 
                            value={searchTerm} 
                            onChange={handleSearch} 
                        />
                        <FilterIconButton>
                            <FiFilter />
                        </FilterIconButton>
                    </SearchContainer>

                    <NewProductButton onClick={redirectToAddProduct}>+ Novo Produto</NewProductButton>
                </FilterContainer>

                <Table>
                    <Thead>
                        <Tr>
                            <Th>
                                <Checkbox
                                    checked={selectedProducts.length === currentItems.length && currentItems.length > 0}
                                    onChange={handleSelectAll}
                                    isAllChecked={selectedProducts.length === currentItems.length && currentItems.length > 0}
                                />
                                Produto
                            </Th>
                            <Th>Custo</Th>
                            <Th>Quantidade</Th>
                            <Th>Alerta</Th>
                            <Th>Localização</Th>
                            <Th>Ação</Th>
                        </Tr>
                    </Thead>
                    <tbody>
                        {currentItems.map((produto) => (
                            <Tr key={produto.id}>
                                <Td>
                                    <Checkbox
                                        checked={selectedProducts.includes(produto.id)}
                                        onChange={() => handleSelectProduct(produto.id)}
                                        isChecked={selectedProducts.includes(produto.id)}
                                    />
                                    <ProductImage src={produto.imagem} alt="Produto" />
                                    {produto.nome}
                                </Td>
                                <Td>R$ {produto.custo}</Td>
                                <Td>{produto.quantidade}</Td>
                                <Td>{produto.alerta}</Td>
                                <Td>{produto.localizacao}</Td>
                                <Td>
                                <ActionButton onClick={() => handleEdit(produto)}>
                                        <FiEdit />
                                    </ActionButton>
                                    <ActionButton onClick={() => handleDelete(produto.id)}>
    <FiTrash />
</ActionButton>

                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>

                <PaginationContainer>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationButton
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </PaginationButton>
                    ))}
                </PaginationContainer>
            </Container>
        </PageContainer>
    );
};

export default ProdutosPage;
