import React, { useEffect, useState } from "react";
import "../styles/error.css";

export default function ErrorMessage({ message }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible || !message) return null;

  return <div className="error-box">{message}</div>;
}
