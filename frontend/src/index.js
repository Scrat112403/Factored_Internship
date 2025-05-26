//Import libraries, component and styles
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//Create a root DOM node to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

//Render the App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
