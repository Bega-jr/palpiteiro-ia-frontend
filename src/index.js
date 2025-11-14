import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

// Firebase Config (substitua pelos seus dados)
const firebaseConfig = {
  apiKey: "AIzaSyDIAcBJg1FLwMBAKhAcKePw-bxi1piVlXw",
  authDomain: "palpiteiro-ia.firebaseapp.com",
  projectId: "palpiteiro-ia",
  storageBucket: "palpiteiro-ia.firebasestorage.app",
  messagingSenderId: "1063099774350",
  appId: "1:1063099774350:web:fa22f335a19e885e95a0df",
  measurementId: "G-RP2ZZKMLPF"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  // Exporte para usar no Login

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
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
