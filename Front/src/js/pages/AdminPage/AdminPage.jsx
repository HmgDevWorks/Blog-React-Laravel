import React, { useEffect, useState } from 'react';
import AdminUserItem from "../../components/dev/AdminUserItem/AdminUserItem";
import './AdminPage.css'; // Importa el archivo CSS
import userService from '../../services/userService';
import { useTranslation } from 'react-i18next';

const AdminPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    userService.getUsers()
      .then(({ data }) => {
        setUsers(data);
      });
  }, []);

  const handleDelete = (userId) => {
    userService.deleteUser(userId)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const handleRoleChange = (userId, newName) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newName } : user
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
      <div className="admin-users">
        {currentUsers.map(user => (
          <AdminUserItem
            key={user.id}
            user_id={user.id}
            user={`${user.name_user}${user.name_lastName ? ' ' + user.name_lastName : ''}`}
            currentRole={user.role} // Pasa el rol actual del usuario
            onDelete={handleDelete}
            onRoleChange={handleRoleChange}
          />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex justify-center mt-4">
          <div className="join">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;