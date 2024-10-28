// main.tsx
import './assets/scss/custom.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './toolkit/index.ts';
import authReducer from './toolkit/authSlice';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState: {
    auth: authReducer(undefined, { type: 'init' }), // Inicializar com o estado persistido
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.Fragment>,
);
