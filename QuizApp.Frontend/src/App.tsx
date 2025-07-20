import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "@components/common/Navbar";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import ExplorePage from "@pages/ExplorePage";
import QuizOverviewPage from "@pages/QuizOverviewPage";
import QuizSolvePage from "@pages/QuizSolvePage";
import QuizResultPage from "@pages/QuizResultPage.tsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/quiz/:id" element={<QuizOverviewPage />} />
                <Route path="/quiz/:id/solve" element={<QuizSolvePage />} />
                <Route path="/quiz/:id/result" element={<QuizResultPage />} />
                {/*<Route path="/quiz/create" element={<QuizManagePage />} />*/}
                {/*<Route path="/quiz/edit/:id" element={<QuizManagePage />} />*/}
                {/*<Route path="/profile" element={<ProfilePage />} />*/}
            </Routes>
        </Router>
    );
};

export default App;