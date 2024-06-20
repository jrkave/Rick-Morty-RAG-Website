import Form from '../components/Form'
import NavBar from '../components/NavBar'

function Login() {
    return (
        <div>
            <NavBar/>
            <Form route='/api/token/' method='login'/>
        </div>
    );
};

export default Login