import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../index';  // Importe do index.js

export default function Login() {
  const [user, setUser] = useState(null);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem('firebaseToken', await result.user.getIdToken());
      setUser(result.user);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem('firebaseToken');
    setUser(null);
  };

  return user ? (
    <div className="text-right">
      <span className="text-sm mr-2">{user.displayName}</span>
      <button onClick={logout} className="text-xs underline">Sair</button>
    </div>
  ) : (
    <button onClick={login} className="bg-white text-blue-600 px-4 py-1 rounded border border-blue-600 hover:bg-blue-50">
      Login com Google
    </button>
  );
}
