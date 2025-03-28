import { useContext, useState, useEffect } from 'react';
import logo from '../../../../assets/logo_pluma.svg';
import './LoginForm.css';
import userService from '../../../services/userService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { ErrorAlert, SuccessAlert } from '../Alerts/Alerts';
import { useAlert } from '../../../bootstrap/contexts/AlertContext';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
    // Hooks - Contexts
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { authenticateUser, setJWT } = useContext(AuthContext);
    const { addError, addSuccess } = useAlert();
    //Forms
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    // Params
    const [searchParams] = useSearchParams();
    const tokenParam = searchParams.get("token"); // Si no existe, será null
    const emailParam = searchParams.get("email");
    const verified = searchParams.get("verified");
    const isPasswordResetMode = !!(tokenParam && emailParam);
    //http://localhost:5173/login?token=5NAolLsAqhPKlZtErtVYgYlVx3gK28qcYKwlhwM1CU4rgdng9xALrzLqSBs8?email=hector.m.g@hotmail.com
    // States
    const [login, setLogin] = useState(true);
    const [resetStep, setResetStep] = useState(0);
    const [registrationComplete, setRegistrationComplete] = useState(false);
    // Alerts
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // En tu componente donde usas verified:
    useEffect(() => {
        if (verified === "success") {
            addSuccess(t("login.accVerified"));
        }
    }, [verified]); // <-- Añade verified como dependencia

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
                if (login) {
                    sessionStorage.setItem("authToken", data.authToken);
                    if (remember) {
                        localStorage.setItem("authToken", data.authToken);
                    }
                    setJWT(data.authToken);
                    authenticateUser()
                    setSuccessMsg('Credenciales correctas, serás redirigido en unos segundos.');
                    navigate('/')
                } else {
                    setRegistrationComplete(true);
                    setSuccessMsg('Se ha enviado un email de confirmación a tu dirección de correo electrónico.');
                }
            })
            .catch(error => {
                console.log(error);
                const data = JSON.parse(error.response.data.message);
                setErrorMsg(data.error);
            });
    };
    // Nueva función para manejar la recuperación de contraseña
    const handleForgotPassword = (e) => {
        e.preventDefault();
        // if (resetStep === 0) {
        // Enviar solicitud de código de recuperación
        userService.requestPasswordReset({ "email_user": email })
            .then(() => {
                // setResetStep(1);
                setSuccessMsg('Se ha enviado un correo de recuperación a tu email.');
            })
            .catch(error => {
                setErrorMsg('Error al enviar el correo de recuperación.');
            });
    };
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMsg('Las contraseñas no coinciden');
            return;
        }

        try {
            await userService.resetPassword({
                "email_user": emailParam,
                "token": tokenParam,
                "password": password
            });
            setSuccessMsg('Contraseña actualizada con éxito. Redirigiendo...');
            setTimeout(() => navigate('/logIn'), 3000);
        } catch (error) {
            setErrorMsg('Error al actualizar la contraseña.');
        }
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

    if (isPasswordResetMode) {
        return (
            <form className="p-4 bg-white shadow-md rounded-lg login-form" onSubmit={handlePasswordReset}>
                <div className="text-left login-img-container">
                    <img src={logo} alt="Logo" />
                    <h1 className="text-2xl font-bold">C-Blog</h1>
                </div>
                <div className='form-container'>
                    <h2 className="text-xl font-bold mb-4">{t("recover.title")}</h2>

                    <LoginFormInput id="password" label="Nueva contraseña" type="password" placeholder="Nueva contraseña" onChange={(e) => setPassword(e.target.value)} />
                    <LoginFormInput id="confirmPassword" label="Confirmar contraseña" type="password" placeholder="Confirmar contraseña" onChange={(e) => setConfirmPassword(e.target.value)} />

                    {errorMsg && <ErrorAlert msg={errorMsg} />}
                    {successMsg && <SuccessAlert msg={successMsg} />}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-btn">
                        Cambiar contraseña
                    </button>
                </div>
            </form>
        );
    }

    // Renderizado condicional basado en el estado
    if (registrationComplete) {
        return (
            <form className="p-4 bg-white shadow-md rounded-lg login-form" onSubmit={handleSubmit}>
                <div className="text-left login-img-container">
                    <img src={logo} alt="Logo" />
                    <h1 className="text-2xl font-bold">C-Blog</h1>
                </div>
                <div className='form-container'>
                    <div className="p-4 bg-white shadow-md rounded-lg login-form">
                        <SuccessAlert msg={successMsg} />
                    </div>
                </div>
            </form>
        );
    }

    if (forgotPassword) {
        return (
            <form className="p-4 bg-white shadow-md rounded-lg login-form" onSubmit={handleForgotPassword}>
                <div className="text-left login-img-container">
                    <img src={logo} alt="Logo" />
                    <h1 className="text-2xl font-bold">C-Blog</h1>
                </div>
                <div className='form-container'>
                    <h2 className="text-xl font-bold mb-4">{t("recover.title")}</h2>
                    <LoginFormInput id="email" label="Email" type="email" placeholder="tu@email.com" onChange={handleEmailChange} />
                    {errorMsg && <ErrorAlert msg={errorMsg} />}
                    {successMsg && <SuccessAlert msg={successMsg} />}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-btn">
                        {resetStep === 0 ? "Enviar código" : resetStep === 1 ? "Verificar código" : "Cambiar contraseña"}
                    </button>
                    <p className='bottom-text'>
                        <button type="button" className="mt-4 text-blue-500 underline" onClick={() => setForgotPassword(false)}>
                            {t("recover.back")}
                        </button>
                    </p>
                </div>
            </form>
        );
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
                {login && (
                    <div className="mb-4 flex flex-row justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox checkbox " onChange={handleRemember} />
                            <span className="ml-2">{t("login.remember")}</span>
                        </label>
                        <p className='forgot-text'>
                            <button type="button" className="text-right text-blue-500 underline" onClick={() => setForgotPassword(true)}>
                                {t("login.forgot")}
                            </button>
                        </p>
                    </div>
                )}
                {errorMsg && <ErrorAlert msg={errorMsg} />}
                {successMsg && <SuccessAlert msg={successMsg} />}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-btn">
                    {login ? t("login.login") : t("login.register")}
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