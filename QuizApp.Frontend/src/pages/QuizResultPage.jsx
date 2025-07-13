import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import {LayoutWrapper, MainWrapper, SidebarWrapper} from "../components/quiz-solve/StyledQuizSolveComponents";
import Loading from "../components/common/Loading";
import CommentForm from "../components/quiz/CommentForm";
import QuizInfoCard from "../components/quiz-solve/QuizInfoCard";
import RateQuiz from "../components/quiz-result/RateQuiz";
import QuizResultCard from "../components/quiz-result/QuizResultCard";
import ReviewAnswersCard from "../components/quiz-result/ReviewAnswersCard";

export default function QuizResultPage() {
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

    const { correctAnswers, totalQuestions, timeTaken, title, description, thumbnailUrl} = state;

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const formattedTime = format(new Date(timeTaken * 1000), "mm:ss");

    return (
        <LayoutWrapper>
            <MainWrapper>
                <QuizResultCard
                    correctAnswers={correctAnswers}
                    totalQuestions={totalQuestions}
                    percentage={percentage}
                    formattedTime={formattedTime}
                />
            <ReviewAnswersCard />

            </MainWrapper>

            <SidebarWrapper  sx={{ minWidth: "500px" }}>
                <QuizInfoCard quizData={{title, description, thumbnailUrl}} th={220} />
                <RateQuiz />
                <CommentForm />
            </SidebarWrapper>
        </LayoutWrapper>
    );
}