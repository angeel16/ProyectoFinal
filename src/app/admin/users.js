// src/pages/admin/users.js
import { useEffect, useState } from 'react';
import { getUsers } from '../../lib/actions';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <div>
            <h1>Registered Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
