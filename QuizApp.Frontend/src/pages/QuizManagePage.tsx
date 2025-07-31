import { useAuthStore } from "@store/auth/authStore.ts";
import { useParams } from "react-router-dom";
import { useLoadQuiz } from "@hooks/quizzes/query/useLoadQuiz";
import LoginPage from "@pages/auth/LoginPage";
import Loading from "@components/common/Loading";
import QuizEditor from "@components/quiz/editor/QuizEditor.tsx";
import {useQuizStore} from "@store/quiz/quizStore.ts";
import {useEffect, useState} from "react";

const QuizManagePage = () => {
    const { id: quizId } = useParams<{ id: string }>();
    const user = useAuthStore((state) => state.user);
    const resetQuiz = useQuizStore((state) => state.reset);

    const [isReady, setIsReady] = useState(false);

    const { data: quizData, isLoading } = useLoadQuiz(Number(quizId));

    useEffect(() => {
        resetQuiz();
        setIsReady(true);
    }, [quizId]);

    if (!user) return <LoginPage />;
    if (!isReady) return <Loading />;

    if (quizId) {
        if (isLoading) return <Loading />;
        if (!quizData) return <div className="error">Quiz not found.</div>;
        if (quizData.authorId !== user.id) {
            return <div className="error">You do not have permission to edit this quiz.</div>;
        }

        return <QuizEditor quizData={quizData} />;
    }

    return <QuizEditor />;
};

export default QuizManagePage;