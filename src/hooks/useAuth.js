import { useEffect, useState } from "react";
import { auth } from "../index";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCarregando(false);
    });

    return () => unsub();
  }, []);

  return { user, carregando };
}
