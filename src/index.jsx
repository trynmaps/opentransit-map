import React from 'react';
import ReactDOM from 'react-dom';
import { installRelayDevTools } from 'relay-devtools';
import './styles/index.css';
import App from './App';

installRelayDevTools();

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
