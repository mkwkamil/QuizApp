import '@fontsource/poppins';
import {useProfileData} from "../../hooks/useProfileData";
import Loading from "../../components/Loading";
import {useState, useEffect} from 'react';
import {toast} from "react-toastify";
import {updateUserProfile} from "../../hooks/updateUserProfile";
import api from "../../config/axiosConfig";
import DeleteQuizModal from "../../components/ModalComponents/DeleteQuizModal";
import ProfileCard from "../../components/ProfileComponents/ProfileCard";
import BasicInfoCard from "../../components/ProfileComponents/BasicInfoCard";
import AchievementsCard from "../../components/ProfileComponents/AchievementsCard";
import RecentActivityBox from "../../components/ProfileComponents/RecentActivityBox";
import MyQuizzesBox from "../../components/ProfileComponents/MyQuizzesBox";
import EditProfileModal from "../../components/ProfileComponents/EditProfileModal";
import {
    ProfileMainContainer,
    ProfilePageWrapper,
    ProfileSidebarContainer
} from "../../components/ProfileComponents/ProfileContainers";
import CreateQuizPromo from "../../components/CreatorPromoBox";

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
        <ProfilePageWrapper>
            <ProfileSidebarContainer>
                <ProfileCard profileData={profileData} onEditClick={() => setOpenEditModal(true)} />
                
                <BasicInfoCard basicInfo={profileData.basicInfo} />
                
                <AchievementsCard achievements={achievements} />
                
                <CreateQuizPromo />
            </ProfileSidebarContainer>

            <ProfileMainContainer>
                <RecentActivityBox activityData={activityData} />
                
                <MyQuizzesBox userQuizzes={userQuizzes} onDeleteClick={promptDeleteQuiz} />
            </ProfileMainContainer>
            
            <EditProfileModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                name={name}
                bio={bio}
                onNameChange={setName}
                onBioChange={setBio}
                onSave={handleSave} />
            <DeleteQuizModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onDelete={confirmDeleteQuiz}
                quizTitle={quizToDelete?.title} />
        </ProfilePageWrapper>
    );
}

export default ProfilePage;