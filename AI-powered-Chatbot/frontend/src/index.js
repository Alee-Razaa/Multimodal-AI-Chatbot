import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import chatStore from './components/redux/chatStore';
import {Provider} from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={chatStore}>
    <App />
    </Provider>
  </React.StrictMode>
);

