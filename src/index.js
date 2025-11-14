import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

// Firebase Config (substitua pelos seus dados)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "palpiteiro-ia.firebaseapp.com",
  projectId: "palpiteiro-ia",
  storageBucket: "palpiteiro-ia.appspot.com",
  messagingSenderId: "102550094423467057126",
  appId: "1:102550094423467057126:web:abc123"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon-192.png'
  });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
