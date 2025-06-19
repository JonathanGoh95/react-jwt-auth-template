// SignUpForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try{
        const newUser = await signUp(formData)
        setUser(newUser)
        navigate('/')
        // console.log(newUser)
    }catch(err){
        setMessage(err.message)
        setFormData({
            username: '',
            password: '',
            passwordConf: '',
        })
    }
    // console.log(formData); // this line will print the form data to the console
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <fieldset>
      <legend>Sign Up</legend>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm'>Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type='submit' disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </fieldset>
  );
};

export default SignUpForm;
