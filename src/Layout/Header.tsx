import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../toolkit/authSlice'; // Importa a ação de logout 
import logoDark from "../assets/images/logo-dark.svg";
import logoLight from "../assets/images/logo-white.svg"; 
import SimpleBar from "simplebar-react";
import { menuItems } from "./MenuData";
import NestedMenu from "./NestedMenu";
import { Card, CardBody, Dropdown } from "react-bootstrap";
import { parseJwt } from "../services/jwtService"; // Função que decodifica o token

const Header = ({ themeMode }: any) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>("");
  const [userStaff, setUserStaff] = useState<string>("");
  const [avatar1, setAvatar1] = useState<string>("");
  

  // Função para pegar o nome do usuário do token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      setUserName(decodedToken?.nome || 'Usuário'); // Ajuste o nome de acordo com o seu token
      setUserStaff(decodedToken?.cargo || 'Cargo'); // Ajuste o nome de acordo com o seu token
      setAvatar1(decodedToken?.imagem); // Ajuste o nome de acordo com o seu token
      
    }
  }, []);

  const handleLogout = () => {
    // Remove o token e os dados do usuário do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());  // Dispara a ação de logout no redux
  };

  return (
    <React.Fragment>
      <nav className="pc-sidebar" id="pc-sidebar-hide">
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link to="/" className="b-brand text-primary">
              {themeMode === "dark" ?
                <img src={logoLight} alt="logo" className="logo-lg landing-logo" />
                :
                <img src={logoDark} alt="logo" className="logo-lg landing-logo" />
              }
              <span className="badge bg-brand-color-2 rounded-pill ms-2 theme-version">
                v1.2.4
              </span>
            </Link>
          </div>

          <SimpleBar className="navbar-content" style={{ maxHeight: "100vh" }}>
            <ul className="pc-navbar" id="pc-navbar">
              <NestedMenu menuItems={menuItems} />
            </ul>
          </SimpleBar>
          <Card className="pc-user-card">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img
                    src={avatar1}
                    alt="user-image"
                    className="user-avtar wid-45 rounded-circle"
                    width={45}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <Link to="#" className="arrow-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,20"></Link>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      {/* Substitua o "John Smith" pelo nome do usuário extraído do token */}
                      <h6 className="mb-0">{userName}</h6>
                      <small>{userStaff}</small>
                    </div>

                    <Dropdown>
                      <Dropdown.Toggle
                        variant="a"
                        className="btn btn-icon btn-link-secondary avtar arrow-none"
                        data-bs-offset="0,20"
                      >
                        <i className="ph-duotone ph-windows-logo"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <ul>
                          <li><Dropdown.Item className="pc-user-links">
                            <i className="ph-duotone ph-user"></i>
                            <span>Meu Perfil</span>
                          </Dropdown.Item></li>
                           
                          <li><Dropdown.Item className="pc-user-links" onClick={handleLogout}>
                            <i className="ph-duotone ph-power"></i>
                            <span>Logout</span>
                          </Dropdown.Item></li>
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </nav>
    </React.Fragment >
  );
};

export default Header;
