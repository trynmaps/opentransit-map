import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Home from './AppRenderer';
import registerServiceWorker from './helpers/registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
