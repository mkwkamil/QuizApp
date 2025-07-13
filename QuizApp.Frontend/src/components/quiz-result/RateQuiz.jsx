import { useState } from "react";
import { Typography, Stack, Divider } from "@mui/material";
import { Star } from "@mui/icons-material";
import {SidebarCard} from "../quiz/StyledQuizPageComponents";

export default function RateQuiz() {
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(0);

    return (
        <SidebarCard>
            <Typography variant="h6" fontWeight="600" gutterBottom>
                Rate this quiz
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setSelected(star)}
                        sx={{
                            color: (hovered || selected) >= star ? "#facc15" : "#555",
                            cursor: "pointer",
                            fontSize: 40,
                            transition: "color 0.2s",
                        }}
                    />
                ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="caption" color="text.secondary" justifyContent="center" display="flex">
                Your feedback helps us improve!
            </Typography>
        </SidebarCard>
    );
}

