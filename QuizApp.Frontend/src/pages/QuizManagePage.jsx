import {useParams} from "react-router-dom";
import { useLoadQuiz } from "../hooks/quizzes/useLoadQuiz";
import LoginPage from "./auth/LoginPage";
import Loading from "../components/common/Loading";
import QuizForm from "../components/creator/QuizForm";
import useAuthStore from "../store/authStore";

export default function QuizManagePage() {
    const user = useAuthStore(state => state.user);
    const { id: quizId } = useParams();
    const { loading, error, quizData } = useLoadQuiz(quizId);

    if (!user) return <LoginPage />;
    if (quizId && loading) return <Loading />;
    if (quizId && error) return <div className="error">{error}</div>;
    if (quizId && quizData.authorId && user.id !== quizData.authorId) {
        return <div className="error">You do not have permission to edit this quiz.</div>;
    }
    
    return <QuizForm editMode={Boolean(quizId)} quizId={quizId} />;
}