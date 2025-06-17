import { useState } from 'react';
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
    email: yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password')
});

function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const [serverErrors, setServerErrors] = useState({});
    
    const onSubmit = async (data) => {
        try {
            setServerErrors({});
            await axios.post('/api/auth/register', data);
        }
        catch (error) {
            if (error.response?.data?.details) {
                const backendErrors = {};
                Object.entries(error.response.data.details).forEach(([field, messages]) => {
                    backendErrors[field] = messages.join(', ');
                });
                setServerErrors(backendErrors);
            }
            else {
                setServerErrors({general: 'An unexpected error occurred. Please try again later.'});
            }
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <h2>Register</h2>
            {serverErrors.general && (
                <div className="main-error-message">{serverErrors.general}</div>
            )}
            
            <div className="form-group">
                <input type="text" placeholder="Username" {...register('username')} />
                {errors.username && <span className="error-message">{errors.username.message}</span>}
                {serverErrors.username && <span className="error-message">{serverErrors.username}</span>}
            </div>

            <div className="form-group">
                <input type="email" placeholder="Email" {...register('email')} />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
                {serverErrors.email && <span className="error-message">{serverErrors.email}</span>}
            </div>

            <div className="form-group">
                <input type="password" placeholder="Password" {...register('password')} />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
                {serverErrors.password && <span className="error-message">{serverErrors.password}</span>}
            </div>

            <div className="form-group">
                <input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                {serverErrors.confirmPassword && <span className="error-message">{serverErrors.confirmPassword}</span>}
            </div>

            <button type="submit">Register</button>
            
            {/*<div className="server-response">*/}
            {/*    <strong>Server Response:</strong>*/}
            {/*    <pre>{JSON.stringify(serverErrors, null, 2)}</pre>*/}
            {/*</div>*/}
        </form>
    )
}

export default RegisterForm;