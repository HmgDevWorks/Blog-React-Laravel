import './AdminUserItem.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import rolService from '../../../services/roleSrevice'; // Importa el servicio para cambiar roles

const AdminUserItem = ({ user_id, user, currentRole, isDeleted, onDelete, onRestore, onRoleChange }) => {
  const { t } = useTranslation();
  const Navigate = useNavigate();

  const handleRoleChange = (event) => {
    const newRole = event.target.value; // Obtiene el nuevo rol seleccionado
    console.log(newRole)
    rolService.UpdateRole(user_id, { role: newRole }) // Llama al servicio para cambiar el rol
      .then(({data}) => {
        console.log(data);
        onRoleChange(user_id, newRole); // Actualiza el estado en el componente padre
      })
      .catch(error => {
        console.error('Error al cambiar el rol del usuario:', error);
      });
  };
  const handleAction = () => {
    if (isDeleted) {
      onRestore(user_id); // Llama a la función de restaurar si el usuario está eliminado
    } else {
      onDelete(user_id); // Llama a la función de eliminar si el usuario no está eliminado
    }
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
          <option value="admin">admin</option>
          <option value="reader">lector</option>
          <option value="editor">editor</option>
        </select>
        <button className="view-posts-button" onClick={() => Navigate(`/author/${user_id}`)}>{t("posts")}</button>
        <button
          onClick={handleAction}
          className={isDeleted ? 'restore-button' : 'delete-button'}
        >
          {isDeleted ? 'Restaurar' : 'Eliminar'}
        </button>     
       </div>
    </div>
  );
};

export default AdminUserItem;