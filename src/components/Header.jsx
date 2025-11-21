import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function Header({ user }) {

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-blue-600 text-white p-6 text-center">
      <h1 className="text-4xl font-bold">Palpiteiro IA</h1>

      {user ? (
        <div className="mt-4">
          <span className="mr-4">Olá, {user.displayName}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-xl mt-4 hover:bg-gray-100"
        >
          Login com Google
        </button>
      )}
    </header>
  );
}
