import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import { HeroContainer } from "../components/explore/StyledExploreComponents";
import { MainColumn, SidebarBox } from "../components/quiz/StyledQuizPageComponents";

import QuizHeader from "../components/quiz/QuizHeader";
import CommentForm from "../components/quiz/CommentForm";
import CommentsSection from "../components/quiz/CommentsSection";
import AuthorCard from "../components/quiz/AuthorCard";
import RatingSummary from "../components/quiz/RatingSummary";
import QuizStatsCard from "../components/quiz/QuizStatsCard";
import {useQuizSummary} from "../hooks/useQuizSummary";

export default function QuizPage() {
    const { id } = useParams();
    const { data: quizData, isLoading } = useQuizSummary(id);

    if (isLoading) return <Loading />;

    return (
        <HeroContainer>
            <MainColumn>
                <QuizHeader quizData={quizData}/>
                <CommentForm quizId={id} />
                <CommentsSection comments={quizData.comments} />
            </MainColumn>

            <SidebarBox>
                <AuthorCard author={quizData.author} />
                <QuizStatsCard quizData={quizData} />
                <RatingSummary breakdown={quizData.ratingsBreakdown} average={quizData.rating} />
            </SidebarBox>
        </HeroContainer>
    );
}