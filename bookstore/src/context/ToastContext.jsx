import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const ctx = {
    showSuccess: (msg) => show(msg, "success"),
    showError: (msg) => show(msg, "error"),
    showInfo: (msg) => show(msg, "info"),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {/* Toast UI rendered here */}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
