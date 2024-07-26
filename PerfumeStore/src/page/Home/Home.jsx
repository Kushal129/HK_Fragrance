import React from 'react';
import Layout from '../../components/Layout/Layout';
import Herosection from '../../components/HeroSection/Herosection';
import Filter from '../../components/Filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import Track from '../../components/track/Track';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <Herosection />
      <Filter />
      <ProductCard />
      <div className='flex justify-center mt-4 mb-6'>
        <Link to='/allproducts'>
          <button className='bg-gray-300 px-4 py-2 rounded-md text-gray-800 hover:bg-gray-400 transition-colors'>
            See more
          </button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  );
};

export default Home;
