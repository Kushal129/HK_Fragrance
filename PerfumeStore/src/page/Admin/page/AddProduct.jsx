import React, { useContext, useState } from 'react';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/Layout/Layout';
import { fireDB, storage } from '../../../firebase/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../components/Loader/Loader';
import { MdUploadFile } from "react-icons/md";

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, loading, setLoading } = context;
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        let validationErrors = {};
        if (!products.title) validationErrors.title = 'Product title is required';
        if (!products.price || isNaN(products.price)) validationErrors.price = 'Valid product price is required';
        if (!products.category) validationErrors.category = 'Product category is required';
        if (!products.description) validationErrors.description = 'Product description is required';
        if (!imageFile) validationErrors.image = 'Product image is required';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImageAndGetUrl = async () => {
        if (!imageFile) return null;
        try {
            const imageRef = ref(storage, `productImgs/${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            const url = await getDownloadURL(imageRef);
            return url;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;
        }
    };

    const handleAddProduct = async () => {
        if (!validateInputs()) return;

        try {
            const imageUrl = await uploadImageAndGetUrl();
            if (imageUrl) {
                const productData = {
                    ...products,
                    imgurl: imageUrl
                };
                setLoading(true);
                await addDoc(collection(fireDB, 'products'), productData);
                toast.success('Product successfully added!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                // Reset form or show success message
                setProducts({});
                setImageFile(null);
                setErrors({});
            } else {
                toast.error('Failed to upload image.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.error("Error adding product: ", error);
            toast.error('Error adding product.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            {loading && <Loader />}
            <div className="flex justify-center items-center min-h-screen p-2">
                <div className="bg-gray-800 px-8 py-6 rounded-xl w-full max-w-md">
                    <h1 className="text-center text-white text-2xl mb-6 font-bold">Add Product</h1>
                    <form>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={products.title || ''}
                                onChange={(e) => setProducts({ ...products, title: e.target.value })}
                                name="title"
                                className={`bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none ${errors.title ? 'border-red-500' : ''}`}
                                placeholder="Product title"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={products.price || ''}
                                onChange={(e) => setProducts({ ...products, price: e.target.value })}
                                name="price"
                                className={`bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none ${errors.price ? 'border-red-500' : ''}`}
                                placeholder="Product price"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>
                        <div className="mb-4">
                            <label className={`flex items-center border-2 border-gray-600 p-4 rounded-lg cursor-pointer hover:border-gray-700 transition ease-in-out duration-300 ${errors.image ? 'border-red-500' : ''}`}>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    name="image"
                                    className="hidden"
                                />
                                <div className="flex items-center">
                                    <MdUploadFile size={24} color='white' className="mr-3" />
                                    <span className="text-white text-sm">
                                        {imageFile ? imageFile.name : 'Choose an image'}
                                    </span>
                                </div>
                            </label>
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={products.category || ''}
                                onChange={(e) => setProducts({ ...products, category: e.target.value })}
                                name="category"
                                className={`bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none ${errors.category ? 'border-red-500' : ''}`}
                                placeholder="Product category"
                            />
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>
                        <div className="mb-4">
                            <textarea
                                cols="30"
                                rows="5"
                                name="description"
                                value={products.description || ''}
                                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                                className={`bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none ${errors.description ? 'border-red-500' : ''}`}
                                placeholder="Product Description"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                        <div className="flex justify-center mb-3">
                            <button
                                type="button"
                                onClick={handleAddProduct}
                                className="bg-yellow-500 w-full text-black font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </Layout>
    );
}

export default AddProduct;
