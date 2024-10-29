import Dashboard from "../pages/Dashboard";
import Avisos from "../pages/Avisos";
import Pedidos from "../pages/Pedidos";
import Clientes from "../pages/Clientes";
import Produtos from "../pages/Produtos";
import Fretes from "../pages/Fretes"
import Categorias from "../pages/Categorias";
import Usuarios from "../pages/Usuarios";
import Links from "../pages/Links";
import Configuracoes from "../pages/Configuracoes";


import LoginV1 from "../pages/Pages/Login";
import Registerv1 from "../pages/Pages/Register";
import ForgotPassowordV1 from "../pages/Pages/ForgotPassword";

import Resetpasswordv1 from "../pages/Pages/ResetPassword";
import CodeVerificationV1 from "../pages/Pages/CodeVerification";
import Error404 from "../pages/Pages/Error404";
import ConnectionLost from "../pages/Pages/ConnectionLost";
import UnderConstruction from "../pages/Pages/UnderConstruction";
import ComingSoon from "../pages/Pages/ComingSoon";
import OthersRequest from "../pages/Pedidos/othersRequest";
import ClientDetails from "../pages/Clientes/ClientDetails";
import AddCategorie from "../pages/Categorias/AddCategorie";
import path from "path";

const routes = [

    { path: "/", component: <Dashboard /> },
    { path: "/avisos", component: <Avisos /> },
    { path: "/pedidos", component: <Pedidos /> },
    { path: "/clientes", component: <Clientes /> },
    { path: "/produtos", component: <Produtos /> },
    { path: "/fretes", component: <Fretes /> },
    { path: "/categorias", component: <Categorias /> },
    { path: "/usuarios", component: <Usuarios /> },
    { path: "/links", component: <Links /> },    
    { path: "/configuracoes", component: <Configuracoes /> },
    { path: "/others-request", component: <OthersRequest /> },
    { path: "/client-details/:id", component: <ClientDetails /> }, // Adicionar a rota para ClientDetails
    { path: "/add-categorie", component: <AddCategorie /> }
    
];

const nonAuthRoutes = [

    //Authentication1
    { path: "/login", component: <LoginV1 /> },
    { path: "/register", component: <Registerv1 /> },
    { path: "/forgot-password", component: <ForgotPassowordV1 /> },
    { path: "/reset-password", component: <Resetpasswordv1 /> },
    { path: "/code-verification", component: <CodeVerificationV1 /> },
    { path: "/error-404", component: <Error404 /> },
    { path: "/connection-lost", component: <ConnectionLost /> },
    { path: "/under-construction", component: <UnderConstruction /> },
    { path: "/coming-soon", component: <ComingSoon /> },

]

export {
    routes,
    nonAuthRoutes
}
