import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
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
        <div className='flex flex-col items-center justify-center text-center h-screen'>
            <div>
                <p>Logo</p>
            </div>
            <div className='px-24'>
                <h2 className='py-16 text-2xl font-bold'>Welcome back</h2>
                <form onSubmit={handleSubmit} className='space-y-10 pb-20'>
                    <div className='px-4'>
                        <input
                            className='form-input h-10 w-64 pl-2 rounded-md border'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'/>
                    </div>
                    <div className='px-4'>
                        <input
                            className='form-input h-10 w-64 pl-2 rounded-md border'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'/>
                    </div>
                    <button type='submit' className='py-2 px-10 w-64 rounded-md bg-blue-400'>{name}</button>
                </form>
            </div>
        </div>
    );
}

export default Form