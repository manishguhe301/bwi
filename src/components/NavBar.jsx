import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../hooks/useCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const NavBar = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { cartCount } = useCart();
  const totalQuantity = Object.values(cartCount).reduce((a, b) => a + b, 0);

  const logoutUser = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' style={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography
            variant='h4'
            component='div'
            sx={{
              flexGrow: 1,
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            ShopX
          </Typography>
          <div className='flex items-center'>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge badgeContent={totalQuantity} color='error'>
                {totalQuantity > 0 ? (
                  <ShoppingCartIcon size='30' />
                ) : (
                  <AddShoppingCartIcon size='30' />
                )}
              </Badge>
            </IconButton>
            <Button
              color='inherit'
              onClick={logoutUser}
              sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
