import '@fontsource/poppins';
import { useState } from 'react';
import { useProfileSummary } from "../hooks/profile/useProfileSummary";
import { useUserQuizzes } from "../hooks/profile/useUserQuizzes";

import Loading from "../components/common/Loading";
import ProfileCard from "../components/profile/ProfileCard";
import BasicInfoCard from "../components/profile/BasicInfoCard";
import CreateQuizPromo from "../components/common/CreatorPromoBox";
import RecentActivityBox from "../components/profile/RecentActivityBox";
import MyQuizzesBox from "../components/profile/MyQuizzesBox";
import DeleteQuizModal from "../components/profile/modal/DeleteQuizModal";

import { ProfileMainContainer, ProfilePageWrapper, ProfileSidebarContainer } from "../components/profile/ProfileContainers";

export default function ProfilePage() {
    const { data: profileData, isLoading: loadingProfile } = useProfileSummary();
    const { data: userQuizzes, isLoading: loadingQuizzes } = useUserQuizzes()
    const [quizToDelete, setQuizToDelete] = useState(null);
    
    if (loadingProfile || loadingQuizzes) return <Loading />;

    const activityData = [
        { id: 1, action: "Created quiz", title: "Advanced JavaScript Patterns", time: "2h ago" },
        { id: 2, action: "Solved quiz", title: "React Hooks Challenge", score: "95%", time: "1d ago" }
    ];
    
    return (
        <ProfilePageWrapper>
            <ProfileSidebarContainer>
                <ProfileCard profileData={profileData} />
                <BasicInfoCard basicInfo={profileData.basicInfo} />
                <CreateQuizPromo />
            </ProfileSidebarContainer>

            <ProfileMainContainer>
                <RecentActivityBox activityData={activityData} />
                <MyQuizzesBox userQuizzes={userQuizzes} onDeleteClick={setQuizToDelete} />
            </ProfileMainContainer>

            <DeleteQuizModal quiz={quizToDelete} onClose={() => setQuizToDelete(null)} />
        </ProfilePageWrapper>
    );
}