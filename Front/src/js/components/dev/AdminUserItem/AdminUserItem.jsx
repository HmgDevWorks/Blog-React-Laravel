import './AdminUserItem.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminUserItem = ({ user_id, user, onDelete }) => {
  const { t } = useTranslation();
  const Navigate = useNavigate();

  return (

    <div className="admin-user-item">
      {/* <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div> */}
      <span className="user-name">{user}</span>
      <div className="buttons">
        <button className="view-posts-button" onClick={() => Navigate(`/author/${user_id}`)}>{t("posts")}</button>
        <button className="delete-button" onClick={() => onDelete(user_id)}>{t("admin.delete")}</button>
      </div>
    </div>
  );
};

export default AdminUserItem;