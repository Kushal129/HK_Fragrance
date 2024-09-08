import React, { useEffect, useState } from 'react';
import myContext from './myContext';
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, setDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

function MyState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)";
        } else {
            setMode('light');
            document.body.style.backgroundColor = "rgb(255, 255, 255)";
        }
    };

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState({
        title: '',
        price: '',
        imgurl: '',
        category: '',
        description: '',
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const addProduct = async () => {
        if (!products.title ||
            !products.price ||
            !products.imgurl ||
            !products.category ||
            !products.description) {
            return toast.error("Please fill all the fields");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            toast.success("Product added successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
        } catch (error) {
            console.log(error);
            toast.error("Error adding product");
        } finally {
            setLoading(false);
        }
    };

    const [product, setProduct] = useState([]);

    const getProductData = async () => {
        setLoading(true);

        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArry = [];
                QuerySnapshot.forEach((doc) => {
                    productArry.push({ ...doc.data(), id: doc.id });
                });

                setProduct(productArry);
            });

            return () => data();

        } catch (error) {
            console.log(error);
            toast.error("Error fetching products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    // edit product 
    const edithandle = (item) => {
        setProducts(item);
    };


    const UpdateProduct = async (item) => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, "products", products.id), products);
            toast.success("Product Updated successfully");
            getProductData();
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
        } catch (error) {
            console.log(error);
            toast.error("Error updating product");
        } finally {
            setLoading(false);
        }
        setProducts("");
    };


    // Delete Product Function
    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, "products", item.id));
            setTimeout(() => {
                toast.success('Product deleted successfully');
            }, 800);
            getProductData();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Error deleting product');
        } finally {
            setLoading(false);
        }
    };


    //order get 

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "order"));
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getProductData();
        getOrderData()

    }, []);


    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductData();
        getOrderData();
        getUserData();
    }, []);


    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <myContext.Provider value={{
            mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product,
            edithandle, UpdateProduct, deleteProduct, order, user, searchkey, setSearchkey,
            filterPrice, filterType, setFilterPrice, setFilterType
        }}>
            {props.children}
        </myContext.Provider>
    );
}

export default MyState;