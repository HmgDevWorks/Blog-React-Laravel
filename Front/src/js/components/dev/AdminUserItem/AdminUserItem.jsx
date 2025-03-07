import React from 'react';
import './AdminUserItem.css'; // Importa el archivo CSS

const AdminUserItem = ({ user, onDelete }) => {
  return (
    <div className="admin-user-item">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <span className="user-name">{user.name}</span>
      <button className="delete-button" onClick={() => onDelete(user.id)}>Eliminar</button>
    </div>
  );
};

export default AdminUserItem;