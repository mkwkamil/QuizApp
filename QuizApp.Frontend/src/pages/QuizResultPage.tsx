import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Loading from "@components/common/Loading";
import { QuizSolveMain, QuizSolveSidebar, QuizSolveWrapper } from "@components/quiz/solve/styles/QuizSolvePageLayout.ts";
import QuizResultSummaryCard from "@components/quiz/result/QuizResultSummaryCard.tsx";
import QuizAnswerReviewBox from "@components/quiz/result/QuizAnswerReviewBox.tsx";
import QuizInfoCard from "@components/quiz/solve/QuizInfoCard";
import QuizRatingCard from "@components/quiz/result/QuizRatingCard.tsx";
import QuizCommentForm from "@components/quiz/overview/QuizCommentForm";

interface QuizResultState {
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
    title: string;
    description: string;
    thumbnailUrl: string;
}

const QuizResultPage = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!state) {
                navigate(`/quiz/${id}`);
            } else {
                setIsLoading(false);
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [state, id, navigate]);

    if (isLoading) return <Loading />;

    const {
        correctAnswers,
        totalQuestions,
        timeTaken,
        title,
        description,
        thumbnailUrl,
    } = state as QuizResultState;

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const formattedTime = format(new Date(timeTaken * 1000), "mm:ss");

    return (
        <QuizSolveWrapper>
            <QuizSolveMain>
                <QuizResultSummaryCard
                    correctAnswers={correctAnswers}
                    totalQuestions={totalQuestions}
                    percentage={percentage}
                    formattedTime={formattedTime}
                />
                <QuizAnswerReviewBox />
            </QuizSolveMain>

            <QuizSolveSidebar sx={{ minWidth: "500px" }}>
                <QuizInfoCard
                    quizData={{ title, description, thumbnailUrl }}
                    th={220}
                />
                <QuizRatingCard quizId={Number(id)} />
                <QuizCommentForm quizId={Number(id)} />
            </QuizSolveSidebar>
        </QuizSolveWrapper>
    );
};

export default QuizResultPage;