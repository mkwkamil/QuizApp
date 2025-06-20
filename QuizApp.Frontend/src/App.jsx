import Navbar from './components/Navbar';
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import QuizPage from "./pages/QuizPage";

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
                    <Route path="/quiz" element={<QuizPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;