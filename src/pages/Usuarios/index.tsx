import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BreadcrumbItem from "../../Common/BreadcrumbItem";
import { FaEdit, FaTrash, FaLock, FaSearch } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    lastAccess: string;
    isActive: boolean;
}

const UsuariosPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://api.spartacusprimetobacco.com.br/api/usuarios', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const filteredUsers = response.data
                    .filter((user: any) => user.tipoUSUARIO !== 6)
                    .map((user: any) => ({
                        id: user.codigoUSUARIO,
                        name: user.nomeUSUARIO,
                        email: user.emailUSUARIO,
                        phone: user.telefoneUSUARIO,
                        lastAccess: new Date(user.logUSUARIO).toLocaleDateString("pt-BR"),
                        isActive: user.ativoUSUARIO,
                    }));
                
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleEditUser = async (userId: number) => {
        const user = users.find(u => u.id === userId);
    
        if (user) {
            const { value: formValues } = await Swal.fire({
                title: 'Editar Usuário',
                html:
                    `<input id="swal-input1" class="swal2-input" placeholder="Nome" value="${user.name}">` +
                    `<input id="swal-input2" class="swal2-input" placeholder="Email" value="${user.email}">` +
                    `<input id="swal-input3" class="swal2-input" placeholder="Telefone" value="${user.phone}">`,
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        nome: (document.getElementById('swal-input1') as HTMLInputElement).value,
                        email: (document.getElementById('swal-input2') as HTMLInputElement).value,
                        telefone: (document.getElementById('swal-input3') as HTMLInputElement).value
                    }
                }
            });
    
            if (formValues) {
                try {
                    await axios.put(
                        `https://api.spartacusprimetobacco.com.br/api/usuarios/editar/${userId}`,
                        {
                            nome: formValues.nome,
                            email: formValues.email,
                            telefone: formValues.telefone
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
    
                    setUsers(users.map(u => u.id === userId ? { ...u, ...formValues } : u));
    
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuário editado com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    console.error("Erro ao editar usuário:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro ao editar usuário.',
                        text: 'Ocorreu um erro, por favor tente novamente.',
                        showConfirmButton: true
                    });
                }
            }
        }
    };    

    const handleDeleteUser = async (userId: number) => {
        try {
            await axios.delete(`https://api.spartacusprimetobacco.com.br/api/usuarios/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter(user => user.id !== userId));
            alert("Usuário excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            alert("Erro ao excluir usuário.");
        }
    };

    const handleToggleActive = async (userId: number, isActive: boolean) => {
        try {
            await axios.patch(
                `https://api.spartacusprimetobacco.com.br/api/usuarios/${userId}`,
                { ativoUSUARIO: !isActive },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(users.map(user => user.id === userId ? { ...user, isActive: !isActive } : user));
            
            Swal.fire({
                icon: 'success',
                title: `Usuário ${!isActive ? "habilitado" : "desabilitado"} com sucesso!`,
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Erro ao alterar status do usuário:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao alterar status do usuário.',
                text: 'Ocorreu um erro, por favor tente novamente.',
                showConfirmButton: true
            });
        }
    };    

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

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
                                    <ActionIcon as={FaEdit} title="Editar" onClick={() => handleEditUser(user.id)} />
                                    <ActionIcon
                                        as={FaLock}
                                        title={user.isActive ? "Desabilitar" : "Habilitar"}
                                        onClick={() => handleToggleActive(user.id, user.isActive)}
                                    />
                                    <ActionIcon as={FaTrash} title="Deletar" onClick={() => handleDeleteUser(user.id)} />
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
    font-weight: bold;
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

const PageButton = styled.button<{ active: boolean }>`
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
