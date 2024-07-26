import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { LuPackageSearch } from "react-icons/lu";

function ProductCard() {
    const context = useContext(myContext);
    const { mode, product, searchkey, filterPrice, filterType } = context;

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: quantity,
        }));
    };

    const addCart = (item) => {
        const quantity = quantities[item.id] || 1;
        const serializableProduct = {
            ...item,
            quantity,
            time: item.time.toDate ? item.time.toDate().toISOString() : new Date().toISOString(),
        };
        dispatch(addToCart(serializableProduct));
        toast.success('Added to cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <section className={`text-gray-600 body-font ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Our Latest Collection
                    </h1>
                    <div className={`h-1 w-20 bg-bgcolor rounded ${mode === 'dark' ? 'bg-bgcolor-dark' : ''}`}></div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {product.filter((obj) => obj.title.includes(searchkey))
                        .filter((obj) => obj.category.includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice)).slice(0.8).map((item, index) => {
                            const { id, title, price, imgurl } = item;
                            return (
                                <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                    <div className="relative">
                                        <img
                                            className="w-full h-48 object-cover rounded-t-lg"
                                            src={imgurl}
                                            alt={title}
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4 text-white">
                                            <h2 className="text-xs font-medium mb-1">HK-Fragrance</h2>
                                            <h1 className="text-lg font-medium mb-2">{title}</h1>
                                            <p className="text-base">₹ {price}</p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 items-center mb-4 space-y-2 sm:space-y-0">
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
                                                    onChange={(e) => handleQuantityChange(id, parseInt(e.target.value))}
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
                                        <button
                                            onClick={() => addCart(item)}
                                            type="button"
                                            className={`text-white bg-bgcolor hover:bg-bgcolor/75 focus:ring-4 font-medium rounded-lg text-sm w-full py-2 ${mode === 'dark' ? 'focus:ring-bgcolor-dark' : 'focus:ring-bgcolor'}`}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>

                                </div>

                            );
                        })}
                </div>
            </div>
        </section>
    );
}

export default ProductCard;
