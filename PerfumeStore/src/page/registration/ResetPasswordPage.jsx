import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import Layout from '../../components/Layout/Layout';

function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            setEmailError('Email is required');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent. Please check your inbox.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setEmail('');
        } catch (error) {
            toast.error('Error sending password reset email');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='flex justify-center items-center min-h-screen'>
                {loading && <Loader />}
                <div className='bg-gray-800 px-6 py-8 rounded-xl shadow-lg max-w-sm w-full'>
                    <h1 className='text-center text-white text-2xl mb-6 font-bold'>Reset Your Password</h1>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-700 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-300 outline-none transition-shadow duration-200 focus:shadow-outline focus:ring-2 focus:ring-yellow-500'
                        placeholder='Enter your email'
                    />
                    {emailError && <p className='text-red-400 mb-4'>{emailError}</p>}
                    <button
                        onClick={handleResetPassword}
                        className='bg-yellow-500 hover:bg-yellow-600 transition-colors w-full text-black font-bold px-4 py-2 rounded-lg'>
                        Send Password Reset Email
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default ResetPasswordPage;
