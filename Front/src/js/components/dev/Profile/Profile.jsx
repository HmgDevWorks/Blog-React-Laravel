import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaCheck, FaUser } from 'react-icons/fa';
import userService from '../../../services/userService';
import { useAlert } from "../../../bootstrap/contexts/AlertContext";
import { AuthContext } from '../../../bootstrap/contexts/AuthContext';
import { data } from 'autoprefixer';
import { useTranslation } from 'react-i18next';
import Avatar from './Avatar';
function Profile() {
    const { loggedUser, logOut } = useContext(AuthContext);
    const { t } = useTranslation();
    const [userData, setUserData] = useState({ userName: "", lastName: "", bio: "", email: "" });
    const [additionalData, setAdditionalData] = useState({ likes: 0, posts: 0 });
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [email, setEmail] = useState(userData.email);

    const [provisionalBio, setProvisionalBio] = useState("");
    const [provisionalEmail, setProvisionalEmail] = useState("");
    const [pass, setPass] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { addError, addSuccess } = useAlert();

    const ofuscateEmail = (email) => {
        if (!email || email === "") {
            email = "ejemplo@email.com";
        }
        const [user, domain] = email.split("@");
        const ofuscatedUser = user[0] + "*".repeat(user.length - 1);
        const ofuscatedDomain = domain[0] + "*".repeat(domain.length - 1);
        return ofuscatedUser + "@" + ofuscatedDomain;
    }

    useEffect(() => {
        userService.getUserById(loggedUser.id)
            .then(({ data }) => {
                console.log(data);
                setUserData(data);
                setEmail(ofuscateEmail(data?.email_user));
            }).catch((error) => {
                console.log(error);
                addError(error.response.data.message);
            });
        if (loggedUser.role !== "reader") {
            // TODO get additional data
            console.log("TODO: get additional data");
            // userService.getAdditionalData()
            //     .then(({ data }) => {
            //         console.log(data);
            //         setAdditionalData(data);
            //     }).catch((error) => {
            //         console.log(error);
            //         addError(error.response.data.message);
            //     });
        }
    }, []);

    const editUser = (data) => {
        userService.editUser(data)
            .then(({ data }) => {
                console.log(data);
                addSuccess(data.message);
            }).catch((error) => {
                console.log(error);
                addError(error.response.data.message);
            });
    }

    const handleBioChange = () => {
        if (isEditingDesc) {
            setUserData({ ...userData, bio: provisionalBio });
            editUser({ "bio": provisionalBio });
            setProvisionalBio((desc) => desc = "");
        }
        setIsEditingDesc(() => false);
    };

    // const handleEmailChange = () => {
    //     if (isEditingEmail) {
    //         confirmEmailChange()
    //         // document.getElementById('email-modal').showModal();
    //     } else {
    //         setIsEditingEmail((editing) => editing = true);
    //     }
    // };

    const confirmEmailChange = (confirmPassword) => {
        if (isEditingEmail) {
            setUserData({ ...userData, email: provisionalEmail });
            editUser({ "email_user": provisionalEmail });
            setProvisionalEmail((email) => email = "");
        }
        // userService.checkPassword(confirmPassword)
        //     .then((passResponse) => {
        //         console.log(passResponse);
        //         setUserData({ ...userData, email: provisionalEmail });
        //         editUser({ "email_user": provisionalEmail });
        //         setProvisionalEmail((email) => email = "");
        //     }).catch((error) => {
        //         console.log(error);
        //         addError(error.response.data.message);
        //     });

        setIsEditingEmail(() => false);
        // set
    };

    // const handlePasswordChange = () => {
    //     if (isEditingPassword) {
    //         if (newPassword === confirmPassword) {
    //             document.getElementById('password-modal').showModal();
    //         } else {
    //             addError("Las contraseñas no coinciden");
    //         }
    //     } else {
    //         setIsEditingPassword((editing) => editing = true);
    //     }
    // };

    const confirmPasswordChange = () => {
        if (newPassword !== confirmPassword) {
            console.log("PASS 1", newPassword);
            console.log("PASS 2", confirmPassword);
            addError("Las contraseñas no coinciden");
            return;
        }
        userService.updatePassword({
            "current_password": pass,
            "new_password": newPassword
        }).then(({ data }) => {
            console.log(data);
            setIsEditingPassword(false);
            setNewPassword("");
            setPass("");
        }).catch((error) => {
            console.log(error);
            addError(error.response.data.message);
        });
    };

    const confirmDeleteUser = (confirmPassword) => {
        console.log("Implementar bien");
        // TODO Implementar
        // userService.changePass(confirmPassword)
        //     .then(({ data }) => {
        //         console.log(data);
        //         userService.deleteUser(loggedUser.id)
        //             .then(({ data }) => {
        //                 console.log(data);
        //                 logOut();
        //             }).catch(error => {
        //                 console.log(error);
        //                 addError(error.response.data.message);
        //             });
        //     }).catch((error) => {
        //         console.log(error);
        //         addError(error.response.data.message);
        //     });
    }


    return (
        <div className="container mx-auto p-4">
            <div className="card mx-auto">
                <div className="card-body flex flex-col gap-4 justify-center items-center w-full">
                    <div className="flex flex-row gap-8 sm:flex-row justify-between items-center max-w-sm">
                        {loggedUser.role !== "reader" && (
                            <div className="text-center">
                                <p className="text-2xl font-bold">{additionalData.likes}</p>
                                <p className="text-sm">{t("profile.fav")}</p>
                            </div>
                        )}
                        {/* <div className="avatar">
                            <div className="w-24 rounded-full">
                                {data.img && <img src="/path-to-profile-image.jpg" alt="Profile" />}
                                {!data.img && <FaUser className='w-full h-full' />}
                            </div>
                        </div> */}
                        <Avatar img={data.img_user} imageUpdate={editUser} />
                        {loggedUser.role !== "reader" && (
                            <div className="text-center">
                                <p className="text-2xl font-bold">{additionalData.posts}</p>
                                <p className="text-sm">{t("profile.posts")}</p>
                            </div>
                        )}
                    </div>

                    <div className="text-center md:text-left w-full max-w-md">
                        <h2 className="text-2xl font-boldtext-2xl font-bold text-center">{userData.name_user} {userData.name_lastName ? " " + userData.name_lastName : ""}</h2>
                        <div className="mt-2 flex items-center mx-auto" >
                            {isEditingDesc ? (
                                <textarea
                                    className="textarea textarea-bordered w-full out-of-range:border-red-500"
                                    defaultValue={userData.bio ? userData.bio : ""}
                                    onChange={(e) => setProvisionalBio((bio) => bio = e.target.value)}
                                    maxLength={200}
                                    minLength={0}
                                ></textarea>
                            ) : (
                                <p className='text-center'>{userData.bio ? userData.bio : "Haz click para editar tu descripción"}</p>
                            )}
                            <button className="btn btn-square btn-sm ml-2" onClick={handleBioChange}>
                                {isEditingDesc ? <FaCheck /> : <FaEdit />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">{t("profile.email")}</span>
                            </label>
                            {!isEditingEmail && (
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-lg">{email}</span>
                                    <button className="btn btn-square btn-sm" onClick={() => setIsEditingEmail(() => true)}>
                                        <FaEdit />
                                    </button>
                                </div>
                            )}
                            {isEditingEmail && (
                                <div className="mt-2 w-full">
                                    <input
                                        type="email"
                                        className="input input-bordered w-full"
                                        defaultValue={t("email")}
                                        onChange={(e) => setProvisionalEmail(e.target.value)}
                                    />
                                    <button className="btn btn-primary mt-2 w-full" onClick={confirmEmailChange}>
                                        {t("profile.formConfirm")}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">{t("profile.pass")}</span>
                            </label>
                            {!isEditingPassword && (
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-lg">********</span>
                                    <button className="btn btn-square btn-sm" onClick={() => setIsEditingPassword(() => true)}>
                                        <FaEdit />
                                    </button>
                                </div>
                            )}
                            {isEditingPassword && (
                                <div className="mt-2 w-full">
                                    <input type="password" onChange={(e) => setPass(e.target.value)} placeholder={t("Current.pass")} className="input input-bordered mb-2 w-full" />
                                    <input type="password" onChange={(e) => setNewPassword(e.target.value)} placeholder={t("Nueva.contraseña")} className="input input-bordered mb-2 w-full" />
                                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t("Confirmar.nueva.contraseña")} className="input input-bordered mb-2 w-full" />
                                    <button className="btn btn-primary w-full" onClick={confirmPasswordChange}>
                                        {t("profile.formConfirm")}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <button className="btn btn-error btn-outline" onClick={() => document.getElementById('delete-modal').showModal()}>
                            {t("profile.delete")}
                        </button>
                    </div>
                </div>
            </div>

            {/* <dialog id="email-modal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box" onSubmit={(e) => {
                    e.preventDefault();
                    confirmEmailChange(e.target.currentPassword.value);
                }}>
                    <h3 className="font-bold text-lg">{t("profile.modalEmailTitle")}</h3>
                    <input type="password" name="currentPassword" placeholder="Ingresa tu contraseña" className="input input-bordered mt-4 w-full" />
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">{t("profile.confirmBtn")}</button>
                        <button className="btn" onClick={() => setIsEditingEmail(false)}>{t("profile.cancelBtn")}</button>
                    </div>
                </form>
            </dialog>

            <dialog id="password-modal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box" onSubmit={(e) => {
                    e.preventDefault();
                    confirmPasswordChange(e.target.currentPassword.value);
                }}>
                    <h3 className="font-bold text-lg">{t("profile.modalPassTitle")}</h3>
                    <input type="password" name="currentPassword" placeholder="Ingresa tu contraseña actual" className="input input-bordered mt-4 w-full" />
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">{t("profile.confirmBtn")}</button>
                        <button className="btn" onClick={() => setIsEditingPassword(false)}>{t("profile.cancelBtn")}</button>
                    </div>
                </form>
            </dialog> */}

            <dialog id="delete-modal" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box" onSubmit={(e) => {
                    e.preventDefault();
                    confirmDeleteUser(e.target.currentPassword.value);
                }}>
                    <h3 className="font-bold text-lg">{t("profile.modalDeleteTitle")}</h3>
                    <p className="py-4">{t("profile.modalDeleteInfo")}</p>
                    <div className="form-control">
                        <input type="email" placeholder="Confirma tu correo electrÃ³nico" className="input input-bordered mb-2" />
                        <input type="password" name="currentPassword" placeholder="Ingresa tu contraseÃ±a" className="input input-bordered mb-2" />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-error">{t("profile.delete")}</button>
                        <button className="btn">{t("profile.cancelBtn")}</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}

export default Profile;