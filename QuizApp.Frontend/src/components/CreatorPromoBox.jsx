import {useNavigate} from "react-router-dom";
import {PromoBox} from "./ExploreComponents/StyledExploreComponents";
import {Typography} from "@mui/material";
import {StyledMainGlowButton} from "./StyledButtons";

function CreateQuizPromo() {
    const navigate = useNavigate();
    
    return (
        <PromoBox>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Start creating your own quiz!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, mt: 2, color: '#bbb' }}>
                Unleash your creativity and share your knowledge with the world. It's easy and fun!
            </Typography>
            <StyledMainGlowButton onClick={() => navigate('/quiz/create')}>Create Quiz</StyledMainGlowButton>
        </PromoBox>
    )
}

export default CreateQuizPromo;