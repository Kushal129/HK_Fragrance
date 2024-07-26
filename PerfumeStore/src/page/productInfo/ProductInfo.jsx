import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router-dom';
import { fireDB } from '../../firebase/FirebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const [isClicked, setIsClicked] = useState(false);
    const [products, setProducts] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const handleClick = () => {
        setIsClicked(!isClicked); // Toggle the click state
    }

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductData();
    }, [params.id]);

    const addCart = (product) => {
        const existingProduct = cartItems.find(item => item.id === product.id);
        
        if (existingProduct) {
            // If product exists, update the quantity
            const updatedCart = cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            dispatch({ type: 'cart/updateCart', payload: updatedCart });
            toast.success('Increased quantity in cart');
        } else {
            // If product does not exist, add to cart
            dispatch(addToCart({ ...product, quantity: 1 }));
            toast.success('Added to cart');
        }
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {products ? (
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img
                                alt="ecommerce"
                                className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
                                src={products.imgurl}
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    HK-Fragrance
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    {products.title}
                                </h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                fill={i < 4 ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-4 h-4 text-bgcolor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                        <span className="text-gray-600 ml-3">4 Reviews</span>
                                    </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                                        <a className="text-gray-500">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                            </svg>
                                        </a>
                                        <a className="text-gray-500">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                            </svg>
                                        </a>
                                        <a className="text-gray-500">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                    {products.description}
                                </p>

                                <div className="flex">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        ₹{products.price}
                                    </span>
                                    <button 
                                        onClick={() => addCart(products)} 
                                        className="flex ml-auto text-white bg-bgcolor border-0 py-2 px-6 focus:outline-none hover:bg-bgcolor/80 rounded"
                                    >
                                        Add To Cart
                                    </button>
                                    <button
                                        onClick={handleClick}
                                        className={`rounded-full w-10 h-10 ${isClicked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'} p-0 border-0 inline-flex items-center justify-center ml-4`}
                                    >
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-6 h-6"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className='text-black m-5 text-3xl text-center'>Loading Product...</p>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export default ProductInfo;
