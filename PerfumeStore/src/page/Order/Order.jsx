import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import myContext from '../../context/data/myContext';
import Loader from '../../components/Loader/Loader';

const ITEMS_PER_PAGE = 20; // Adjust as needed

const Order = () => {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedOrders, setDisplayedOrders] = useState([]);

  useEffect(() => {
    // Filter and paginate orders
    const userOrders = order.filter((obj) => obj.userid === userid);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedOrders(userOrders.slice(startIndex, endIndex));
  }, [order, currentPage, userid]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      {loading && <Loader />}
      <section className={`p-6 ${mode === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
        <div className="container mx-auto">
          {displayedOrders.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {order.cartItems.map((item, index) => (
                      <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                        <img
                          src={item.imgurl}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-3"
                          loading="lazy"
                        />
                        <h3 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                        <p className={`text-sm font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          ₹{item.price}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${mode === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Previous
                </button>
                <span className="mx-4 self-center">Page {currentPage}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={displayedOrders.length < ITEMS_PER_PAGE}
                  className={`px-4 py-2 rounded ${mode === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'} ${displayedOrders.length < ITEMS_PER_PAGE ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <h2 className="text-center text-2xl">No Orders</h2>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Order;
