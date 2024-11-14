import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button, Breadcrumb, Modal, Form } from 'react-bootstrap';
import { FaEye, FaPencilAlt, FaCalendarAlt, FaFilter, FaDownload, FaPlus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import * as XLSX from 'xlsx';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

interface Pedido {
    id: string;
    produto: string;
    imagem: string;
    outrosProdutos: number;
    data: string;
    cliente: string;
    email: string;
    total: string;
    pagamento: string;
    status: string;
}

const PedidosPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [activeFilter, setActiveFilter] = useState('Todos os pedidos');
    const [showDateModal, setShowDateModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<[Date | null, Date | null]>([null, null]);
    const [filters, setFilters] = useState({ status: '', pagamento: '' });
    const [selectedRows, setSelectedRows] = useState<Pedido[]>([]);
    const [currentPedido, setCurrentPedido] = useState<Pedido | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage

        fetch('http://192.168.15.35:8000/api/carrinhos', {
            headers: {
                'Authorization': `Bearer ${token}`, // Adiciona o token ao cabeçalho da requisição
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na autenticação');
            }
            return response.json();
        })
        .then((data: any[]) => {
            const mappedData = data.map(carrinho => ({
                id: carrinho.codigoCARRINHO,
                produto: carrinho.tituloCARRINHO,
                imagem: '', // Placeholder se não houver imagem na API
                outrosProdutos: 0, // Ajuste conforme a necessidade
                data: carrinho.datacriacaoCARRINHO,
                cliente: `${carrinho.nomeCARRINHO} ${carrinho.sobrenomeCARRINHO}`,
                email: carrinho.emailCARRINHO,
                total: carrinho.totalCARRINHO,
                pagamento: carrinho.linkPagamentoCARRINHO ? 'Pago' : 'Pendente',
                status: carrinho.statusCARRINHO === 0 ? 'Pendente' : 'Completo',
            }));
            setData(mappedData);
            setFilteredData(mappedData);
        })
        .catch(error => console.error('Erro ao buscar os dados:', error));
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
        if (filter !== 'Todos os pedidos') {
            const now = moment();
            let filtered: Pedido[] = [];
            if (filter === '12 meses') {
                filtered = data.filter(pedido => moment(pedido.data).isAfter(now.subtract(12, 'months')));
            } else if (filter === '30 dias') {
                filtered = data.filter(pedido => moment(pedido.data).isAfter(now.subtract(30, 'days')));
            } else if (filter === '7 dias') {
                filtered = data.filter(pedido => moment(pedido.data).isAfter(now.subtract(7, 'days')));
            } else if (filter === '24 horas') {
                filtered = data.filter(pedido => moment(pedido.data).isAfter(now.subtract(24, 'hours')));
            }
            setFilteredData(filtered);
            setCurrentPage(1); // Resetar para a primeira página após aplicar o filtro
        } else {
            setFilteredData(data);
            setCurrentPage(1); // Resetar para a primeira página
        }
    };

    const handleShowDateModal = () => setShowDateModal(true);
    const handleCloseDateModal = () => setShowDateModal(false);

    const handleShowFilterModal = () => setShowFilterModal(true);
    const handleCloseFilterModal = () => setShowFilterModal(false);

    const applyFilters = () => {
        let filtered = data;

        if (filters.status) {
            filtered = filtered.filter(pedido => pedido.status === filters.status);
        }

        if (filters.pagamento) {
            filtered = filtered.filter(pedido => pedido.pagamento === filters.pagamento);
        }

        setFilteredData(filtered);
        setCurrentPage(1); // Resetar para a primeira página após aplicar o filtro
        setShowFilterModal(false);
    };

    const handleSelectAllRows = () => {
        if (selectedRows.length === filteredData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredData);
        }
    };

    const handleRowSelect = (row: Pedido) => {
        if (selectedRows.includes(row)) {
            setSelectedRows(selectedRows.filter(r => r !== row));
        } else {
            setSelectedRows([...selectedRows, row]);
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(selectedRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos');
        XLSX.writeFile(workbook, 'pedidos.xlsx');
    };

    const handleView = (row: Pedido) => {
        setCurrentPedido(row);
        setShowViewModal(true);
    };

    const handleEdit = (row: Pedido) => {
        setCurrentPedido(row);
        setShowEditModal(true);
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setCurrentPedido(null);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setCurrentPedido(null);
    };

    const columns: TableColumn<Pedido>[] = [
        {
            name: <input type="checkbox" checked={selectedRows.length === filteredData.length} onChange={handleSelectAllRows} />,
            cell: row => <input type="checkbox" checked={selectedRows.includes(row)} onChange={() => handleRowSelect(row)} />,
            width: '50px',
        },
        {
            name: <span style={{ color: 'red' }}>Ordem</span>,
            selector: row => <span style={{ color: 'red' }}>{row.id}</span>,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Produto',
            selector: row => row.produto,
            sortable: true,
            cell: row => (
                <div className="d-flex align-items-center">
                    <img src={row.imagem} alt="Produto" width="50" height="50" className="me-2" />
                    <div className="text-truncate" style={{ maxWidth: '150px' }}>
                        {row.produto}
                        <br />
                        <small>+{row.outrosProdutos} outros produtos</small>
                    </div>
                </div>
            ),
            width: '200px',
        },
        {
            name: 'Data',
            selector: row => row.data,
            sortable: true,
            cell: row => {
                const data = moment(row.data);
                return data.isAfter(moment().subtract(1, 'days')) ? data.fromNow() : data.format('YYYY-MM-DD');
            },
            width: '150px',
        },
        {
            name: 'Cliente',
            selector: row => row.cliente,
            sortable: true,
            cell: row => (
                <div className="text-truncate" style={{ maxWidth: '150px' }}>
                    {row.cliente}
                    <br />
                    <small>{row.email}</small>
                </div>
            ),
            width: '200px',
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Pagamento',
            selector: row => row.pagamento,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            cell: row => (
                <span className={`badge bg-${getStatusColor(row.status)}`}>
                    {row.status}
                </span>
            ),
            width: '150px',
        },        
        {
            name: 'Ação',
            cell: row => (
                <div className="d-flex">
                    <Button variant="link" size="sm" onClick={() => handleView(row)}>
                        <FaEye style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    </Button>
                    <Button variant="link" size="sm" onClick={() => handleEdit(row)}>
                        <FaPencilAlt style={{ color: 'rgba(0, 0, 0, 0.7)' }} />
                    </Button>
                </div>
            ),
            width: '100px',
        },
    ];

    const paginatedData = filteredData.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div style={{ padding: '20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1>Pedidos</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Pedidos</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="d-flex">
                    <Button variant="warning" className="me-2" onClick={exportToExcel}>
                        <FaDownload className="me-1" /> Exportar
                    </Button>
                    <Button variant="danger">
                        <FaPlus className="me-1" /> Adicionar Pedido
                    </Button>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex">
                    {['Todos os pedidos', '12 meses', '30 dias', '7 dias', '24 horas'].map((filter) => (
                        <Button
                            key={filter}
                            variant={activeFilter === filter ? 'warning' : 'outline-secondary'}
                            className="me-2"
                            onClick={() => handleFilterClick(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
                <div className="d-flex">
                    <Button variant="outline-secondary" className="me-2" onClick={handleShowDateModal}>
                        <FaCalendarAlt className="me-1" /> Selecionar data
                    </Button>
                    <Button variant="outline-secondary" onClick={handleShowFilterModal}>
                        <FaFilter className="me-1" /> Filtros
                    </Button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={paginatedData}
                pagination
                paginationServer
                paginationTotalRows={filteredData.length}
                paginationDefaultPage={currentPage}
                onChangePage={handlePageChange}
                paginationComponentOptions={{
                    rowsPerPageText: 'Linhas por página',
                    rangeSeparatorText: 'de',
                    noRowsPerPage: true,
                }}
                paginationRowsPerPageOptions={[perPage]}
                className="rounded border"
                noHeader
            />

            {/* Modal de seleção de data */}
            <Modal show={showDateModal} onHide={handleCloseDateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecionar Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between">
                        <DatePicker
                            selected={selectedDate[0]}
                            onChange={(date) => setSelectedDate([date, selectedDate[1]])}
                            inline
                        />
                        <DatePicker
                            selected={selectedDate[1]}
                            onChange={(date) => setSelectedDate([selectedDate[0], date])}
                            inline
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDateModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const [startDate, endDate] = selectedDate;
                        if (startDate && endDate) {
                            const filtered = data.filter(pedido => {
                                const pedidoDate = moment(pedido.data);
                                return pedidoDate.isBetween(startDate, endDate, 'days', '[]');
                            });
                            setFilteredData(filtered);
                            setCurrentPage(1); // Resetar para a primeira página após o filtro de datas
                        }
                        setShowDateModal(false);
                    }}>
                        Selecionar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de filtros */}
            <Modal show={showFilterModal} onHide={handleCloseFilterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Filtros</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="">Todos</option>
                                <option value="Processando">Processando</option>
                                <option value="Enviado">Enviado</option>
                                <option value="Entregue">Entregue</option>
                                <option value="Cancelado">Cancelado</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="pagamento" className="mt-3">
                            <Form.Label>Pagamento</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.pagamento}
                                onChange={(e) => setFilters({ ...filters, pagamento: e.target.value })}
                            >
                                <option value="">Todos</option>
                                <option value="Visa">Visa</option>
                                <option value="Mastercard">Mastercard</option>
                                <option value="Elo">Elo</option>
                                <option value="Transferência">Transferência</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseFilterModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={applyFilters}>
                        Aplicar Filtros
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de visualizar pedido */}
            <Modal show={showViewModal} onHide={handleCloseViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Visualizar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPedido && (
                        <div>
                            <p><strong>Ordem:</strong> {currentPedido.id}</p>
                            <p><strong>Produto:</strong> {currentPedido.produto}</p>
                            <p><strong>Data:</strong> {currentPedido.data}</p>
                            <p><strong>Cliente:</strong> {currentPedido.cliente}</p>
                            <p><strong>Total:</strong> {currentPedido.total}</p>
                            <p><strong>Pagamento:</strong> {currentPedido.pagamento}</p>
                            <p><strong>Status:</strong> {currentPedido.status}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de editar pedido */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPedido && (
                        <Form>
                            <Form.Group controlId="produto">
                                <Form.Label>Produto</Form.Label>
                                <Form.Control type="text" defaultValue={currentPedido.produto} />
                            </Form.Group>
                            <Form.Group controlId="data" className="mt-3">
                                <Form.Label>Data</Form.Label>
                                <Form.Control type="date" defaultValue={currentPedido.data} />
                            </Form.Group>
                            <Form.Group controlId="cliente" className="mt-3">
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control type="text" defaultValue={currentPedido.cliente} />
                            </Form.Group>
                            <Form.Group controlId="total" className="mt-3">
                                <Form.Label>Total</Form.Label>
                                <Form.Control type="text" defaultValue={currentPedido.total} />
                            </Form.Group>
                            <Form.Group controlId="pagamento" className="mt-3">
                                <Form.Label>Pagamento</Form.Label>
                                <Form.Control type="text" defaultValue={currentPedido.pagamento} />
                            </Form.Group>
                            <Form.Group controlId="status" className="mt-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" defaultValue={currentPedido.status}>
                                    <option value="Processando">Processando</option>
                                    <option value="Enviado">Enviado</option>
                                    <option value="Entregue">Entregue</option>
                                    <option value="Cancelado">Cancelado</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Fechar
                    </Button>
                    <Button variant="primary">
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pendente':
            return 'warning'; // Altere para a cor desejada, como 'warning' para amarelo
        case 'Completo':
            return 'success'; // Altere para 'success' para verde, ou outra cor desejada
        case 'Processando':
            return 'info'; // Cor para status "Processando", caso exista
        case 'Cancelado':
            return 'danger'; // Cor para "Cancelado", como vermelho
        default:
            return 'secondary'; // Cor padrão caso nenhum dos casos acima seja atendido
    }
};

export default PedidosPage;