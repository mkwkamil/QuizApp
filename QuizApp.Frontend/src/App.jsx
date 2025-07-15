import Navbar from './components/common/Navbar';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import QuizManagePage from "./pages/QuizManagePage";
import QuizPage from "./pages/QuizPage";
import QuizSolvePage from "./pages/QuizSolvePage";
import QuizResultPage from "./pages/QuizResultPage";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/quiz/create" element={<QuizManagePage />} />
                    <Route path="/quiz/edit/:id" element={<QuizManagePage />} />
                    <Route path="/quiz/:id" element={<QuizPage />} />
                    <Route path="/quiz/:id/play" element={<QuizSolvePage />} />
                    <Route path="/quiz/:id/result" element={<QuizResultPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;