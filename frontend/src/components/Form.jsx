import { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { TbUfo } from 'react-icons/tb';

function Form({ route, method }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === 'login' ? 'Login' : 'Register'

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='flex flex-col items-center justify-center text-center px-12 py-10 
        bg-white border dark:bg-lighter dark:border-lightest
        shadow-md rounded-md'>
            <div>
                <TbUfo className='text-4xl mb-20 text-green-600 dark:text-green-500'/>
            </div>
            <div>
                {method === 'login' ? (
                    <h1 className='text-2xl mb-12 font-bold dark:text-zinc-100'>Welcome back</h1>
                    ) : (
                    <h1 className='text-2xl mb-12 font-bold dark:text-zinc-100'>Welcome</h1>
                )}
                <form onSubmit={handleSubmit} className='pb-20'>
                    <div className='mx-4 my-4'>
                        <input
                            className='form-input h-10 w-64 pl-2 rounded-md border dark:bg-lightest dark:border-0 dark:text-white'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'/>
                    </div>
                    <div className='mx-4 mt-4 mb-1'>
                        <input
                            className='form-input h-10 w-64 pl-2 rounded-md border dark:bg-lightest dark:border-0 dark:text-white'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'/>
                    </div>
                    {method === 'login' ? (
                        <p className='text-sm w-64 mb-10 pl-2 text-zinc-700 dark:text-zinc-100'>Don't have an account? Register <Link className='underline text-indigo-500 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-400' to='/register'>here</Link>.</p>
                    ) : (
                        <p className='text-sm w-64 mb-10 pl-2 text-zinc-700 dark:text-zinc-100'>Already have an account? Login <Link className='underline text-indigo-500 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-400' to='/login'>here</Link>.</p>
                    )}
                    <button type='submit' className='py-2 w-64 rounded-md bg-indigo-600 dark:bg-indigo-700 text-white font-semibold hover:bg-opacity-70 dark:hover:bg-opacity-70'>{name}</button>
                </form>
            </div>
        </div>
    );
}

export default Form