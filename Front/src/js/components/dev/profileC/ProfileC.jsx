import './ProfileC.css';

function ProfileC() {
    const credenciales = ["Mario", "mario@gmail.com"];

    return (
        <div className="profileContainer">
            <div className="grid place-content-center h-full">
                <div className="card bg-base-100 w-[40vw] shadow-xl border-2 border-black">
                    <div className="card-body flex flex-col items-center text-center">
                        <h1 className="card-title text-3xl font-bold ">Perfil</h1>
                        <h2 className="text-xl font-semibold text-gray-500 mt-3 ">Nombre de usuario:</h2>
                        <p>{credenciales[0]}</p>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Nombre de usuario" defaultValue={credenciales[0]}/>
                        </label>
                        <h2 className="text-xl font-semibold text-gray-500 mt-3 ">Email:</h2>
                        <p>{credenciales[1]}</p>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email" defaultValue={credenciales[1]}/>
                        </label>
                        <h2 className="text-xl font-semibold text-gray-500 mt-3 ">Intro contraseña:</h2>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow"/>
                        </label>
                        <div className="card-actions flex flex-col items-center w-full mt-4">
                        <button className="btn bg-[#846a6a] text-white" >Guardar cambios</button>
                        <a href="#" className="text-red-600 underline mt-2" onClick={()=>document.getElementById('my_modal_5').showModal()}>Eliminar perfil</a>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box flex flex-col items-center text-center">
                <h3 className="font-bold text-lg">¿Seguro que quieres eliminar la cuenta?</h3>
                <div className="modal-action w-full flex justify-between">
                <button className="btn w-[7vw] bg-[#FF0000] text-white transform transition-all duration-200 hover:scale-105">Sí</button>
                <form method="dialog">
                    <button className="btn w-[7vw] bg-[#c6c7c4] text-white transform transition-all duration-200 hover:scale-105">No</button>
                </form>
                </div>
            </div>
            </dialog>
        </div>
    );
}
export default ProfileC;