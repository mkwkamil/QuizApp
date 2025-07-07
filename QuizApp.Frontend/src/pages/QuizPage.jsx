import {useParams} from "react-router-dom";

export default function QuizPage() {
    const { id } = useParams();
    
    return (
        <div>{id}</div>
    )
}
