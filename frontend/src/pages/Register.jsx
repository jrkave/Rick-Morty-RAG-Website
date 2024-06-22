import Form from '../components/Form'
import NavBarr from '../components/NavBar'

function Register() {
    return ( 
    <>
        <NavBarr/>
        <div className='flex justify-center items-center h-screen bg-neutral-100 dark:bg-primary'>
            <Form route='/api/user/register' method='register'/>
        </div>
    </>
    );
}

export default Register