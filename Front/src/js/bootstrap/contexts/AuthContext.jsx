import { createContext, useEffect, useState } from "react";
import userService from "../../services/userService";
const AuthContext = createContext();

function AuthProviderWrapper(props) {
    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Corrección de nombre

    let token = sessionStorage.getItem("authToken");
    if (!token) {
        token = localStorage.getItem("authToken");
    }
    const [JWT, setJWT] = useState(token);


    const authenticateUser = () => {
        if (JWT) {
            userService
                .verifyUser(JWT)
                .then(({ data }) => {
                    console.log(data)
                    setLoggedUser(data.user);
                })
                .catch(error => {
                    console.error("Error:", error);
                    logOut(); // En caso de error, aseguramos que no haya usuario logueado
                    //setLoggedUser(null); 
                })
                .finally(() => {
                    setIsLoading(false); // Se ejecuta siempre, con éxito o error
                });
        } else {
            setIsLoading(false); // Si no hay token, también terminamos la carga
        }
    };

    const logOut = () => {
        // sessionStorage.clear();
        sessionStorage.removeItem("authToken");
        localStorage.removeItem("authToken");
        setLoggedUser(null);
        setIsLoading(false);
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedUser, JWT, setJWT, authenticateUser, isLoading, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProviderWrapper };
