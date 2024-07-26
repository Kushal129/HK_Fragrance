import React, { useContext, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";

function DashboardTab() {
    const context = useContext(myContext);
    const { mode, product, edithandle, deleteProduct, order, user  } = context;
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);


    const add = () => {
        window.location.href = '/addproduct';
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="tab container mx-auto">
                    <Tabs defaultIndex={0}>
                        <TabList className="flex justify-center space-x-2 sm:space-x-4 md:space-x-8 text-center mb-6 sm:mb-10">
                            <Tab>
                                <button
                                    type="button"
                                    className={`relative font-medium ${mode === 'dark' ? 'text-blue-400 hover:bg-transparent' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-800'} rounded-lg text-sm sm:text-xl px-3 sm:px-5 py-2 bg-transparent transition-all duration-300`}
                                >
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits className={`w-4 h-4 sm:w-6 sm:h-6 ${mode === 'dark' ? 'text-blue-400' : 'text-gray-600'}`} />
                                        Products
                                    </div>
                                    <div className={`absolute bottom-0 left-0 w-full h-0.5 ${mode === 'dark' ? 'bg-blue-400' : 'bg-gray-500'}`}></div>
                                </button>
                            </Tab>

                            <Tab>
                                <button
                                    type="button"
                                    className={`relative font-medium ${mode === 'dark' ? 'text-pink-400 hover:bg-transparent' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-800'} rounded-lg text-sm sm:text-xl px-3 sm:px-5 py-2 bg-transparent transition-all duration-300`}
                                >
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping className={`w-4 h-4 sm:w-6 sm:h-6 ${mode === 'dark' ? 'text-pink-400' : 'text-gray-600'}`} />
                                        Orders
                                    </div>
                                    <div className={`absolute bottom-0 left-0 w-full h-0.5 ${mode === 'dark' ? 'bg-pink-400' : 'bg-gray-500'}`}></div>
                                </button>
                            </Tab>

                            <Tab>
                                <button
                                    type="button"
                                    className={`relative font-medium ${mode === 'dark' ? 'text-green-400 hover:bg-transparent' : 'text-gray-700 hover:bg-gray-200 hover:text-gray-800'} rounded-lg text-sm sm:text-xl px-3 sm:px-5 py-2 bg-transparent transition-all duration-300`}
                                >
                                    <div className="flex gap-2 items-center">
                                        <FaUser className={`w-4 h-4 sm:w-6 sm:h-6 ${mode === 'dark' ? 'text-green-400' : 'text-gray-600'}`} />
                                        Users
                                    </div>
                                    <div className={`absolute bottom-0 left-0 w-full h-0.5 ${mode === 'dark' ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                                </button>
                            </Tab>

                        </TabList>

                        {/* Product Panel */}
                        <TabPanel>
                            <div className="px-2 md:px-0 mb-8 sm:mb-16">
                                <h1 className={`text-center mb-5 text-xl sm:text-3xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    Product Details
                                </h1>
                                <div className="flex lg:justify-end justify-center mb-4">
                                    <button
                                        onClick={add}
                                        type="button"
                                        className={`focus:outline-none font-medium rounded-lg text-sm px-3 sm:px-5 py-2 sm:py-2.5 ${mode === 'dark' ? 'bg-purple-700 text-white' : 'bg-pink-600 text-white'} shadow-md hover:${mode === 'dark' ? 'bg-gray-600' : 'bg-pink-700'} transition`}
                                    >
                                        <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div>
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto">
                                    <table className={`w-full text-xs sm:text-sm text-left ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <thead className={`text-xs uppercase ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
                                            <tr>
                                                <th scope="col" className="px-2 sm:px-6 py-3">S.No</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Image</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Title</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Price</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Category</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Date</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product.map((item, index) => {
                                                const { title, price, imgurl, category, date } = item;
                                                return (
                                                    <tr key={index} className={`bg-gray-50 border-b ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
                                                        <td className="px-2 sm:px-6 py-4">{index + 1}.</td>
                                                        <td className="px-2 sm:px-6 py-4 font-medium">
                                                            <img className='w-16 h-16 sm:w-24 sm:h-24 object-cover' src={imgurl} alt="Product" />
                                                        </td>
                                                        <td className="px-2 sm:px-6 py-4">{title}</td>
                                                        <td className="px-2 sm:px-6 py-4">{price}₹</td>
                                                        <td className="px-2 sm:px-6 py-4">{category}</td>
                                                        <td className="px-2 sm:px-6 py-4">{date}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex gap-2 items-center">
                                                                <button
                                                                   onClick={() => deleteProduct(item)}
                                                                    className={`text-red-500 ${mode === 'dark' ? 'hover:text-red-400' : 'hover:text-red-600'} transition`}
                                                                    aria-label="Delete product"
                                                                >
                                                                    <MdOutlineDeleteForever size={20} />
                                                                </button>
                                                                <Link to={'/updateproduct'}>
                                                                <button
                                                                   onClick={() => edithandle(item)}
                                                                   className={`text-blue-500 ${mode === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition`}
                                                                   aria-label="Edit product"
                                                                   >
                                                                    <CiEdit size={20} />
                                                                </button> 
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        {/* Orders Panel */}
                        <TabPanel>
                            <div className="px-2 md:px-0 mb-8 sm:mb-16">
                                <h1 className={`text-center mb-5 text-xl sm:text-3xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    Order Details
                                </h1>
                                <div className="relative overflow-x-auto">
                                    <table className={`w-full text-xs sm:text-sm text-left ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <thead className={`text-xs uppercase ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
                                            <tr>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Order ID</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Product</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">User</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Amount</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Status</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Date</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.map((item, index) => {
                                                const { orderId, productName, userName, amount, status, date } = item;
                                                return (
                                                    <tr key={index} className={`bg-gray-50 border-b ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
                                                        <td className="px-2 sm:px-6 py-4">{orderId}</td>
                                                        <td className="px-2 sm:px-6 py-4">{productName}</td>
                                                        <td className="px-2 sm:px-6 py-4">{userName}</td>
                                                        <td className="px-2 sm:px-6 py-4">{amount}₹</td>
                                                        <td className="px-2 sm:px-6 py-4">{status}</td>
                                                        <td className="px-2 sm:px-6 py-4">{date}</td>
                                                        <td className="px-6 py-4">
                                                            <div className=" flex gap-2">
                                                                <div className=" flex gap-2 cursor-pointer text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <div onClick={() => console.log('Order Details')}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 6h1.5m-3 3h4.5m-3 3h3m-6.75 3h6.75M10.5 3v18" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        {/* Users Panel */}
                        <TabPanel>
                            <div className="px-2 md:px-0 mb-8 sm:mb-16">
                                <h1 className={`text-center mb-5 text-xl sm:text-3xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    User Details
                                </h1>
                                <div className="relative overflow-x-auto">
                                    <table className={`w-full text-xs sm:text-sm text-left ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <thead className={`text-xs uppercase ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}>
                                            <tr>
                                                <th scope="col" className="px-2 sm:px-6 py-3">User ID</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Name</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Email</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Phone</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Role</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Date</th>
                                                <th scope="col" className="px-2 sm:px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.map((item, index) => {
                                                const { userId, name, email, phoneNumber, role, date } = item;
                                                return (
                                                    <tr key={index} className={`bg-gray-50 border-b ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
                                                        <td className="px-2 sm:px-6 py-4">{userId}</td>
                                                        <td className="px-2 sm:px-6 py-4">{name}</td>
                                                        <td className="px-2 sm:px-6 py-4">{email}</td>
                                                        <td className="px-2 sm:px-6 py-4">{phoneNumber}</td>
                                                        <td className="px-2 sm:px-6 py-4">{role}</td>
                                                        <td className="px-2 sm:px-6 py-4">{date}</td>
                                                        <td className="px-6 py-4">
                                                            <div className=" flex gap-2">
                                                                <div className=" flex gap-2 cursor-pointer text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <div onClick={() => console.log('User Details')}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 6h1.5m-3 3h4.5m-3 3h3m-6.75 3h6.75M10.5 3v18" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default DashboardTab;
