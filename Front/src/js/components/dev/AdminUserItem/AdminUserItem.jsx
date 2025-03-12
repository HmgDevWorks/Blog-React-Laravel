import './AdminUserItem.css'; // Importa el archivo CSS
import { Navigate } from 'react-router-dom';

const AdminUserItem = ({ user_id, user, onDelete }) => {
  return (
    
    <div className="admin-user-item">
      {/* <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div> */}
      <span className="user-name">{user}</span>
      <div className="buttons">
        <button className="view-posts-button" onClick={() => Navigate(`/userPost/${user_id}`)}>Posts</button>
        <button className="delete-button" onClick={() => onDelete(user_id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default AdminUserItem;