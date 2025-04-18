import { useState, useRef } from 'react';
import { FaUser, FaEdit } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../bootstrap/contexts/AlertContext';
import userService from '../../../services/userService';

export default function Avatar({ img, imageUpdate }) {
    const { t } = useTranslation();
    const { addError, addSuccess } = useAlert();
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validaciones
        if (!file.type.match(/image\/(jpeg|png)/)) {
            addError('Solo se permiten imágenes JPG o PNG');
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            addError('El tamaño máximo permitido es 4MB');
            return;
        }

        addError('');
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            setSelectedFile(file);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setLoading(true);


        userService.postUserImg(selectedFile)
            .then(({ data }) => {
                imageUpdate(data);
                setPreview(null);
                setSelectedFile(null);
                addSuccess(data.message);
            }).catch((error) => {
                addError(t(error.message));
            }).finally(() => {
                setLoading(false);
            });

        // const imageUrl = response.data.secure_url;
        // imageUpdate({ img_user: selectedFile });
    };

    return (
        <div className="relative group">
            <div className="avatar">
                <div className="w-24 relative">
                    {preview || img ? (
                        <img
                            src={preview || img}
                            alt="Profile preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <FaUser className="w-full h-full rounded-full" />
                    )}

                    <div
                        className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer shadow-sm"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaEdit />
                    </div>
                </div>
            </div>

            <input
                className="z-1000"
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
            />

            {/* Modal de confirmación */}
            {selectedFile && (
                <div className="fixed inset-0 bg-black/25 flex items-center justify-center p-4 z-1000">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirmar imagen de perfil</h3>

                        <div className="mb-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded"
                            />
                        </div>

                        <div className="flex gap-4 justify-end">
                            <button
                                className="btn btn-outline"
                                onClick={() => {
                                    setPreview(null);
                                    setSelectedFile(null);
                                }}
                                disabled={loading}
                            >
                                {t("cancel")}
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => fileInputRef.current.click()}
                            >
                                {t("profile.changeImg")}
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={handleUpload}
                                disabled={loading}
                            >
                                {loading ? t("profile.uploading") : t("confirm")}
                            </button>
                        </div>
                        {/* 
                        {error && (
                            <div className="mt-4 text-red-600 text-sm">{error}</div>
                        )} */}
                    </div>
                </div>
            )}
        </div>
    );
};