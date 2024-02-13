import { useContext, useState } from 'react';
import {
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to='/home' />;
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async () => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: username,
        password: password,
      });
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      const { data } = res;
      navigate('/home', { state: { response: data } });
    } catch (error) {
      alert('An error ocurred, please try again later...');
    }
  };

  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center bg-[#f5f5f5] '>
      <Box
        sx={{
          boxShadow: '0 0 10px rgba(0,0,0,0.15)',
        }}
        className='p-8 rounded-2xl shadow-xl flex flex-col gap-4'
      >
        <ShoppingCartIcon style={{ fontSize: 60, color: '#3f51b5' }} />
        <h1 className='text-center text-[#3f51b5] font-bold font-[Montserrat]'>
          Welcome to Our Shopping Site
        </h1>
        <TextField
          label='Username'
          variant='outlined'
          value={username}
          onChange={handleUsernameChange}
          style={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            fontFamily: 'Montserrat',
          }}
        />
        <TextField
          label='Password'
          variant='outlined'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          style={{ backgroundColor: '#fff', borderRadius: '5px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant='contained'
          disabled={username === '' || password === ''}
          onClick={loginUser}
          style={{
            backgroundColor:
              username === '' || password === '' ? '#D3D3D3' : '#3f51b5',
            color: '#fff',
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
          }}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
