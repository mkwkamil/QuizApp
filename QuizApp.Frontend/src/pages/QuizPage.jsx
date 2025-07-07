import {useParams} from "react-router-dom";
import {useLoadQuiz} from "../hooks/useLoadQuiz";
import Loading from "../components/common/Loading";

export default function QuizPage() {
    const { id } = useParams();
    const { loading, quizData } = useLoadQuiz(id);
    
    if (loading) return <Loading />
    
    return (
        <div className="quiz-page">
            <div className="quiz-content">
                <h1>{quizData.title}</h1>
                <p>{quizData.description}</p>
            </div>
        </div>
    )
}
