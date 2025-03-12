import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()

function AuthProviderWrapper(props) {
    const [loggedUser, setLoggedUser] = useState(null)
    const [isLoadding, setIsLoadding] = useState(true)

    const autheticateUser = () => {
        const token = localStorage.getItem('authToken')

        // if (token) {

        // }
    }

    const logOut = () => {
        localStorage.removeItem('authToken')
        setLoggedUser(null)
        setIsLoadding(false)
    }

    useEffect(() => {
        autheticateUser
    }, [])

    return (
        <AuthContext.Provider value={{ loggedUser, autheticateUser, logOut, isLoadding }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }