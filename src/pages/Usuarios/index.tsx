import React, { useState } from "react";
import styled from "styled-components";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { FaEdit, FaTrash, FaLock, FaSearch } from "react-icons/fa";

const mockUsers = [
    { id: 1, name: "Robert Fox", email: "robert@gmail.com", phone: "(11) 98765-3612", lastAccess: "1 Jan 2024" },
    { id: 2, name: "Jenny Wilson", email: "jenny@gmail.com", phone: "(11) 98765-1234", lastAccess: "1 Jan 2024" },
    { id: 3, name: "Jacob Jones", email: "jacob@gmail.com", phone: "(11) 98765-4321", lastAccess: "1 Jan 2024" },
    { id: 4, name: "Kristin Watson", email: "kristin@gmail.com", phone: "(11) 98765-5678", lastAccess: "1 Jan 2024" },
    { id: 5, name: "Ronald Richards", email: "ronald@gmail.com", phone: "(11) 98765-8765", lastAccess: "1 Jan 2024" },
    { id: 6, name: "Esther Howard", email: "esther@gmail.com", phone: "(11) 98765-6543", lastAccess: "1 Jan 2024" },
    { id: 7, name: "Floyd Miles", email: "floyd@gmail.com", phone: "(11) 98765-3456", lastAccess: "1 Jan 2024" },
    { id: 8, name: "Cameron Williamson", email: "cameron@gmail.com", phone: "(11) 98765-2345", lastAccess: "1 Jan 2024" },
    { id: 9, name: "Courtney Henry", email: "courtney@gmail.com", phone: "(11) 98765-1234", lastAccess: "1 Jan 2024" },
    { id: 10, name: "Tom Cook", email: "tom@gmail.com", phone: "(11) 98765-6789", lastAccess: "1 Jan 2024" },
    { id: 11, name: "Ralph Edwards", email: "ralph@gmail.com", phone: "(11) 98765-8761", lastAccess: "1 Jan 2024" },
    { id: 12, name: "Albert Flores", email: "albert@gmail.com", phone: "(11) 98765-4321", lastAccess: "1 Jan 2024" },
    { id: 13, name: "Jane Cooper", email: "jane@gmail.com", phone: "(11) 98765-1234", lastAccess: "1 Jan 2024" },
    { id: 14, name: "Devon Lane", email: "devon@gmail.com", phone: "(11) 98765-3456", lastAccess: "1 Jan 2024" },
    { id: 15, name: "Angela Caroll", email: "angela@gmail.com", phone: "(11) 98765-6543", lastAccess: "1 Jan 2024" },
];

const UsuariosPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <React.Fragment>
            <BreadcrumbItem mainTitle="" subTitle="Usuários" />
            <Container>
                <Header>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            placeholder="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="search-icon" />
                    </SearchBar>
                    <AddButton>+ Novo Gerente</AddButton>
                </Header>
                <UserTable>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Último Acesso</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <UserInfo>
                                        <Avatar />
                                        <div>
                                            <p>{user.name}</p>
                                            <span>{user.email}</span>
                                        </div>
                                    </UserInfo>
                                </td>
                                <td>{user.phone}</td>
                                <td>{user.lastAccess}</td>
                                <td>
                                    <ActionIcon as={FaEdit} title="Editar" />
                                    <ActionIcon as={FaLock} title="Bloquear" />
                                    <ActionIcon as={FaTrash} title="Deletar" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </UserTable>
                <Pagination>
                    {[...Array(totalPages)].map((_, index) => (
                        <PageButton
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            active={index + 1 === currentPage}
                        >
                            {index + 1}
                        </PageButton>
                    ))}
                </Pagination>
            </Container>
        </React.Fragment>
    );
};

export default UsuariosPage;

// Styled Components

const Container = styled.div`
    padding: 20px;
    // background-color: #f9f9f9;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const AddButton = styled.button`
    background-color: #D02626;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    background-color: #f1f1f1;
    padding: 5px 10px;
    border-radius: 8px;
    width: 200px;
    position: relative;

    .search-icon {
        color: #aaa;
        position: absolute;
        right: 10px;
    }
`;

const SearchInput = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    width: 100%;
`;

const UserTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f7f7f7;
        font-weight: bold;
    }

    tbody tr:hover {
        background-color: #f1f1f1;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;

    p {
        margin: 0;
        font-weight: bold;
    }

    span {
        font-size: 0.9em;
        color: #888;
    }
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background-color: #ccc;
    border-radius: 50%;
    margin-right: 10px;
`;

const ActionIcon = styled.div`
    margin-right: 10px;
    cursor: pointer;
    color: #888;

    &:hover {
        color: #333;
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    color: ${(props) => (props.active ? "#D02626" : "#888")};
    text-decoration: ${(props) => (props.active ? "underline" : "none")};

    &:hover {
        color: #D02626;
    }
`;
