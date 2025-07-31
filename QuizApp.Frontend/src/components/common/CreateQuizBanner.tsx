import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const CreateQuizBannerBox = styled(Paper)({
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
    textAlign: "center",
});

const CreateQuizButton = styled(Button)({
    background: "linear-gradient(90deg, #1a237e, #283593)",
    color: "#fff",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: 600,
    letterSpacing: "1px",
    boxShadow: "0 0 15px rgba(48, 79, 254, 0.4)",
    textDecoration: "none",
    "&:hover": {
        boxShadow: "0 0 15px rgba(48, 79, 254, 0.6)",
    },
});

const CreateQuizBanner = () => {
    return (
        <CreateQuizBannerBox>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Start creating your own quiz!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, mt: 2, color: "#bbb" }}>
                Unleash your creativity and share your knowledge with the world. It's easy and fun!
            </Typography>
            <Link to="/quiz/create" style={{ textDecoration: "none" }}>
                <CreateQuizButton>
                    Create Quiz
                </CreateQuizButton>
            </Link>
        </CreateQuizBannerBox>
    );
};

export default CreateQuizBanner;