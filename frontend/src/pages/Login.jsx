import React from 'react';
import NavBar from '../components/NavBar';
import Form from '../components/Form';

function Login() {
    return (
        <div className="relative h-screen overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 space stars1"></div>
                <div className="absolute inset-0 space stars2"></div>
                <div className="absolute inset-0 space stars3"></div>
            </div>
            <div className="relative z-10">
                <NavBar />
                <div className="flex justify-center items-center h-screen">
                    <Form route='/api/token/' method='login' />
                </div>
            </div>
        </div>
    );
}

export default Login;
