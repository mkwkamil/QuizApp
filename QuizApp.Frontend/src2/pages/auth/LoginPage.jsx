import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/auth/useAuth";
import AuthFormLayout from "../../components/auth/AuthFormLayout";
import { loginSchema } from '../../schemas/authSchema';
import { PersonOutline as PersonIcon, LockOutlined as LockIcon } from '@mui/icons-material';

export default function LoginPage() {
    const { handleLogin } = useAuth();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async (data) => {
        setServerError('');
        await handleLogin(data, msg => setServerError(msg));
    };

    const fields = [
        {
            id: 'username',
            label: 'Username',
            icon: PersonIcon,
            error: errors.username,
            register: register('username')
        },
        {
            id: 'password',
            label: 'Password',
            icon: LockIcon,
            type: 'password',
            error: errors.password,
            register: register('password')
        }
    ];

    return (
        <AuthFormLayout
            title="Login"
            fields={fields}
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Login"
            serverError={serverError}
            isSubmitting={isSubmitting}
            footerText="Don't have an account?"
            footerLink={{ href: '/register', label: 'Register here' }}
        />
    );
}