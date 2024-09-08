import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Loader from '../../components/Loader/Loader';
import Layout from '../../components/Layout/Layout';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const validateForm = () => {
        let valid = true;
        if (!name) {
            toast.error("Name is required", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            valid = false;
        }

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

    const signup = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const user = {
                name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            };

            // Add user data to Firestore
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);

            toast.success("SignUp Successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            toast.error("Signup failed. Please try again.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
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
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name='name'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Name'
                        />
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
                    <div>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
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
                        </div>
                        {passwordError && <p className='text-red-500'>{passwordError}</p>}
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={signup}
                            className='bg-bgcolor w-full text-white font-bold px-2 py-2 rounded-lg'>
                            Signup
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white'>
                            Have an account? <Link className='text-bgcolor font-bold' to={'/login'}>Login</Link>
                        </h2>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Signup;
