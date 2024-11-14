import { THEME_MODE } from "../Common/layoutConfig";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from '../toolkit/authSlice';
import SimpleBar from "simplebar-react";
import { parseJwt } from "../services/jwtService";
import axios from "axios";

// URL da imagem padrão da web para usuários sem imagem definida
const defaultAvatar = "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png";

interface HeaderProps {
    themeMode?: string;
    changeThemeMode?: any;
    toogleSidebarHide?: () => void;
    toogleMobileSidebarHide?: () => void;
    handleOffcanvasToggle?: () => void;
}

const TopBar = ({ handleOffcanvasToggle }: HeaderProps) => {
    const dispatch = useDispatch<any>();
  
    const [userName, setUserName] = useState<string>("");
    const [userStaff, setUserStaff] = useState<string>("");
    const [avatar1, setAvatar1] = useState<string>("");
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            setUserName(decodedToken?.nome || 'Usuário');
            setUserStaff(decodedToken?.cargo || 'Cargo');
            setAvatar1(decodedToken?.imagem || defaultAvatar); // Usa a imagem padrão da web se não houver imagem definida
        }
        
        // Carregar notificações da API
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("https://api.spartacusprimetobacco.com.br/api/historicos");
                setNotifications(response.data);
                setUnreadCount(response.data.length); // Definir o número de notificações não lidas
            } catch (error) {
                console.error("Erro ao carregar notificações:", error);
            }
        };
        
        fetchNotifications();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout());
    };

    const handleNotificationsOpen = () => {
        setUnreadCount(0); // Zerar o contador de notificações não lidas ao abrir o menu
    };

    return (
        <React.Fragment>
            <header className="pc-header">
                <div className="header-wrapper">
                    <div className="ms-auto">
                        <ul className="list-unstyled">
                            <Dropdown as="li" className="pc-h-item" onToggle={handleNotificationsOpen}>
                                <Dropdown.Toggle
                                    as="a"
                                    className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#"
                                    aria-haspopup="false">
                                    <i className="ph-duotone ph-bell"></i>
                                    {unreadCount > 0 && (
                                        <span className="badge bg-success pc-h-badge">{unreadCount}</span>
                                    )}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-notification dropdown-menu-end pc-h-dropdown">
                                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                                        <h4 className="m-0">Notifications</h4>
                                    </div>
                                    <SimpleBar className="dropdown-body text-wrap header-notification-scroll position-relative h-100"
                                        style={{ maxHeight: "calc(100vh - 235px)" }}>
                                        {notifications.length > 0 ? (
                                            notifications.map((notification, index) => (
                                                <div key={index} className="notification-item d-flex align-items-start my-2 p-2 border-bottom">
                                                    <i className="ph-duotone ph-clock me-3"></i>
                                                    <div>
                                                        <p className="mb-1">{notification.textoHISTORICO}</p>
                                                        <small className="text-muted">{new Date(notification.dataHISTORICO).toLocaleString()}</small>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No notifications available</p>
                                        )}
                                    </SimpleBar>
                                    <div className="dropdown-footer">
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <button className="btn btn-primary">Archive all</button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-outline-secondary">Mark all as read</button>
                                            </div>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown as="li" className="pc-h-item header-user-profile">
                                <Dropdown.Toggle className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#"
                                    aria-haspopup="false" data-bs-auto-close="outside" aria-expanded="false" style={{ border: "none" }}>
                                    <img src={defaultAvatar} alt="user-image" width={40} className="user-avtar rounded-circle" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                                        <h4 className="m-0">Perfil</h4>
                                    </div>
                                    <div className="dropdown-body">
                                        <SimpleBar className="profile-notification-scroll position-relative" style={{ maxHeight: "calc(100vh - 225px)" }}>
                                            <ul className="list-group list-group-flush w-100">
                                                <li className="list-group-item">
                                                    <div className="d-flex align-items-center">
                                                        <img src={defaultAvatar} alt="user-image" width={50} className="wid-50 rounded-circle" />
                                                        <div className="flex-grow-1 mx-3">
                                                            <h5 className="mb-0">{userName}</h5>
                                                            <p className="link-primary">{userStaff}</p>
                                                        </div>
                                                        <span className="badge bg-primary">PRO</span>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <Dropdown.Item onClick={handleLogout}>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-power"></i>
                                                            <span>Logout</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                </li>
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ul>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default TopBar;
