import React, { useEffect, useState } from 'react';
import AdminUserItem from "../../components/dev/AdminUserItem/AdminUserItem";
import './AdminPage.css'; // Importa el archivo CSS
import userService from '../../services/userService';
import { useTranslation } from 'react-i18next';
import PaginationComponent from '../../components/dev/PaginationComponent/PaginationComponent';

const AdminPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    userService.getUsers()
      .then(({ data }) => {
        const activeUsers = data.filter(user => !user.deleted_at); // Usuarios activos
        const deletedUsers = data.filter(user => user.deleted_at); // Usuarios eliminados
        console.log('Usuarios activos:', activeUsers);
        console.log('Usuarios eliminados:', deletedUsers);
        
        // Ordena los usuarios activos alfabéticamente por el nombre
        // const sortedUsers = activeUsers.sort((a, b) => 
          const sortedUsers = data.sort((a, b) => 

          a.name_user.localeCompare(b.name_user)
        );
        setUsers(sortedUsers);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  const handleDelete = (userId) => {
    userService.deleteUser(userId)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
        window.location.reload(); // Recarga la página después de eliminar el usuario
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const handleRestore = (userId) => {
    userService.restoreUser(userId) // Llama al servicio para restaurar el usuario
      .then(() => {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, deleted_at: null } : user
        ));
      })
      .catch(error => {
        console.error('Error al restaurar el usuario:', error);
      });
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-page-container">
      <h1 className="Titulo_Admin_Page">{t("admin.title")}</h1>
      
      {/* Sección de usuarios activos */}
      <div className="admin-users">
        <h2>{t("admin.Users")}</h2>
        {currentUsers.map(user => (
          <AdminUserItem
            key={user.id}
            user_id={user.id}
            user={`${user.name_user}${user.name_lastName ? ' ' + user.name_lastName : ''}`}
            currentRole={user.role}
            isDeleted={!!user.deleted_at} // Verifica si el usuario está eliminado
            onDelete={handleDelete}
            onRestore={handleRestore}
            onRoleChange={handleRoleChange}
          />
        ))}
      </div>
      <PaginationComponent pageCount={pageCount} currentPage={currentPage} handlePageChange={handlePageChange} />

      </div>
  );
};

export default AdminPage;