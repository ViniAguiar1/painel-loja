import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import { menuItems, menuFuncionarios } from "./MenuData";

const Sidebar = () => {
  const router = useLocation();
  const [openMenu, setOpenMenu] = useState<any>({});
  const userLevel = 5; // Simule ou substitua por um nível real do usuário

  const handleMenuClick = (id: any) => {
    setOpenMenu((prevOpenMenu: any) => {
      const newOpenMenu = { ...prevOpenMenu, [id]: !prevOpenMenu[id] };
      if (userLevel === 5) {
        newOpenMenu["menuFuncionarios"] = !prevOpenMenu["menuFuncionarios"];
      }
      return newOpenMenu;
    });
  };

  useEffect(() => {
    const initialOpenMenu: any = {};

    const checkSubmenu = (submenu: any) => {
      return submenu ? submenu.some((subItem: any) => router.pathname.startsWith(subItem.link)) : false;
    };

    menuItems.forEach((menuItem: any) => {
      if (menuItem.submenu) {
        initialOpenMenu[menuItem.id] = checkSubmenu(menuItem.submenu);
        menuItem.submenu.forEach((subItem: any) => {
          if (subItem.submenu) {
            initialOpenMenu[subItem.id] = checkSubmenu(subItem.submenu);
          }
        });
      } else {
        initialOpenMenu[menuItem.id] = router.pathname === menuItem.link;
      }
    });

    setOpenMenu(initialOpenMenu);
  }, [router.pathname]);

  useEffect(() => {
    localStorage.setItem("openMenu", JSON.stringify(openMenu));
  }, [openMenu]);

  const isMenuActive = (menuItem: any) => router.pathname === menuItem.link;

  return (
    <React.Fragment>
      {(menuItems || []).map((item: any, key: any) => (
        <React.Fragment key={key}>
          {!item["isHeader"] ? (
            <>
              {!item.submenu ? (
                <li className={`pc-item ${isMenuActive(item) ? "active" : ""}`}>
                  <Link to={item.link} className="pc-link">
                    <span className="pc-micon">
                      <i className={`${item.icon}`}></i>
                    </span>
                    <span className="pc-mtext">{item.label}</span>
                    {item.badge && <span className="pc-badge">{item.badge}</span>}
                  </Link>
                </li>
              ) : (
                <li
                  className={`pc-item pc-hasmenu ${openMenu[item.id] ||
                    item.submenu?.some((subItem: any) =>
                      isMenuActive(subItem)
                    )
                    ? "pc-trigger active"
                    : ""
                  }`}
                >
                  <span className="pc-link" onClick={() => handleMenuClick(item.id)}>
                    <span className="pc-micon">
                      <i className={`${item.icon}`}></i>
                    </span>
                    <span className="pc-mtext">{item.label}</span>
                    <span className="pc-arrow">
                      <FeatherIcon icon="chevron-right" />
                    </span>
                  </span>
                  <ul
                    className={`pc-submenu ${openMenu[item.id] ? "open" : ""}`}
                    style={{ display: openMenu[item.id] ? "block" : "none" }}
                  >
                    {(item.submenu || []).map((subItem: any, key: any) => (
                      !subItem.submenu ? (
                        <li
                          className={`pc-item ${isMenuActive(subItem) ? "active" : ""}`}
                          key={key}
                        >
                          <Link className="pc-link" to={subItem.link || "#"} data-page={subItem.dataPage}>
                            {subItem.label}
                          </Link>
                        </li>
                      ) : (
                        <li
                          className={`pc-item ${isMenuActive(subItem) ? "active" : ""}`}
                          key={key}
                        >
                          <Link className="pc-link" to={subItem.link || "#"} data-page={subItem.dataPage}>
                            {subItem.label}
                          </Link>
                          <ul className="pc-submenu" style={{ display: openMenu[item.id] ? "block" : "none" }}>
                            {(subItem.submenu || []).map((childItem: any, key: any) => (
                              <li className="pc-item" key={key}>
                                <Link className="pc-link" target="_blank" to={childItem.link || "#"}>
                                  {childItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    ))}
                  </ul>
                </li>
              )}
            </>
          ) : (
            <li className="pc-item pc-caption">
              <label>{item.label}</label>
            </li>
          )}
        </React.Fragment>
      ))}
      
      {/* Renderiza menuFuncionarios para nível de usuário 5 */}
      {userLevel === 5 && (
        menuFuncionarios.map((funcItem: any, funcKey: any) => (
          <li
            key={funcKey}
            className={`pc-item ${isMenuActive(funcItem) ? "active" : ""}`}
          >
            <Link to={funcItem.link} className="pc-link">
              <span className="pc-micon">
                <i className={`${funcItem.icon}`}></i>
              </span>
              <span className="pc-mtext">{funcItem.label}</span>
            </Link>
          </li>
        ))
      )}
    </React.Fragment>
  );
};

export default Sidebar;
