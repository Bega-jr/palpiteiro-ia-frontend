import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function Login() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem('firebaseToken', await result.user.getIdToken());
    setUser(result.user);
  };

  const logout = () => {
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
