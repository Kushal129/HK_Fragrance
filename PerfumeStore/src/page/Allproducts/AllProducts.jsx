import React, { useContext, useEffect, useState } from 'react';
import Filter from '../../components/Filter/Filter';
import Layout from '../../components/Layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { LuPackageSearch } from 'react-icons/lu';

function Allproducts() {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const addCart = (product) => {
    const quantity = quantities[product.id] || 1; 
    dispatch(addToCart({ ...product, quantity }));
    toast.success('Added to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Filter />
      <section className={`body-font ${mode === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-600'}`}>
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              Our Latest Collection
            </h1>
            <div className={`h-1 w-20 ${mode === 'dark' ? 'bg-bgcolor' : 'bg-bgcolor'} rounded`}></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {product
              .filter((obj) => obj.title.toLowerCase().includes(searchkey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .filter((obj) => obj.price.includes(filterPrice))
              .map((item) => {
                const { title, price, imgurl, id } = item;
                return (
                  <div key={id} className={`bg-${mode === 'dark' ? 'gray-800' : 'white'} rounded-lg shadow-lg flex flex-col`}>
                    <img className="rounded-t-lg w-full h-48 object-cover" src={imgurl} alt={title} />
                    <div className="flex flex-col sm:grid sm:grid-cols-2 items-center space-y-2 sm:space-y-0 p-4">
                      <div className="flex space-x-2 w-full justify-center sm:justify-start">
                        <button
                          onClick={() => handleQuantityChange(id, Math.max(1, (quantities[id] || 1) - 1))}
                          type="button"
                          className="bg-red-500 text-white px-3 py-1 rounded-l focus:outline-none focus:ring-1 focus:ring-red-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          disabled={(quantities[id] || 1) <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantities[id] || 1}
                          onChange={(e) => handleQuantityChange(id, parseInt(e.target.value, 10))}
                          className="w-16 text-center border border-gray-300 rounded-md focus:ring-1 focus:ring-bgcolor"
                          min="1"
                        />
                        <button
                          onClick={() => handleQuantityChange(id, (quantities[id] || 1) + 1)}
                          type="button"
                          className="bg-bgcolor text-white px-3 py-1 rounded-r focus:outline-none focus:ring-1 focus:ring-bgcolor"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex justify-center sm:justify-end w-full">
                        <button
                          onClick={() => window.location.href = `/productinfo/${id}`}
                          type="button"
                          className="text-gray-800 hover:text-gray-600"
                          aria-label="View product details"
                        >
                          <LuPackageSearch size={24} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between flex-grow p-4">
                      <div>
                        <h2 className={`text-sm font-semibold mb-1 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {title}
                        </h2>
                        <p className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          ₹{price}
                        </p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => addCart(item)}
                          className={`bg-bgcolor hover:bg-mdlight text-white font-semibold rounded-lg text-sm py-2 px-4 transition-colors duration-300 w-full ${mode === 'dark' ? 'bg-bgcolor hover:bg-mdlight' : ''}`}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Allproducts;
