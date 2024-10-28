// Routes/index.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { nonAuthRoutes, routes } from './allRoutes';
import Layout from '../Layout';
import NonLayout from '../Layout/NonLayout';
import PrivateRoute from '../components/PrivateRoute';

const handleOffcanvasToggle = () => {
  // Defina a função de alternância aqui
  console.log("Offcanvas toggled");
};

const Routing = () => {
  return (
    <React.Fragment>
      <Routes>
        {(routes || []).map((item, key) => (
          <Route key={key} path={item.path} element={
            <PrivateRoute>
              <Layout handleOffcanvasToggle={handleOffcanvasToggle}>
                {item.component}
              </Layout>
            </PrivateRoute>
          } />
        ))}

        {(nonAuthRoutes || []).map((item, key) => (
          <Route key={key} path={item.path} element={
            <NonLayout>
              {item.component}
            </NonLayout>
          } />
        ))}

      </Routes>
    </React.Fragment>
  );
};

export default Routing;
