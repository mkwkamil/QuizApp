import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LoginRequestDto, RegisterFormDto } from "@store/auth/authTypes.ts";

export interface LoginFormLayoutProps {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<LoginRequestDto>;
    errors: FieldErrors<LoginRequestDto>;
    isSubmitting: boolean;
    serverError: string;
}

export interface RegisterFormLayoutProps {
    onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<RegisterFormDto>;
    errors: FieldErrors<RegisterFormDto>;
    isSubmitting: boolean;
    serverError: string;
}