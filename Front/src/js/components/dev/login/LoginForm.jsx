import { useContext, useState } from 'react';
import logo from '../../../../assets/logo_pluma.svg';
import './LoginForm.css';
import userService from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { ErrorAlert, SuccessAlert } from '../Alerts/Alerts';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [lastname, setLastame] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [remember, setRemember] = useState(false);

    const [login, setLogin] = useState(true);

    const { authenticateUser, setJWT } = useContext(AuthContext);

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login && password !== confirmPassword) {
            setErrorMsg('Las contraseñas no coinciden');
            return;
        }

        const data = login ?
            { email: email, password: password }
            :
            { name_user: name, name_lastName: lastname, email_user: email, password_user: password, password_user_confirmation: confirmPassword };
        const request = login ?
            userService.getOneUser(data)
            :
            userService.createUser(data);
        request
            .then(({ data }) => {
                sessionStorage.setItem("authToken", data.authToken);
                if (remember) {
                    localStorage.setItem("authToken", data.authToken);
                }
<<<<<<< HEAD
=======
                setJWT(data.authToken);
>>>>>>> main
                authenticateUser()
                setSuccessMsg('Credenciales correctas, serás redirigido en unos segundos.');
                navigate('/')
            })
            .catch(error => {
                console.log(error);
                const data = JSON.parse(error.response.data.message);
                setErrorMsg(data.error);
            });
    };

    function handleRemember() {
        setRemember((value) => !value);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLastnameChange(e) {
        setLastname(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value);
    }

    return (
        <form className="p-4 bg-white shadow-md rounded-lg login-form" onSubmit={handleSubmit}>
            <div className="text-left login-img-container">
                <img src={logo} alt="Logo" />
                <h1 className="text-2xl font-bold">C-Blog</h1>
            </div>
            <div className='form-container'>
                <LoginFormInput id="email" name="email" label={t("login.email")} type="text" placeholder="ej@gmail.com" onChange={handleEmailChange} />
                {!login && (<>
                    <LoginFormInput id="name" name="name" label={t("login.name")} type="text" placeholder={t("login.name")} onChange={handleNameChange} />
                    <LoginFormInput id="lastname" name="lastname" label={t("login.lastname")} type="text" placeholder={t("login.lastname")} onChange={handleLastnameChange} />
                </>)}
                <LoginFormInput id="password" name="password" label={t("login.pass")} type="password" placeholder="Contraseña" onChange={handlePasswordChange} />
                {!login && (<LoginFormInput id="password" label={t("login.confirmPass")} type="password" placeholder="Confirmar contraseña" onChange={handleConfirmPasswordChange} />)}
                {login && <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox checkbox " onChange={handleRemember} />
<<<<<<< HEAD
                        <span className="ml-2">Recuerdame</span>
=======
                        <span className="ml-2">{t("login.remember")}</span>
>>>>>>> main
                    </label>
                </div>}
                {errorMsg && <ErrorAlert msg={errorMsg} />}
                {successMsg && <SuccessAlert msg={successMsg} />}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-btn">
                    {login ? "Iniciar Sesion" : "Registrarse"}
                </button>
                <hr className="my-4 login-divider" />
                <p className='bottom-text'>
                    {t("login.also")} <button type="button" className="text-blue-500 underline" onClick={() => setLogin(login => !login)}>{login ? t("login.create") : t("login.login")}</button>
                </p>
            </div>
        </form>

    )
}

function LoginFormInput({ id, label, type, placeholder, onChange }) {
    return (
        <div className="mb-4 input-container">
            <label className="block text-gray-700 text-sm font-bold mb-2 login-form-label" htmlFor={id}>
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline login-form-input"
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}