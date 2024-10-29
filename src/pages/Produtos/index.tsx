import React, { useState } from "react";
import styled from "styled-components";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";

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
    const produtosMock = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        nome: `Nome do produto ${index + 1}`,
        custo: (Math.random() * 20 + 5).toFixed(2),
        quantidade: Math.floor(Math.random() * 500),
        alerta: Math.floor(Math.random() * 100),
        localizacao: "São Paulo",
        imagem: "https://acdn.mitiendanube.com/stores/002/044/094/products/4d5ca6981-39a02113e646635a4516624042395202-640-0.jpg",
        publicado: index % 2 === 0 // Mock para definir alguns produtos como publicados
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("todos");
    const [selectedProducts, setSelectedProducts] = useState([]);

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

    const filteredProducts = produtosMock.filter((produto) => {
        if (activeFilter === "publicados" && !produto.publicado) return false;
        if (activeFilter === "baixo-estoque" && produto.quantidade > 50) return false;
        if (activeFilter === "rascunho" && produto.publicado) return false;
        if (searchTerm && !produto.nome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <PageContainer>
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

                    <NewProductButton>+ Novo Produto</NewProductButton>
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
                                    <ActionButton>
                                        <FiEdit />
                                    </ActionButton>
                                    <ActionButton>
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
