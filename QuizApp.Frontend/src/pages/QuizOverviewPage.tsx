import { useParams } from "react-router-dom";
import { useQuizOverview } from "@hooks/quizzes/useQuizOverview";
import Loading from "@components/common/Loading";
import { QuizOverviewMain, QuizOverviewSidebar, QuizOverviewWrapper } from "@components/quiz/overview/styles/QuizOverviewLayout";
import QuizOverviewHeader from "@components/quiz/overview/QuizOverviewHeader.tsx";
import QuizCommentForm from "@components/quiz/overview/QuizCommentForm.tsx";
import QuizCommentSection from "@components/quiz/overview/QuizCommentSection.tsx";
import QuizAuthorCard from "@components/quiz/overview/QuizAuthorCard.tsx";
import QuizStatsSummaryCard from "@components/quiz/overview/QuizStatsSummaryCard.tsx";
import QuizRatingCard from "@components/quiz/overview/QuizRatingCard.tsx";

const QuizOverviewPage = () => {
    const { id } = useParams();
    const { data: quizData, isLoading } = useQuizOverview(Number(id));

    if (isLoading || !quizData) return <Loading />;
    
    return (
        <QuizOverviewWrapper>
            <QuizOverviewMain>
                <QuizOverviewHeader quizData={quizData} />
                <QuizCommentForm quizId={Number(id)} />
                <QuizCommentSection comments={quizData.comments} />
            </QuizOverviewMain>

            <QuizOverviewSidebar>
                <QuizAuthorCard author={quizData.author} />
                <QuizStatsSummaryCard quizData={quizData} />
                <QuizRatingCard quizId={Number(id)} />
            </QuizOverviewSidebar>
        </QuizOverviewWrapper>
    );
};

export default QuizOverviewPage;