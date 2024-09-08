import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import Layout from '../../components/Layout/Layout';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Login() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    const login = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } catch (error) {
            toast.error("Invalid Email or Password");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            {loading && <Loader />}
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name='email'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Email'
                        />
                        {emailError && <p className='text-red-500'>{emailError}</p>}
                    </div>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute inset-y-0 right-0 flex items-center pr-3'
                        >
                            {showPassword ? <AiOutlineEyeInvisible className='text-gray-400 mb-3' /> : <AiOutlineEye className='text-gray-400 mb-3' />}
                        </button>
                        {passwordError && <p className='text-red-500'>{passwordError}</p>}
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={login}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Login
                        </button>
                    </div>
                    <div className='text-white'>

                        <h4 className='text-white'>
                            Don't have an account <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link>
                        </h4>
                        <Link to='/reset-password' className='text-yellow-500 text-[13px] font-bold'>
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
