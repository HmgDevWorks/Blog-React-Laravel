export const getToken = () => {
    let token = sessionStorage.getItem("authToken");
    if (!token){
        token = localStorage.getItem("authToken");
    }
    return token;
}