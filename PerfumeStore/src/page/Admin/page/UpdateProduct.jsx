import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../../context/data/myContext';
import { fireDB, storage } from '../../../firebase/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import Layout from '../../../components/Layout/Layout';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(products.imgurl || '');

    useEffect(() => {
        if (products.imgurl) {
            setImageUrl(products.imgurl);
        }
    }, [products.imgurl]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImageAndGetUrl = async () => {
        if (!imageFile) return products.imgurl;
        try {
            const imageRef = ref(storage, `productImgs/${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            const url = await getDownloadURL(imageRef);
            return url;
        } catch (error) {
            console.error("Error uploading image: ", error);
            return products.imgurl;
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const imageUrl = await uploadImageAndGetUrl();
            const productRef = doc(fireDB, 'products', products.id); // Assumes products have an id
            await updateDoc(productRef, {
                ...products,
                imgurl: imageUrl
            });
            setImageUrl(imageUrl); // Update the local imageUrl state
            // Reset form or show success message
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    return (
        <Layout>

            <div className='flex justify-center items-center h-screen'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={products.title || ''}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name="title"
                            className="bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
                            placeholder="Product title"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={products.price || ''}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name="price"
                            className="bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
                            placeholder="Product price"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
    {imageUrl && (
        <img 
            src={imageUrl} 
            alt="Current product" 
            className="w-32 h-32 object-cover mr-4 rounded-lg border border-gray-500"
        />
    )}
    <label className="flex items-center bg-gray-600 px-4 py-2 w-full rounded-lg cursor-pointer hover:bg-gray-700 transition ease-in-out duration-300">
        <input
            type="file"
            onChange={handleImageChange}
            name="image"
            className="hidden"
        />
        <span className="text-white text-sm">
            {imageFile ? imageFile.name : 'Choose an new image'}
        </span>
    </label>
</div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={products.category || ''}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name="category"
                            className="bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
                            placeholder="Product category"
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            cols="30"
                            rows="5"
                            name="description"
                            value={products.description || ''}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className="bg-gray-600 px-4 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
                            placeholder="Product Description"
                        />
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={handleUpdateProduct}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UpdateProduct;
