import { Typography, Box, Stack, IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { CommentBox } from "./StyledQuizPageComponents";

export default function QuizComment({ author, text, postedAt }) {
    return (
        <CommentBox>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                        <Typography fontWeight={600}>{author}</Typography>
                        <Typography variant="caption" color="text.secondary">•</Typography>
                        <Typography variant="caption" color="text.secondary">{postedAt}</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        {text}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                    <IconButton size="small">
                        <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                        <ReplyOutlinedIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Stack>
        </CommentBox>
    );
}