// src/components/NavBar/NavBar.jsx
import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    // Clear token from localStorage
    localStorage.removeItem('token')
    // Clear user state
    setUser(null)
  }

  return (
    <nav>
      {user ? (
      <ul>
        <li>Welcome, {user.username}</li>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
      </ul>) : (
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/sign-in'>Sign In</Link></li>
        <li><Link to='/sign-up'>Sign Up</Link></li>
      </ul>)}
    </nav>
  );
};

export default NavBar;