import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "@hooks/auth/useRegister";
import { useForm } from "react-hook-form";
import type { RegisterFormDto, RegisterRequestDto } from "@store/auth/authTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@schemas/authSchema";
import { RegisterFormLayout } from "@components/auth/RegisterFormLayout";

const RegisterPage = () => {
    const navigate = useNavigate();
    const registerMutation = useRegister();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormDto>({ resolver: yupResolver(registerSchema) });
    
    const onSubmit = async (data: RegisterRequestDto) => {
        setServerError('');
        try {
            await registerMutation.mutateAsync(data);
            navigate('/', { replace: true });
        } catch (err: any) {
            setServerError(err.message || 'An error occurred during registration.');
        }
    }
    
    return (
        <RegisterFormLayout
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            serverError={serverError}
        />
    );
};

export default RegisterPage;