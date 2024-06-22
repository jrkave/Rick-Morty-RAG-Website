import Form from '../components/Form'
import NavBarr from '../components/NavBar'

function Login() {
    return (
        <>
        <NavBarr/>
        <div className='flex justify-center items-center h-screen bg-neutral-100 dark:bg-primary'>
            <Form route='/api/token/' method='login'/>
        </div>
        </>
    );
};

export default Login