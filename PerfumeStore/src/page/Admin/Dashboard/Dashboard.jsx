import React, { useContext, useState, useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { FaCartFlatbed } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/Layout/Layout';
import DashboardTab from './DashboardTab';
import { fireDB } from '../../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function Dashboard() {
    const context = useContext(myContext);
    const { mode } = context;

    const [shippingCharge, setShippingCharge] = useState('');

    // Fetch shipping charge from Firestore on component mount
    useEffect(() => {
        const fetchShippingCharge = async () => {
            try {
                const docRef = doc(fireDB, 'settings', 'shipping');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setShippingCharge(docSnap.data().amount || ''); // Default to empty string if no amount
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching shipping charge:", error);
                toast.error('Failed to fetch shipping charge');
            }
        };

        fetchShippingCharge();
    }, []);

    const handleSave = async () => {
        try {
            await setDoc(doc(fireDB, 'settings', 'shipping'), { amount: parseInt(shippingCharge, 10) });
            toast.success('Shipping charge updated successfully');
        } catch (error) {
            console.error("Error updating shipping charge:", error);
            toast.error('Failed to update shipping charge');
        }
    };

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center">
                        {/* Total Products */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 shadow-lg ${mode === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} px-4 py-6 rounded-xl transition-transform transform hover:scale-105`}>
                                <div className={`bg-yellow-400 text-white w-12 h-12 mb-3 inline-flex items-center justify-center rounded-full`}>
                                    <IoCartOutline size={40} />
                                </div>
                                <h2 className={`title-font font-medium text-3xl ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>10</h2>
                                <p className={`font-bold ${mode === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Total Products</p>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 shadow-lg ${mode === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} px-4 py-6 rounded-xl transition-transform transform hover:scale-105`}>
                                <div className={`bg-green-500 text-white w-12 h-12 mb-3 inline-flex items-center justify-center rounded-full`}>
                                    <FaCartFlatbed size={40} />
                                </div>
                                <h2 className={`title-font font-medium text-3xl ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>15</h2>
                                <p className={`font-bold ${mode === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Total Orders</p>
                            </div>
                        </div>

                        {/* Total Users */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 shadow-lg ${mode === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} px-4 py-6 rounded-xl transition-transform transform hover:scale-105`}>
                                <div className={`bg-teal-500 text-white w-12 h-12 mb-3 inline-flex items-center justify-center rounded-full`}>
                                    <FaUsers size={40} />
                                </div>
                                <h2 className={`title-font font-medium text-3xl ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>20</h2>
                                <p className={`font-bold ${mode === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Total Users</p>
                            </div>
                        </div>

                        {/* Shipping Charge */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className={`border-2 shadow-lg ${mode === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} px-4 py-6 rounded-xl`}>
                                <div className="mb-4">
                                    <p className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        Latest Shipping Charge: <span className={`font-bold ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>₹{shippingCharge}</span>
                                    </p>
                                </div>
                                <input
                                    className={`w-full px-3 py-2 rounded-md ${mode === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
                                    type="number"
                                    value={shippingCharge}
                                    onChange={(e) => setShippingCharge(e.target.value)}
                                    placeholder="Enter shipping charge"
                                />
                                <button
                                    onClick={handleSave}
                                    className={`mt-3 px-4 py-2 rounded-md text-white ${mode === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>
    );
}

export default Dashboard;
