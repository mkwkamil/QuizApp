import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Pagination } from "@mui/material";
import { useQuizSolve } from "@hooks/quizzes/useQuizSolve";
import { useSubmitQuizAnswers } from "@hooks/quizzes/useSubmitQuizAnswers";
import Loading from "@components/common/Loading";
import {toast} from "react-toastify";
import {
    QuizSolveMain, QuizSolvePaginationBox,
    QuizSolveProgress, QuizSolveQuestionBox,
    QuizSolveSidebar,
    QuizSolveWrapper
} from "@components/quiz/solve/styles/QuizSolvePageLayout";
import QuizNavigationHeader from "@components/quiz/solve/QuizNavigationHeader";
import QuizSolveHeader from "@components/quiz/solve/QuizSolveHeader";
import QuizSolveAnswers from "@components/quiz/solve/QuizSolveAnswers";
import QuizInfoCard from "@components/quiz/solve/QuizInfoCard";
import QuizProgressCard from "@components/quiz/solve/QuizProgressCard";


const QuizSolvePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: quizData, isLoading } = useQuizSolve(Number(id));
    const { mutateAsync: submitAnswers } = useSubmitQuizAnswers();

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number[] | number>>({});
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading || !quizData) return <Loading />;

    const currentQuestion = quizData.questions[current];
    const totalQuestions = quizData.questions.length;
    const progress = ((current + 1) / totalQuestions) * 100;
    const formattedTime = format(new Date(secondsElapsed * 1000), "mm:ss");

    const handlePageChange = (_: any, value: number) => {
        setCurrent(value - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleAnswerChange = (value: number | number[]) => {
        setAnswers((prev) => ({ ...prev, [current]: value }));
    };

    const handleSubmit = async () => {
        const payload = {
            quizId: Number(id),
            timeTaken: secondsElapsed,
            answers: Object.entries(answers).map(([index, selectedAnswerIds]) => ({
                questionId: quizData.questions[parseInt(index)].id,
                selectedAnswerIds: Array.isArray(selectedAnswerIds) ? selectedAnswerIds : [selectedAnswerIds],
            })),
        };

        try {
            const result = await submitAnswers(payload);
            navigate(`/quiz/${id}/result`, {
                state: {
                    ...result,
                    title: quizData.title,
                    description: quizData.description,
                    thumbnailUrl: quizData.thumbnailUrl,
                },
            });
        } catch (error) {
            toast.error("Failed to submit quiz. Please try again.");
        }
    };

    return (
        <QuizSolveWrapper>
            <QuizSolveMain>
                <QuizNavigationHeader current={current} total={totalQuestions} setCurrent={setCurrent} />
                
                <QuizSolveProgress variant="determinate" value={progress} />

                <QuizSolveQuestionBox>
                    <QuizSolveHeader questionIndex={current} question={currentQuestion} />
                    <QuizSolveAnswers
                        question={currentQuestion}
                        selected={answers[current]}
                        onAnswerChange={handleAnswerChange}
                    />
                </QuizSolveQuestionBox>

                <QuizSolvePaginationBox>
                    <Pagination count={totalQuestions} page={current + 1} onChange={handlePageChange} />
                </QuizSolvePaginationBox>
            </QuizSolveMain>

            <QuizSolveSidebar>
                <QuizInfoCard quizData={quizData} />
                <QuizProgressCard
                    progress={progress}
                    current={current + 1}
                    total={totalQuestions}
                    time={formattedTime}
                    onSubmit={handleSubmit}
                />
            </QuizSolveSidebar>
        </QuizSolveWrapper>
    );
};

export default QuizSolvePage;