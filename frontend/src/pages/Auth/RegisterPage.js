import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { registerSchema } from '../../schemas/authSchema';
import {
    Container,
    Typography,
    Box,
    useTheme,
    FormControl,
    InputAdornment,
    OutlinedInput,
    InputLabel
} from "@mui/material";
import {
    PersonOutline as PersonIcon,
    MailOutline as MailIcon,
    LockOutlined as LockIcon,
} from '@mui/icons-material';
import {
    AuthFormButton,
    CaptionError,
    MainErrorBox,
    StyledPaper
} from "../../components/Auth/StyledMaterialComponents";

function RegisterPage() {
    const theme = useTheme();
    const { handleRegister } = useAuth();
    const [serverError, setServerError] = useState('');
    
    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting}
        } = useForm({resolver: yupResolver(registerSchema)});
    
    const onSubmit = async (data) => {
        setServerError('');
        await handleRegister(
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
            }}>
            <StyledPaper elevation={3}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} 
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         gap: 2
                     }}>
                    <Typography variant="h4" component="h1" 
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            textAlign: 'center',
                            color: theme.palette.mode === 'dark' ? '#fff' : '#333'
                        }}>
                        Register
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

                    <FormControl variant="outlined" fullWidth error={!!errors.email}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput id="email" label="Email" {...register('email')}
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <MailIcon color={errors.email ? 'error' : 'action'} />
                                           </InputAdornment>
                                       }
                        />
                        {errors.email && <CaptionError error={errors.email.message} />}
                    </FormControl>

                    <FormControl variant="outlined" fullWidth error={!!errors.password}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput id="password" label="Password" type="password" {...register('password')}
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <LockIcon color={errors.password ? 'error' : 'action'} />
                                           </InputAdornment>
                                       }
                        />
                        {errors.password && <CaptionError error={errors.password.message} />}
                    </FormControl>

                    <FormControl variant="outlined" fullWidth error={!!errors.confirmPassword}>
                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                        <OutlinedInput id="confirmPassword" label="Confirm Password" type="password" {...register('confirmPassword')}
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <LockIcon color={errors.confirmPassword ? 'error' : 'action'} />
                                           </InputAdornment>
                                       }
                        />
                        {errors.confirmPassword && <CaptionError error={errors.confirmPassword.message} />}
                    </FormControl>

                    <AuthFormButton isSubmitting={isSubmitting} buttonLabel="Register" />

                    <Typography variant="body2" 
                        sx={{
                            mt: 2,
                            textAlign: 'center',
                            color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.primary'
                        }}>
                        Already have an account?{' '}
                        <Link to="/login"
                            sx={{
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}>
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </StyledPaper>
        </Container>
    )
}

export default RegisterPage;