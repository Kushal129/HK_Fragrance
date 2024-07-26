import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const NoPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-bgcolor text-9xl font-extrabold mb-4">404</h1>
          <p className="text-2xl font-semibold text-gray-700 mb-6">Oops! Page Not Found</p>
          <p className="text-lg text-gray-500 mb-8">The page you’re looking for doesn’t exist.</p>
          <Link to="/" className="px-6 py-3 bg-bgcolor/95 text-white text-lg font-semibold rounded hover:bg-mdlight transition duration-300">
            Go Back Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NoPage;
