import './AdminUserItem.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import userService from '../../../services/userService'; // Importa el servicio para cambiar roles

const AdminUserItem = ({ user_id, user, onDelete, onRoleChange }) => {
  const { t } = useTranslation();
  const Navigate = useNavigate();

  const handleRoleChange = (event) => {
    userService.changeUserRole(user_id) // Llama al servicio para cambiar el rol
      .then(() => {
        onRoleChange(user_id); // Actualiza el estado en el componente padre
      })
      .catch(error => {
        console.error('Error al cambiar el rol del usuario:', error);
      });
  };

  return (
    <div className="admin-user-item">
      {/* <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div> */}
      <span className="user-name">{user}</span>
      <div className="buttons">
      <select className="role-select" onChange={handleRoleChange}>
          <option value="1">{t("admin")}</option>
          <option value="2">{t("viewer")}</option>
        </select>
        <button className="view-posts-button" onClick={() => Navigate(`/author/${user_id}`)}>{t("posts")}</button>
        <button className="delete-button" onClick={() => onDelete(user_id)}>{t("admin.delete")}</button>
        
      </div>
    </div>
  );
};

export default AdminUserItem;