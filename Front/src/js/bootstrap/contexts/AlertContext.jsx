import { createContext, useContext, useState } from "react";
import { ErrorAlert, SuccessAlert } from "../../components/dev/Alerts/Alerts";

// Creamos el contexto
const AlertContext = createContext();

// Proveedor del contexto
export function AlertProvider({ children }) {
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [successMsgs, setSuccessMsgs] = useState([]);

    // Función para agregar un error
    const addError = (msg) => {
        const id = Date.now();
        setErrorMsgs((prev) => [...prev, { id, msg }]);

        setTimeout(() => {
            setErrorMsgs((prev) => prev.filter((error) => error.id !== id));
        }, 5000);
    };

    // Función para agregar un mensaje de éxito
    const addSuccess = (msg) => {
        const id = Date.now();
        setSuccessMsgs((prev) => [...prev, { id, msg }]);

        setTimeout(() => {
            setSuccessMsgs((prev) => prev.filter((success) => success.id !== id));
        }, 5000);
    };

    return (
        <AlertContext.Provider value={{ addError, addSuccess }}>
            {children}

            {/* Mostrar alertas */}
            <div className="fixed top-4 right-4 space-y-2">
                {errorMsgs.map((error) => (
                    <ErrorAlert key={error.id} msg={error.msg} />
                ))}
                {successMsgs.map((success) => (
                    <SuccessAlert key={success.id} msg={success.msg} />
                ))}
            </div>
        </AlertContext.Provider>
    );
}

// Hook para usar el contexto fácilmente
export function useAlert() {
    return useContext(AlertContext);
}
