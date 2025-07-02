import useAuthStore from "../store/authStore";
import LoginPage from "./Auth/LoginPage";
import QuizBuilder from "./QuizBuilder";

function QuizPage() {
    const user = useAuthStore(state => state.user);

    return user ? <QuizBuilder /> : <LoginPage />;
}

export default QuizPage;