import Navbar from './components/Navbar';
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import Profile from "./pages/Dashboard/Profile";

function App() {
    
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path={"/"} element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;