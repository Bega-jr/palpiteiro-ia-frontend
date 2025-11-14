import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
