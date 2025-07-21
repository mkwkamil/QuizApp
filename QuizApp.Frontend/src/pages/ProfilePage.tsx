import { useState } from 'react';
import { useProfileSummary } from '@hooks/profile/useProfileSummary';
import { useUserQuizzes } from '@hooks/profile/useUserQuizzes';

import Loading from '@components/common/Loading';
import { ProfilePageMain, ProfilePageSidebar, ProfilePageWrapper } from "@components/profile/styles/ProfilePageLayout.ts";
import CreateQuizBanner from "@components/common/CreateQuizBanner.tsx";
import DeleteQuizModal from "@components/profile/modal/DeleteQuizModal.tsx";
import UserQuizListCard from "@components/profile/UserQuizListCard.tsx";
import ProfileUserCard from "@components/profile/ProfileUserCard.tsx";
import ProfileUserInfoCard from "@components/profile/ProfileUserInfoCard.tsx";

const ProfilePage = () => {
    const { data: profileData, isLoading: loadingProfile } = useProfileSummary();
    const { data: userQuizzes, isLoading: loadingQuizzes } = useUserQuizzes();
    const [quizToDelete, setQuizToDelete] = useState<{ id: number, title: string } | null>(null);
    
    if (loadingProfile || loadingQuizzes ) return <Loading />;
    if (!profileData || !userQuizzes) return null;

    return (
        <ProfilePageWrapper>
            <ProfilePageSidebar>
                <ProfileUserCard profileData={profileData} />
                <ProfileUserInfoCard profileData={profileData} />
                <CreateQuizBanner />
            </ProfilePageSidebar>

            <ProfilePageMain>
                <UserQuizListCard userQuizzes={userQuizzes} onDeleteClick={setQuizToDelete} />
            </ProfilePageMain>

            <DeleteQuizModal quiz={quizToDelete} onClose={() => setQuizToDelete(null)} />
        </ProfilePageWrapper>
    );
};

export default ProfilePage;