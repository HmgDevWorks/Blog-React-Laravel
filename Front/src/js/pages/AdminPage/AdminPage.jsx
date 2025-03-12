import React, { use, useEffect, useState } from 'react';
import AdminUserItem from "../../components/dev/AdminUserItem/AdminUserItem";
import './AdminPage.css'; // Importa el archivo CSS
import userService from '../../services/userService';


const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
    .getUsers()
    .then(({data}) => {
      setUsers(data);
    });
  }, []);

  const handleDelete = (userId) => {
    userService
    .deleteUser(userId)
    .then(() => {
      setUsers(users.filter(user => user.id !== userId));
    })
    .catch(error => {
      console.error('Error al eliminar el usuario:', error);
    });
  };
  
  return (
    <div className="admin-page-container">
      <h1 className="Titulo_Admin_Page">Pagina de administración</h1>
      <div className="admin-users">
        {users.map(user => (
          <AdminUserItem 
          key={user.id}
          user_id={user.id} 
          user={ `${user.name_user}${user.name_lastName ? ' ' + user.name_lastName : ''}`
} 
          onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
