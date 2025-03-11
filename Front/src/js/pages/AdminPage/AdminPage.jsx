import React, { useEffect, useState } from 'react';
import AdminUserItem from "../../components/dev/AdminUserItem/AdminUserItem";
import './AdminPage.css'; // Importa el archivo CSS

const AdminPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', image: 'path/to/image1.jpg' },
    { id: 2, name: 'Jane Smith', image: 'path/to/image2.jpg' },
    { id: 3, name: 'Michael Johnson', image: 'path/to/image3.jpg' },
    { id: 4, name: 'Emily Davis', image: 'path/to/image4.jpg' },
    { id: 5, name: 'Chris Brown', image: 'path/to/image5.jpg' },
    { id: 6, name: 'Jessica Wilson', image: 'path/to/image6.jpg' },
    { id: 7, name: 'David Martinez', image: 'path/to/image7.jpg' },
    { id: 8, name: 'Sarah Lee', image: 'path/to/image8.jpg' },
    { id: 9, name: 'Daniel Harris', image: 'path/to/image9.jpg' },
    { id: 10, name: 'Laura Clark', image: 'path/to/image10.jpg' },
    { id: 11, name: 'James Lewis', image: 'path/to/image11.jpg' },
    { id: 12, name: 'Sophia Walker', image: 'path/to/image12.jpg' },
    { id: 13, name: 'Andrew Hall', image: 'path/to/image13.jpg' },
    { id: 14, name: 'Olivia Allen', image: 'path/to/image14.jpg' },
    { id: 15, name: 'Matthew Young', image: 'path/to/image15.jpg' },
    { id: 16, name: 'Isabella King', image: 'path/to/image16.jpg' },
    { id: 17, name: 'Joshua Wright', image: 'path/to/image17.jpg' },
    { id: 18, name: 'Mia Scott', image: 'path/to/image18.jpg' },
    { id: 19, name: 'Ethan Green', image: 'path/to/image19.jpg' },
    { id: 20, name: 'Ava Adams', image: 'path/to/image20.jpg' },
  ]);

  useEffect(() => {
    // Aquí puedes hacer una llamada a la API para obtener los usuarios
    // Por ejemplo:
    // fetch('/api/users')
    //   .then(response => response.json())
    //   .then(data => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    // Aquí puedes hacer una llamada a la API para eliminar el usuario
    // Por ejemplo:
    // fetch(`/api/users/${userId}`, { method: 'DELETE' })
    //   .then(() => setUsers(users.filter(user => user.id !== userId)));
  };

  return (
    <div className="admin-page-container">
      <h1 className="Titulo_Admin_Page">Admin Page</h1>
      <div className="admin-users">
        {users.map(user => (
          <AdminUserItem key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
