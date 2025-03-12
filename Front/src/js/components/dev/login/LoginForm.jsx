import { useState } from 'react';
import logo from '../../../../assets/logo_pluma.svg';
import './LoginForm.css';
import userService from '../../../services/userService';
import { Navigate } from 'react-router-dom';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [login, setLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('username:', username);
        // console.log('password:', password);
        // console.log('email:', email);
        // console.log('confirmPassword:', confirmPassword);
        if (!login && password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const data = login ?
            { email: username, password: password }
            :
            { name_user: username, email_user: email, password_user: password, password_user_confirmation: confirmPassword };
        const request = login ?
            userService.getOneUser(data)
            :
            userService.createUser(data);

        request
            .then(data => {
                localStorage.setItem("authToken", data.authToken)
                Navigate("/")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
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
                <LoginFormInput id="username" label="Email" type="text" placeholder="ej@gmail.com" onChange={handleUsernameChange} />
                <LoginFormInput id="password" label="Contraseña" type="password" placeholder="Contraseña" onChange={handlePasswordChange} />
                {!login &&
                    <><LoginFormInput id="password" label="Confirmar contraseña" type="password" placeholder="Confirmar contraseña" onChange={handleConfirmPasswordChange} />
                        <LoginFormInput id="email" label="Email" type="text" placeholder="Email" onChange={handleEmailChange} /></>}
                {login && <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox checkbox " />
                        <span className="ml-2">Recuerdame</span>
                    </label>
                </div>}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-btn">
                    {login ? "Iniciar Sesion" : "Registrarse"}
                </button>
                <hr className="my-4 login-divider" />
                <p className='bottom-text'>
                    Tambien puedes: <button type="button" className="text-blue-500 underline" onClick={() => setLogin(login => !login)}>{login ? "Crear una cuenta" : "Iniciar Sesion"}</button>
                </p>
            </div>
        </form>
    );

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