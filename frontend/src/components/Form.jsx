import { useState } from 'react'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

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
                <p className='mb-24 dark:text-zinc-200'>Logo</p>
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
                        <p className='text-sm w-64 mb-10 pl-2 text-zinc-700 dark:text-zinc-100'>Don't have an account? Register <Link className='underline' to='/register'>here</Link>.</p>
                    ) : (
                        <p className='text-sm w-64 mb-10 pl-2 text-zinc-700 dark:text-zinc-100'>Already have an account? Login <Link className='underline' to='/login'>here</Link>.</p>
                    )}
                    <button type='submit' className='py-2 w-64 rounded-md bg-cyan-600 dark:bg-cyan-800 text-white font-semibold hover:bg-opacity-70 dark:hover:bg-opacity-70'>{name}</button>
                </form>
            </div>
        </div>
    );
}

export default Form