import { useQuizSolve } from "../hooks/useQuizSolve";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import {
    LayoutWrapper,
    LinearProgressBar,
    MainWrapper,
    QuestionBox,
    SidebarWrapper,
} from "../components/quiz-solve/StyledQuizSolveComponents";
import { PaginationBox } from "../components/explore/StyledExploreComponents";
import Loading from "../components/common/Loading";
import NavigationButtons from "../components/quiz-solve/NavigationButtons";
import QuestionHeader from "../components/quiz-solve/QuestionHeader";
import AnswersSection from "../components/quiz-solve/AnswersSection";
import QuizInfoCard from "../components/quiz-solve/QuizInfoCard";
import QuizProgressCard from "../components/quiz-solve/QuizProgressCard";
import { format } from "date-fns";
import { useSubmitQuizAnswers } from "../hooks/useSubmitQuizAnswers";

export default function QuizPlayPage() {
    const { id } = useParams();
    const { data: quizData, isLoading } = useQuizSolve(id);
    const { mutate: submitAnswers } = useSubmitQuizAnswers();
    
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) return <Loading />;

    const currentQuestion = quizData.questions[current];
    const totalQuestions = quizData.questions.length;
    const progress = ((current + 1) / totalQuestions) * 100;
    const formatted = format(new Date(secondsElapsed * 1000), "mm:ss");

    const handlePageChange = (_, val) => {
        setCurrent(val - 1);
    };

    const handleAnswer = (value) => {
        const normalized = value instanceof Set ? Array.from(value) : value;
        setAnswers((prev) => ({ ...prev, [current]: normalized }));
    };

    const preparePayload = () => {
        return Object.entries(answers).map(([index, selectedAnswerIds]) => ({
            questionId: quizData.questions[parseInt(index)].id,
            selectedAnswerIds: Array.isArray(selectedAnswerIds) ? selectedAnswerIds : [selectedAnswerIds],
        }));
    };

    const handleSubmit = () => {
        const payload = {
            quizId: parseInt(id),
            answers: preparePayload(),
            timeTaken: secondsElapsed,
        };

        submitAnswers(payload);
    };

    return (
        <LayoutWrapper>
            <SidebarWrapper />
            <MainWrapper>
                <NavigationButtons current={current} total={totalQuestions} setCurrent={setCurrent} />

                <LinearProgressBar variant="determinate" value={progress} />

                <QuestionBox>
                    <QuestionHeader questionIndex={current} question={currentQuestion} />
                    <AnswersSection
                        question={currentQuestion}
                        selected={answers[current]}
                        onAnswerChange={handleAnswer}
                    />
                </QuestionBox>

                <PaginationBox>
                    <Pagination count={totalQuestions} page={current + 1} onChange={handlePageChange} />
                </PaginationBox>
            </MainWrapper>

            <SidebarWrapper>
                <QuizInfoCard quizData={quizData} />
                <QuizProgressCard progress={progress} current={current + 1} total={totalQuestions} time={formatted} onSubmit={handleSubmit} />
            </SidebarWrapper>
        </LayoutWrapper>
    );
}