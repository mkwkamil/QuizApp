import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from '@mui/material';
import { Link } from 'react-router-dom';

import {
    AuthContainer,
    AuthFormBox,
    AuthTitle,
    AuthFooterText,
    AuthLink,
    StyledPaper,
    MainErrorBox,
    CaptionError,
    AuthFormButton
} from './StyledAuthComponents';

export default function AuthFormLayout({title, fields, onSubmit, submitLabel, serverError, isSubmitting, footerText, footerLink}) {
    return (
        <AuthContainer component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <AuthFormBox component="form" onSubmit={onSubmit}>
                    <AuthTitle variant="h4" component="h1">
                        {title}
                    </AuthTitle>

                    {serverError && <MainErrorBox error={serverError} />}

                    {fields.map(({ id, label, icon: Icon, type = 'text', error, register }) => (
                        <FormControl key={id} variant="outlined" fullWidth error={!!error}>
                            <InputLabel htmlFor={id}>{label}</InputLabel>
                            <OutlinedInput
                                id={id}
                                label={label}
                                type={type}
                                {...register}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Icon color={error ? 'error' : 'action'} />
                                    </InputAdornment>
                                }
                            />
                            {error && <CaptionError error={error.message} />}
                        </FormControl>
                    ))}

                    <AuthFormButton isSubmitting={isSubmitting} buttonLabel={submitLabel} />

                    <AuthFooterText variant="body2">
                        {footerText}{' '}
                        <Link to={footerLink.href} component={AuthLink}>
                            {footerLink.label}
                        </Link>
                    </AuthFooterText>
                </AuthFormBox>
            </StyledPaper>
        </AuthContainer>
    );
}