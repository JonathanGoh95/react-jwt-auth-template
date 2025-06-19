// src/components/Dashboard/Dashboard.jsx

import { useContext, useEffect, useState } from 'react';
import { index } from '../../services/userService';
import { UserContext } from '../../contexts/UserContext';


const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const fetchedUsers = await index()
        setUsers(fetchedUsers)
      }catch (err){
        console.log(err);
        throw new Error(err);
      }
    }
    if (user) fetchUsers();
  },[user])
  
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>
      <ul>
        {users.map((user,idx)=>(<li key={idx}>Username {idx + 1}: {user.username}</li>))}
      </ul>
    </main>
  );
};

export default Dashboard;

