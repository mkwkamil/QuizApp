import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@schemas/authSchema";
import type { LoginRequestDto } from "@store/auth/authTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "@hooks/auth/useLogin";
import { LoginFormLayout } from "@components/auth/LoginFormLayout";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const loginMutation = useLogin();
    const [serverError, setServerError] = useState('');

    const redirectPath = (location.state as { from?: string })?.from ?? '/';
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginRequestDto>({ resolver: yupResolver(loginSchema) });
    
    const onSubmit = async (data: LoginRequestDto) => {
        setServerError('');
        try {
            await loginMutation.mutateAsync(data);
            navigate(redirectPath, { replace: true });
        } catch (err: any) {
            setServerError(err.message || 'An error occurred during login.');
        }
    }
    
    return (
        <LoginFormLayout
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            serverError={serverError}
        />
    );
}

export default LoginPage;