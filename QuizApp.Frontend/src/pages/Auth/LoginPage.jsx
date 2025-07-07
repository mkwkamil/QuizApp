import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import {
    StyledPaper,
    MainErrorBox,
    CaptionError,
    AuthFormButton
} from "../../components/auth/StyledMaterialComponents";
import { loginSchema } from '../../schemas/authSchema';
import {
    Box,
    Container,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useTheme
} from '@mui/material';
import {
    PersonOutline as PersonIcon,
    LockOutlined as LockIcon,
} from '@mui/icons-material';

function LoginPage() {
    const theme = useTheme();
    const { handleLogin } = useAuth();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm({resolver: yupResolver(loginSchema)});

    const onSubmit = async (data) => {
        setServerError('');
        await handleLogin(
            data,
            message => setServerError(message)
        );
    };

    return (
        <Container component="main" maxWidth="xs"
            sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '100vh',
                py: 4,
                marginTop: '-5vh'
            }}>
            <StyledPaper elevation={3}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}>
                    <Typography variant="h4" component="h1"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            textAlign: 'center',
                            color: theme.palette.mode === 'dark' ? '#fff' : '#333'
                        }}>
                        Login
                    </Typography>

                    {serverError && <MainErrorBox error={serverError} />}

                    <FormControl variant="outlined" fullWidth error={!!errors.username}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput id="username" label="Username" {...register('username')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon color={errors.username ? 'error' : 'action'} />
                                </InputAdornment>
                            }
                        />
                        {errors.username && <CaptionError error={errors.username.message} />}
                    </FormControl>

                    <FormControl variant="outlined" fullWidth error={!!errors.password}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput id="password" type="password" label="Password" {...register('password')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon color={errors.password ? 'error' : 'action'} />
                                </InputAdornment>
                            }
                        />
                        {errors.password && <CaptionError error={errors.password.message} />}
                    </FormControl>
                    
                    <AuthFormButton isSubmitting={isSubmitting} buttonLabel="Login" />

                    <Typography variant="body2"
                        sx={{
                            mt: 2,
                            textAlign: 'center',
                            color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary'
                        }}>
                        Don't have an account?{' '}
                        <Link to="/register"
                            sx={{
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}>
                            Register here
                        </Link>
                    </Typography>
                </Box>
            </StyledPaper>
        </Container>
    );
}

export default LoginPage;