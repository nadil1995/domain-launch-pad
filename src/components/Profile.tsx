// src/components/Profile.tsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api'; // Import the API function

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('authToken');  // Assuming you store the token in localStorage
  
  useEffect(() => {
    if (!token) {
      setError('No token found!');
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setUserData(data);
      } catch (err) {
        setError('Failed to fetch profile.');
      }
    };
    
    fetchProfile();
  }, [token]);
  
  if (error) return <div>{error}</div>;

  return (
    <div>
      {userData ? (
        <div>
          <h1>{userData.name}</h1>
          <p>Email: {userData.email}</p>
          {/* Display other user data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
