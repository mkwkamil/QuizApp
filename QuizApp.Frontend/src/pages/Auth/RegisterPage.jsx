import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import AuthFormLayout from "../../components/auth/AuthFormLayout";
import { registerSchema } from '../../schemas/authSchema';
import {
    PersonOutline as PersonIcon,
    MailOutline as MailIcon,
    LockOutlined as LockIcon,
} from '@mui/icons-material';

export default function RegisterPage() {
    const { handleRegister } = useAuth();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: yupResolver(registerSchema) });

    const onSubmit = async (data) => {
        setServerError('');
        await handleRegister(data, msg => setServerError(msg));
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
            id: 'email',
            label: 'Email',
            icon: MailIcon,
            error: errors.email,
            register: register('email')
        },
        {
            id: 'password',
            label: 'Password',
            icon: LockIcon,
            type: 'password',
            error: errors.password,
            register: register('password')
        },
        {
            id: 'confirmPassword',
            label: 'Confirm Password',
            icon: LockIcon,
            type: 'password',
            error: errors.confirmPassword,
            register: register('confirmPassword')
        }
    ];

    return (
        <AuthFormLayout
            title="Register"
            fields={fields}
            onSubmit={handleSubmit(onSubmit)}
            submitLabel="Register"
            serverError={serverError}
            isSubmitting={isSubmitting}
            footerText="Already have an account?"
            footerLink={{ href: '/login', label: 'Login here' }}
        />
    );
}