import Form from '../components/Form'
import NavBar from '../components/NavBar'

function Login() {
    return (
        <>
        <NavBar/>
        <div className='flex justify-center items-center h-screen bg-neutral-100 dark:bg-primary'>
            <Form route='/api/token/' method='login'/>
        </div>
        </>
    );
};

export default Login