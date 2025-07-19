import type { RegisterFormLayoutProps } from "@interfaces/forms.ts";
import {
    AuthErrorBox, AuthFieldErrorText, AuthFooterLink, AuthFooterText, AuthFormBox,
    AuthFormControl,
    AuthFormWrapper, AuthInputAdornment, AuthInputLabel, AuthOutlinedInput,
    AuthPaper, AuthSubmitButton,
    AuthTitle
} from "@components/auth/LoginFormLayoutStyles.tsx";
import { PersonOutline, MailOutline, LockOutlined } from '@mui/icons-material';

export const RegisterFormLayout = ({
    onSubmit,
    register,
    errors,
    isSubmitting,
    serverError
}: RegisterFormLayoutProps) => {
    return (
        <AuthFormWrapper component="main" maxWidth="xs">
            <AuthPaper elevation={3}>
                <AuthFormBox component="form" onSubmit={onSubmit}>
                    <AuthTitle variant="h4" component="h1">
                        Register
                    </AuthTitle>

                    {serverError && <AuthErrorBox>{serverError}</AuthErrorBox>}

                    <AuthFormControl variant="outlined" error={!!errors.username}>
                        <AuthInputLabel htmlFor="username">Username</AuthInputLabel>
                        <AuthOutlinedInput
                            id="username"
                            label="Username"
                            type="text"
                            {...register("username")}
                            startAdornment={
                                <AuthInputAdornment position="start">
                                    <PersonOutline sx={{ color: errors.username ? "#ff6b6b" : "#bbb" }} />
                                </AuthInputAdornment>
                            }
                        />
                        {errors.username && <AuthFieldErrorText>{errors.username.message}</AuthFieldErrorText>}
                    </AuthFormControl>

                    <AuthFormControl variant="outlined" error={!!errors.email}>
                        <AuthInputLabel htmlFor="email">Email</AuthInputLabel>
                        <AuthOutlinedInput
                            id="email"
                            label="Email"
                            type="email"
                            {...register("email")}
                            startAdornment={
                                <AuthInputAdornment position="start">
                                    <MailOutline sx={{ color: errors.email ? "#ff6b6b" : "#bbb" }} />
                                </AuthInputAdornment>
                            }
                        />
                        {errors.email && <AuthFieldErrorText>{errors.email.message}</AuthFieldErrorText>}
                    </AuthFormControl>

                    <AuthFormControl variant="outlined" error={!!errors.password}>
                        <AuthInputLabel htmlFor="password">Password</AuthInputLabel>
                        <AuthOutlinedInput
                            id="password"
                            label="Password"
                            type="password"
                            {...register("password")}
                            startAdornment={
                                <AuthInputAdornment position="start">
                                    <LockOutlined sx={{ color: errors.password ? "#ff6b6b" : "#bbb" }} />
                                </AuthInputAdornment>
                            }
                        />
                        {errors.password && <AuthFieldErrorText>{errors.password.message}</AuthFieldErrorText>}
                    </AuthFormControl>

                    <AuthFormControl variant="outlined" error={!!errors.confirmPassword}>
                        <AuthInputLabel htmlFor="confirmPassword">Confirm Password</AuthInputLabel>
                        <AuthOutlinedInput
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            {...register("confirmPassword")}
                            startAdornment={
                                <AuthInputAdornment position="start">
                                    <LockOutlined sx={{ color: errors.confirmPassword ? "#ff6b6b" : "#bbb" }} />
                                </AuthInputAdornment>
                            }
                        />
                        {errors.confirmPassword && <AuthFieldErrorText>{errors.confirmPassword.message}</AuthFieldErrorText>}
                    </AuthFormControl>

                    <AuthSubmitButton isSubmitting={isSubmitting} label={"Register"} />

                    <AuthFooterText variant="body2">
                        Already have an account?
                        <AuthFooterLink to="/login"> Login here</AuthFooterLink>
                    </AuthFooterText>
                </AuthFormBox>
            </AuthPaper>
        </AuthFormWrapper>
    );
};