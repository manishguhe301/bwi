import { useCart } from '../hooks/useCart';

const Card = ({ product }) => {
  const { cartCount, setCartCount } = useCart();

  const handleAddToCart = () => {
    setCartCount((prevCount) => ({
      ...prevCount,
      [product.id]: (prevCount[product.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = () => {
    setCartCount((prevCount) => {
      if (prevCount[product.id] > 0) {
        return { ...prevCount, [product.id]: prevCount[product.id] - 1 };
      }
      return prevCount;
    });
  };

  return (
    <>
      <div className='max-w-sm cursor-pointer rounded-lg overflow-hidden shadow-xl m-2 bg-white border-2 border-gray-300 transform transition duration-500 ease-in-out hover:scale-105 p-4 h-98'>
        <img
          className='w-full h-48 object-cover'
          src={product.thumbnail}
          alt={product.title}
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-[1rem] mb-2 capitalize text-blue-600 truncate'>
            {product.title}
          </div>
          <p className='text-gray-700 text-base'>
            Price: <span className='font-bold'>${product.price}</span>
          </p>
          <p className='text-gray-700 text-base capitalize'>
            Discount:{' '}
            <span className='font-bold'>{product.discountPercentage}%</span>
          </p>
          <div className='mt-4'>
            <button
              onClick={handleRemoveFromCart}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-l'
              style={{ width: '40px' }}
            >
              -
            </button>
            <button className='text-gray-700 px-2 bg-gray-200 h-full w-[40px]  py-1 px-2 '>
              {cartCount[product.id] || 0}{' '}
            </button>
            <button
              onClick={handleAddToCart}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-r'
              style={{ width: '40px' }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
