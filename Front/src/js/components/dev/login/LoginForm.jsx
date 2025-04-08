import { useContext, useState, useEffect } from 'react';
import logo from '../../../../assets/logo_pluma.svg';
import './LoginForm.css';
import userService from '../../../services/userService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { useAlert } from '../../../bootstrap/contexts/AlertContext';
import { useTranslation } from 'react-i18next';
import AlertContainer from '../AlertContainer/AlertContainer';

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
    const [alerts, setAlerts] = useState([]);

    const addAlert = (type, text) => {
        setAlerts((prev) => [...prev, { id: Date.now() + Math.random(), type, text }]);
    };

    // En tu componente donde usas verified:
    useEffect(() => {
        if (verified === "success") {
            addSuccess(t("login.accVerified"));
        }
    }, [verified]); // <-- Añade verified como dependencia

    const handleAlertEnd = (removedAlert) => {
        console.log("Alerta eliminada?");
        setAlerts((prev) => prev.filter(alert => alert.id !== removedAlert.id));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!login && password !== confirmPassword) {
            addAlert('error', t("errorMsg.errorPassNotSame"));
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
                    addAlert('success', t("successMsg.successLogin"));
                    navigate('/')
                } else {
                    setRegistrationComplete(true);
                    addAlert('info', t("successMsg.successSendMail"));
                }
                setJWT(data.authToken);
                authenticateUser()
                navigate('/')
                // }).then(() => {
            })
            .catch(error => {
                addAlert('error', t(error.message));
            });
    };
    // Nueva función para manejar la recuperación de contraseña
    const handleForgotPassword = (e) => {
        e.preventDefault();
        // if (resetStep === 0) {
        // Enviar solicitud de código de recuperación
        userService.requestPasswordReset({ "email_user": email })
            .then(({ data }) => {
                // setResetStep(1);
                addAlert('success', t(data.message));

            })
            .catch(error => {
                addAlert('error', t(error.message));
            });
    };
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            addAlert('error', t("errorMsg.errorPassNotSame"));
            return;
        }

        try {
            await userService.resetPassword({
                "email_user": emailParam,
                "token": tokenParam,
                "password": password
            });
            addAlert('success', t("successMsg.successUpdatePass"));
            setTimeout(() => navigate('/logIn'), 3000);
        } catch (error) {
            addAlert('error', t("errorMsg.errorUpdatePass"));
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

                    <AlertContainer alerts={alerts} onAlertEnd={() => setAlerts([])} />

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
                        <AlertContainer alerts={alerts} onAlertEnd={handleAlertEnd} />
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
                    <AlertContainer alerts={alerts} onAlertEnd={handleAlertEnd} />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-btn">
                        {t("login.sendEmail")}
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
                            <span className="ml-2 text-remember">{t("login.remember")}</span>
                        </label>
                        <p className='forgot-text'>
                            <button type="button" className="text-right text-blue-500 underline" onClick={() => setForgotPassword(true)}>
                                {t("login.forgot")}
                            </button>
                        </p>
                    </div>
                )}

                <AlertContainer alerts={alerts} onAlertEnd={handleAlertEnd} />

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