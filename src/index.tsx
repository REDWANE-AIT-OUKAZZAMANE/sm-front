import React from 'react';
import ReactDOM from 'react-dom/client';
import { autoConfigureDevtools } from 'async-states-devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import 'async-states-devtools/dist/style.css';
import App from './App';
import './App.css';

autoConfigureDevtools({ open: false });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
