import { useAuthStore } from "@store/auth/authStore.ts";
import { useParams } from "react-router-dom";
import { useLoadQuiz } from "@hooks/quizzes/query/useLoadQuiz";
import LoginPage from "@pages/auth/LoginPage";
import Loading from "@components/common/Loading";
import QuizEditor from "@components/quiz/editor/QuizEditor.tsx";

const QuizManagePage = () => {
    const { id: quizId } = useParams<{ id: string }>();
    const user = useAuthStore((state) => state.user);
    
    const { data: quizData, isLoading } = useLoadQuiz(Number(quizId));
    
    if (!user) return <LoginPage />;
    
    if (quizId) {
        if (isLoading) return <Loading />;

        if (quizData?.authorId !== user.id) {
            return <div className="error">You do not have permission to edit this quiz.</div>;
        }

        return <QuizEditor quizData={quizData} />;
    }

    return <QuizEditor />;
};

export default QuizManagePage;