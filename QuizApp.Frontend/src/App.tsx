import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "@components/common/Navbar";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/auth/LoginPage.tsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/*<Route path="/register" element={<RegisterPage />} />*/}
                {/*<Route path="/profile" element={<ProfilePage />} />*/}
                {/*<Route path="/explore" element={<ExplorePage />} />*/}
                {/*<Route path="/quiz/create" element={<QuizManagePage />} />*/}
                {/*<Route path="/quiz/edit/:id" element={<QuizManagePage />} />*/}
                {/*<Route path="/quiz/:id" element={<QuizPage />} />*/}
                {/*<Route path="/quiz/:id/play" element={<QuizSolvePage />} />*/}
                {/*<Route path="/quiz/:id/result" element={<QuizResultPage />} />*/}
            </Routes>
        </Router>
    );
};

export default App;