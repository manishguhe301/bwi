import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchAndFilter from '../components/SearchAndFilter';
import axios from 'axios';
import Card from '../components/Card';
import { Grid } from '@mui/material';

const Home = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const response = location.state ? location.state.response : null;

  const getProducts = async () => {
    try {
      const res = await axios.get('https://dummyjson.com/products?limit=100');
      setProducts(res.data.products);
    } catch (error) {
      alert('Some error ocurred, please try again later...');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === 'up') {
        return a.price - b.price;
      } else if (filter === 'down') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  return (
    <div>
      <NavBar response={response} />
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />
      <Grid container spacing={3} className='pl-8 pr-8'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card product={item} />
            </Grid>
          ))
        ) : (
          <div className='p-8'>No data found</div>
        )}
      </Grid>
    </div>
  );
};

export default Home;
