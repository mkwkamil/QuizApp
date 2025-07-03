import {
    Box,
    Typography,
    Paper,
    Stack,
    Button,
    Chip,
    IconButton,
    Modal,
    TextField
} from '@mui/material';
import {
    Quiz,
    EmojiEvents,
    Edit,
    Close as CloseIcon,
} from '@mui/icons-material';
import '@fontsource/poppins';
import {useProfileData} from "../../hooks/useProfileData";
import Loading from "../../components/Loading";
import AvatarWithUpload from "../../components/AvatarWithUpload";
import {useState, useEffect} from 'react';
import {toast} from "react-toastify";
import {updateUserProfile} from "../../hooks/updateUserProfile";
import api from "../../config/axiosConfig";
import {Link} from "react-router-dom";
import DeleteQuizModal from "../../components/DeleteQuizModal";

function ProfilePage() {
    const profileData = useProfileData();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);
    
    const [userQuizzes, setUserQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await api.get('/quiz/mine');
                setUserQuizzes(res.data);
            } catch (err) {
                console.error('Failed to load quizzes:', err);
            }
        };

        void fetchQuizzes();
    }, []);

    useEffect(() => {
        if (profileData) {
            setName(profileData.publicName);
            setBio(profileData.bio);
        }
    }, [profileData]);

    if (!profileData) {
        return <Loading />;
    }
    
    const handleSave = async () => {
        try {
            await updateUserProfile({ publicName: name, bio });
            toast.success('Profile updated successfully');
            setOpenEditModal(false);

            profileData.publicName = name;
            profileData.bio = bio;
        } catch (err) {
            toast.error('Failed to update profile');
        }
    };
    
    const promptDeleteQuiz = (quiz) => {
        setQuizToDelete(quiz);
        setDeleteModalOpen(true);
    };

    const confirmDeleteQuiz = async () => {
        try {
            await api.delete(`/quiz/${quizToDelete.id}`);
            setUserQuizzes(prev => prev.filter(q => q.id !== quizToDelete.id));
            setDeleteModalOpen(false);
            setQuizToDelete(null);
        } catch (error) {
            console.error("Failed to delete quiz", error);
        }
    };

    const activityData = [
        { id: 1, action: "Created quiz", title: "Advanced JavaScript Patterns", time: "2h ago" },
        { id: 2, action: "Solved quiz", title: "React Hooks Challenge", score: "95%", time: "1d ago" }
    ];

    const achievements = [
        { id: 1, name: "Fast Learner", icon: "🏎️", unlocked: true },
        { id: 2, name: "Quiz Creator", icon: "🛠️", unlocked: true },
        { id: 3, name: "Mastermind", icon: "🧠", unlocked: false }
    ];

    return (
        <Box sx={{
            display: 'flex',
            minHeight: 'calc(100vh - 64px)',
            p: 4,
            gap: 4,
            background: 'radial-gradient(circle at top right, #202020 0%, #121212 100%)',
            color: '#ffffff' 
        }}>
            <Box sx={{
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                height: 'calc(100vh - 128px)'
            }}>
                <Paper sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    position: 'relative'
                }}>
                    <IconButton
                        onClick={() => setOpenEditModal(true)}
                        sx={{ position: 'absolute', top: 8, right: 8, color: '#ccc' }}
                    >
                        <Edit />
                    </IconButton>
                    <Stack alignItems="center" spacing={2}>
                        <AvatarWithUpload avatarUrl={profileData.avatar} />
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            fontFamily="Poppins, sans-serif"
                            color="#fff"
                        >
                            {profileData.publicName}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="#aaa"
                            textAlign="center"
                            sx={{ fontStyle: 'italic' }}
                        >
                            {profileData.bio}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Chip
                                label={`${profileData.stats.quizzesCreated} quizzes`}
                                icon={<Quiz fontSize="small" />}
                                sx={{ bgcolor: 'rgba(100,100,255,0.2)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)' }}
                            />
                            <Chip
                                label={`${profileData.stats.accuracy} accuracy`}
                                icon={<EmojiEvents fontSize="small" />}
                                sx={{ bgcolor: 'rgba(100,255,100,0.2)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)' }}
                            />
                        </Stack>
                    </Stack>
                </Paper>

                <Paper sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                    <Typography variant="h6" color="#fff" fontFamily="Poppins, sans-serif" gutterBottom>
                        Basic Info
                    </Typography>
                    <Stack spacing={2}>
                        {profileData.basicInfo.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#aaa' }}>
                                        {item.label}
                                    </Typography>
                                    <Typography sx={{ color: '#fff' }}>{item.value}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Paper>

                <Paper sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    flex: 1
                }}>
                    <Typography
                        variant="h6"
                        color="#fff"
                        fontFamily="Poppins, sans-serif"
                        gutterBottom
                    >
                        Achievements
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        {achievements.map(ach => (
                            <Chip
                                key={ach.id}
                                icon={<span style={{ fontSize: '1rem' }}>{ach.icon}</span>}
                                label={ach.name}
                                color={ach.unlocked ? 'success' : 'default'}
                                sx={{
                                    color: 'white',
                                    opacity: ach.unlocked ? 1 : 0.6,
                                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            />
                        ))}
                    </Stack>
                </Paper>
            </Box>

            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                height: 'calc(100vh - 128px)', 
                overflow: 'auto'
            }}>
                <Paper sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    flex: 1
                }}>
                    <Typography
                        variant="h6"
                        color="#fff"
                        fontFamily="Poppins, sans-serif"
                        gutterBottom
                    >
                        Recent Activity
                    </Typography>
                    <Stack spacing={2}>
                        {activityData.map(item => (
                            <Box
                                key={item.id}
                                sx={{
                                    p: 2,
                                    '&:hover': {
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: 1
                                    }
                                }}
                            >
                                <Box sx={{ color: '#fff', fontSize: 18 }}>
                                    <strong>{item.action}:</strong> {item.title}
                                    {item.score && (
                                        <Chip
                                            label={item.score}
                                            size="small"
                                            sx={{
                                                ml: 1,
                                                bgcolor: 'rgba(70,130,255,0.3)',
                                                boxShadow: '0 0 8px rgba(70,130,255,0.8)'
                                            }}
                                        />
                                    )}
                                </Box>
                                <Typography variant="caption" sx={{ color: '#aaa' }}>
                                    {item.time}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Paper>

                <Paper sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    flex: 1
                }}>
                    <Typography variant="h6" color="#fff" fontFamily="Poppins, sans-serif" gutterBottom>
                        My Quizzes
                    </Typography>
                    <Stack spacing={2}>
                        {userQuizzes.map(quiz => (
                            <Paper
                                key={quiz.id}
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        background: 'rgba(255,255,255,0.1)',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        sx={{ color: '#fff', mb: 0.5 }}
                                    >
                                        {quiz.title}
                                    </Typography>

                                    {quiz.isDraft && (
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: 'orange',
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                                letterSpacing: 0.5
                                            }}
                                        >
                                            DRAFT
                                        </Typography>
                                    )}

                                    <Stack direction="row" spacing={1} sx={{ color: '#aaa' }}>
                                        <Typography variant="caption">{quiz.questionsCount} questions</Typography>
                                        <Typography variant="caption">• {quiz.plays} plays</Typography>
                                        <Typography variant="caption">• ⭐ {quiz.averageRating.toFixed(1)}</Typography>
                                    </Stack>
                                </Box>

                                <Stack direction="row" spacing={1}> 
                                    <Link to={`/quiz/edit/${quiz.id}`}>
                                        <Button variant="outlined" size="small" sx={{color: '#00e5ff', borderColor: '#00e5ff', '&:hover': { bgcolor: 'rgba(0, 229, 255, 0.1)' }}}>
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button variant="outlined" size="small" sx={{color: '#AF1323FF', borderColor: '#AF1323FF', '&:hover': { bgcolor: 'rgba(175, 19, 35, 0.2)' }}}   onClick={() => promptDeleteQuiz(quiz)}
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Paper>
            </Box>
            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}
                sx={{
                    backdropFilter: 'blur(2px)',
                }}>
                <Box sx={{
                    p: 4,
                    width: { xs: '90vw', sm: 500 },
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    boxShadow: (theme) => `0px 4px 16px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
                    mx: 'auto',
                    my: '10vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: 'linear-gradient(90deg, #1976d2, #0d47a1)',
                        opacity: 0.8
                    }
                }}>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                            color: 'text.secondary',
                            '&:hover': {
                                color: 'text.primary',
                                transform: 'rotate(90deg)',
                                transition: 'transform 0.3s ease',
                            }
                        }}
                        onClick={() => setOpenEditModal(false)}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        variant="h5"
                        fontWeight={600}
                        sx={{
                            mb: 1,
                            color: 'text.primary'
                        }}
                    >
                        Edit Profile
                    </Typography>

                    <TextField
                        label="Public Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'divider',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />

                    <TextField
                        label="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                    />

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button variant="outlined"
                            sx={{
                                flex: 1,
                                py: 1,
                                borderWidth: 1,
                                '&:hover': {
                                    borderWidth: 1,
                                }
                            }}
                            onClick={() => setOpenEditModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained"
                            sx={{
                                flex: 1,
                                py: 1,
                                background: 'linear-gradient(90deg, #1565c0, #0d47a1)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #0d47a1, #082f6a)',
                                }
                            }}
                            onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <DeleteQuizModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={confirmDeleteQuiz}
                quizTitle={quizToDelete?.title}
            ></DeleteQuizModal>
        </Box>
        
    );
}

export default ProfilePage;