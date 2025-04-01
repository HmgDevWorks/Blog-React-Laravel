import './AdminUserItem.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import rolService from '../../../services/roleSrevice'; // Importa el servicio para cambiar roles

const AdminUserItem = ({ user_id, user, currentRole, onDelete, onRoleChange }) => {
  const { t } = useTranslation();
  const Navigate = useNavigate();

  const handleRoleChange = (event) => {
    const newRole = event.target.value; // Obtiene el nuevo rol seleccionado
    rolService.UpdateRole(user_id, { role: newRole }) // Llama al servicio para cambiar el rol
      .then(() => {
        onRoleChange(user_id, newRole); // Actualiza el estado en el componente padre
      })
      .catch(error => {
        console.error('Error al cambiar el rol del usuario:', error);
      });
  };

  return (
    <div className="admin-user-item">
      <span className="user-name">{user}</span>
      <div className="buttons">
        <select
          className="role-select"
          value={currentRole} // Muestra el rol actual
          onChange={handleRoleChange}
        >
          <option value="1">{t("administrador")}</option>
          <option value="2">{t("viewer")}</option>
        </select>
        <button className="view-posts-button" onClick={() => Navigate(`/author/${user_id}`)}>{t("posts")}</button>
        <button className="delete-button" onClick={() => onDelete(user_id)}>{t("admin.delete")}</button>
      </div>
    </div>
  );
};

export default AdminUserItem;