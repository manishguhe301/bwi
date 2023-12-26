import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const SearchAndFilter = ({ search, setSearch, filter, setFilter }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className='p-8 flex justify-between flex-wrap'>
      <TextField
        label='Search'
        variant='outlined'
        value={search}
        onChange={handleSearchChange}
        style={{ marginRight: '20px', flexBasis: '45%', marginBottom: '20px' }}
      />
      <FormControl
        variant='outlined'
        style={{ flexBasis: '45%', marginBottom: '20px' }}
      >
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label='Filter'
          style={{ width: '100%' }}
        >
          <MenuItem value='up'>Price: Low to High</MenuItem>
          <MenuItem value='down'>Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SearchAndFilter;
