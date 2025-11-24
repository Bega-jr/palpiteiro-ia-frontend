import React, { useState } from "react";
import { auth } from "../index";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

import "../styles/login.css";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN GOOGLE
  const loginGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro no login Google:", error);
      setErro("Falha ao entrar com Google.");
    } finally {
      setLoading(false);
    }
  };

  // LOGIN EMAIL/SENHA
  const loginEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
      console.error("Erro no login e-mail:", error);
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Acessar Conta</h2>

      {erro && <ErrorMessage message={erro} />}

      {loading ? (
        <Loading />
      ) : (
        <>
          <button className="btn-google" onClick={loginGoogle}>
            Entrar com Google
          </button>

          <div className="divider">ou</div>

          <form onSubmit={loginEmail} className="form-login">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit" className="btn-email">
              Entrar com E-mail
            </button>
          </form>
        </>
      )}
    </div>
  );
}
