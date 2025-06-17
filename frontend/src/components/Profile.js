import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(res.data);
            } catch (error) {
                console.error('Błąd pobierania profilu:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h2>Twój profil</h2>
            <p><strong>Username:</strong> {data.username}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Rola:</strong> {data.role}</p>
        </div>
    );
}

export default Profile;