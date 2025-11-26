import React from "react";

export default function ToastContainer({ toasts }) {
  return (
    <div className="fixed top-4 right-4 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow-lg text-white 
          ${
            toast.type === "error"
              ? "bg-red-600"
              : toast.type === "success"
              ? "bg-green-600"
              : "bg-gray-800"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
