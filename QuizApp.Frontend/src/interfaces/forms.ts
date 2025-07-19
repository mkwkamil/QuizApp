import React from "react";
import type {FieldErrors, UseFormRegister} from "react-hook-form";
import type {LoginRequestDto} from "@store/auth/authTypes.ts";

export interface LoginFormLayoutProps {
    onSubmit: (e?: React.BaseSyntheticEvent) => void;
    register: UseFormRegister<LoginRequestDto>;
    errors: FieldErrors<LoginRequestDto>;
    isSubmitting: boolean;
    serverError: string;
}