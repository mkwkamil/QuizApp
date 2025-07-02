import {useLoadQuiz} from "../hooks/useLoadQuiz";
import Loading from "../components/Loading";
import QuizBuilder from "./QuizBuilder";
import {useParams} from "react-router-dom";

export default function QuizEditPage() {
    const { id } = useParams();
    const { loading, error } = useLoadQuiz(id);
    
    if (loading) {
        return <Loading />;
    }
    
    if (error) {
        return <div className="error">{error}</div>;
    }
    
    return <QuizBuilder editMode={true} quizId={id} />;
}