import React, { useState } from 'react';
import axios from 'axios';
import './styles/AuthForms.css';
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters long')
        .max(32, 'Username must be at most 32 characters long')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
})

function LoginForm({ setView }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
    const [serverErrors, setServerErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    
    const onSubmit = async (data) => {
        try {
            setServerErrors({});
            setLoginSuccess(false);
            
            const response = await axios.post('/api/auth/login', {
                username: data.username,
                password: data.password
            });
            
            setLoginSuccess(true);
            setServerErrors({
                success: `Login successful! Welcome back, ${data.username}!`,
                token: response.data.token,
                username: data.username,
                role: response.data.role
            });
            
            localStorage.setItem('token', response.data.token);
            
        } catch (error) {
            if (error.response?.status === 401) {
                setServerErrors({ general: 'Invalid username or password. Please try again.' });
            }
            else if (error.response?.data?.message) {
                setServerErrors({ general: error.response.data.message });
            }
            else {
                setServerErrors({ general: 'An unexpected error occurred. Please try again later.' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <h2>Login</h2>

            {serverErrors.general && (
                <div className="main-error-message">{serverErrors.general}</div>
            )}

            {loginSuccess && serverErrors.success && (
                <div className="success-message">{serverErrors.success}</div>
            )}

            <div className="form-group">
                <input type="text" placeholder="Username" {...register('username')}/>
                {errors.username && <span className="error-message">{errors.username.message}</span>}
            </div>

            <div className="form-group">
                <input type="password" placeholder="Password" {...register('password')}/>
                {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className="form-link">
                Don't have an account? <span onClick={() => setView('register')} className="form-link-button">Register here</span>
            </div>

            {/*<div className="server-response">*/}
            {/*    <strong>Server Response:</strong>*/}
            {/*    <pre>{JSON.stringify(serverErrors, null, 2)}</pre>*/}
            {/*</div>*/}

        </form>
    );
}

export default LoginForm;