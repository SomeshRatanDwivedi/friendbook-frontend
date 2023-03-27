import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './providers/AuthProvide';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { SocketProvider } from './providers/SocketProvider';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
    <ToastContainer />

  </AuthProvider>
);


