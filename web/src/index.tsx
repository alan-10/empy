// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './index.css'; 
import './global.css';
import { ContextProvider } from './useContext'

ReactDOM.render(

  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
