import {
    Box, Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack, Switch,
    TextField,
    Typography
} from "@mui/material";
import { useState } from "react";
import {useQuizStore} from "../../store/quizStore";
import {StyledCancelButton, StyledDraftButton, StyledQuizNextButton} from "../StyledButtons";
import {useNavigate} from "react-router-dom";

const categories = ["Business", "Technology", "Science", "Arts"];
const difficulties = ["Easy", "Medium", "Hard", "Expert"]

function FirstStage({ onComplete, editMode = false }) {
    const navigate = useNavigate();
    
    const { basicInfo, setBasicInfo } = useQuizStore();
    const [error, setError] = useState('');
    
    const handleInputChange = (field, value) => {
        setBasicInfo({
            ...basicInfo,
            [field]: value
        });
    };

    const handleOptionChange = (optionField, value) => {
        setBasicInfo({
            ...basicInfo,
            options: {
                ...basicInfo.options,
                [optionField]: value
            }
        });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const img = new Image();
        const reader = new FileReader();

        reader.onload = () => {
            img.onload = () => {
                if (file.size > 1024 * 300) {
                    setError("Image too big");
                    return;
                }
                
                if (img.width > img.height) {
                    handleInputChange("thumbnailUrl", reader.result);
                    setError("");
                }
                else {
                    handleInputChange("thumbnailUrl", "");
                    setError("Only landscape images are allowed (width > height).");
                }
            };
            img.src = reader.result;
        };

        reader.readAsDataURL(file);
    };

    const handleNext = () => {
        const isValid =
            basicInfo.title.trim() !== "" &&
            basicInfo.description.trim() !== "" &&
            basicInfo.category !== "" &&
            basicInfo.difficulty !== "" &&
            basicInfo.thumbnailUrl !== "";

        if (!isValid) return;

        setBasicInfo(basicInfo);
        onComplete();
    };
    
    const handleCancel = () => {
        editMode ? navigate('/profile') : navigate('/')
    }
    
    const handleDraft = () => {
        // Logic to save the draft can be implemented here
        // For now, we will just log the basicInfo
        console.log("Draft saved:", basicInfo);
    }
    
    return (
        <Box sx={{ p: 4, width: '80%', mx: 'auto' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Quiz Info
            </Typography>

            <TextField label="Quiz Title" value={basicInfo.title} onChange={e => handleInputChange("title", e.target.value)} variant="outlined" fullWidth margin="normal" required />
            <TextField label="Quiz Description" value={basicInfo.description} onChange={e => handleInputChange("description", e.target.value)} variant="outlined" fullWidth margin="normal" required />

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginTop: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={basicInfo.category}
                        onChange={e => handleInputChange("category", e.target.value)}
                        label="Category"
                        variant="outlined"
                        required
                    >
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
                    <Select
                        labelId="difficulty-select-label"
                        value={basicInfo.difficulty}
                        onChange={e => handleInputChange("difficulty", e.target.value)}
                        label="Difficulty"
                        variant="outlined"
                        required
                    >
                        {difficulties.map(difficulty => (
                            <MenuItem key={difficulty} value={difficulty}>
                                {difficulty}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box display="flex" gap={4} sx={{ mt: 4, alignItems: "flex-start" }}>
                <Stack spacing={2} flex={1}>
                    <Typography variant="h6">Quiz Options</Typography>
                    <FormControlLabel label="Make this quiz public" control={
                        <Switch 
                            checked={basicInfo.options.isPublic} 
                            onChange={e => handleOptionChange("isPublic", e.target.checked)} 
                        />}
                    />
                    <FormControlLabel label="Reveal answers after submission"  control={
                        <Switch 
                            checked={basicInfo.options.revealAnswers} 
                            onChange={e => handleOptionChange("revealAnswers", e.target.checked)} />} 
                    />
                    <FormControlLabel label="Shuffle questions order" control={
                        <Switch 
                            checked={basicInfo.options.shuffleQuestions}
                            onChange={e => handleOptionChange("shuffleQuestions", e.target.checked)}
                        />} 
                    />
                </Stack>

                <Stack spacing={2} flex={1} width="250px">
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>Quiz Thumbnail</Typography>
                        <Box display="flex" alignItems="center" gap={3}>
                            <Button variant="outlined" component="label">
                                Upload Image
                                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                            </Button>

                            {basicInfo.thumbnailUrl && (
                                <Box component="img" src={basicInfo.thumbnailUrl} alt="Thumbnail Preview"
                                    sx={{
                                        width: 180,
                                        height: "auto",
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </Box>

                        {error && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, gap: 2 }}>
                <StyledQuizNextButton fullWidth variant="contained" onClick={handleNext}>
                    Next Step
                </StyledQuizNextButton>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, width: "100%" }}>
                    <StyledCancelButton fullWidth variant="outlined" onClick={handleCancel}>Cancel</StyledCancelButton>
                    <StyledDraftButton fullWidth variant="contained" onClick={handleDraft}>Save draft</StyledDraftButton>
                </Box>
            </Box>
        </Box>
    );
}

export default FirstStage;