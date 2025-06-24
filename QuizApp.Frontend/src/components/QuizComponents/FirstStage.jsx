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
import {useEffect, useState} from "react";

function FirstStage({ isFormValid, setIsFormValid, setActiveStep }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setIsFormValid(
            title.trim() !== "" &&
            description.trim() !== "" &&
            category !== "" &&
            difficulty !== "" &&
            thumbnailUrl !== ""
        );
    }, [title, description, category, difficulty, thumbnailUrl]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            if (img.width > img.height) {
                setThumbnailUrl(objectUrl);
                setError("");
            } else {
                setThumbnailUrl("");
                setError("Only landscape images are allowed (width > height).");
            }
        };

        img.src = objectUrl;
    };

    const handleNext = () => {
        if (!isFormValid) return;

        const quizData = {
            title,
            description,
            category,
            difficulty,
            thumbnailUrl,
            options: {
                isPublic: true,
                revealAnswers: true,
                shuffleQuestions: false
            }
        };

        console.log("Quiz data to submit or pass to next step:", quizData);
        setActiveStep(1);
    };
    
    
    return (
        <Box component="form" sx={{ padding: 2, width: "80%" }}>
            <Typography variant="h4" component="h1" gutterBottom>Quiz Info</Typography>

            <TextField label="Quiz Title" value={title} onChange={e => setTitle(e.target.value)} variant="outlined" fullWidth margin="normal" required />
            <TextField label="Quiz Description" value={description} onChange={e => setDescription(e.target.value)} variant="outlined" fullWidth margin="normal" required />

            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginTop: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        label="Category"
                        variant="outlined"
                        required
                    >
                        <MenuItem value="Business">Business</MenuItem>
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Science">Science</MenuItem>
                        <MenuItem value="Arts">Arts</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
                    <Select
                        labelId="difficulty-select-label"
                        value={difficulty}
                        onChange={e => setDifficulty(e.target.value)}
                        label="Difficulty"
                        variant="outlined"
                        required
                    >
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                        <MenuItem value="Expert">Expert</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box display="flex" gap={4} sx={{ mt: 4, alignItems: "flex-start" }}>
                <Stack spacing={2} flex={1}>
                    <Typography variant="h6">Quiz Options</Typography>
                    <FormControlLabel control={<Switch defaultChecked />} label="Make this quiz public" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Reveal answers after submission" />
                    <FormControlLabel control={<Switch />} label="Shuffle questions order" />
                </Stack>

                <Stack spacing={2} flex={1} width="250px">
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>Quiz Thumbnail</Typography>
                        <Box display="flex" alignItems="center" gap={3}>
                            <Button variant="outlined" component="label">
                                Upload Image
                                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
                            </Button>

                            {thumbnailUrl && (
                                <Box component="img" src={thumbnailUrl} alt="Thumbnail Preview"
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

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button fullWidth variant="contained" onClick={handleNext} disabled={!isFormValid}
                    sx={{
                        background: "linear-gradient(135deg, #0d47a1, #1565c0)",
                        color: "#fff",
                        boxShadow: "0 0 6px rgba(21, 101, 192, 0.4)",
                        transition: "all 0.25s ease",
                        fontWeight: 500,
                        textTransform: "none",
                        borderRadius: "10px",
                        "&:hover": {
                            background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                            boxShadow: "0 0 10px rgba(30, 136, 229, 0.5)",
                            transform: "translateY(-1px)",
                        },
                        "&:active": {
                            boxShadow: "0 0 4px rgba(21, 101, 192, 0.3)",
                            transform: "scale(0.98)",
                        }
                    }}>
                    Next Step
                </Button>
            </Box>
        </Box>
    );
}

export default FirstStage;