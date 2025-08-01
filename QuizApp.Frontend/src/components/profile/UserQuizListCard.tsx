import { Typography, Stack, Box, Tooltip, IconButton, Select, MenuItem, FormControl, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import {
    UserQuizListWrapper,
    UserQuizCard,
    UserQuizThumbnail,
    UserQuizHeader,
    UserQuizDescription,
    TagTypography
} from "@components/profile/styles/UserQuizListCardLayout.ts";
import type { UserQuizSummary } from "@interfaces/quizzes.ts";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface UserQuizListCardProps {
    userQuizzes: UserQuizSummary[];
    onDeleteClick: (quiz: UserQuizSummary) => void;
}

const UserQuizListCard = ({ userQuizzes, onDeleteClick }: UserQuizListCardProps) => {
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const quizzesPerPage = 6;

    const filteredQuizzes = userQuizzes.filter((quiz) => {
        if (filter === "published") return !quiz.isDraft;
        if (filter === "draft") return quiz.isDraft;
        return true;
    });

    const paginatedQuizzes = filteredQuizzes.slice(
        (page - 1) * quizzesPerPage,
        page * quizzesPerPage
    );

    const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

    return (
        <UserQuizListWrapper>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="#fff" fontWeight={600}>
                    My Quizzes
                </Typography>
                {totalPages > 1 && (
                    <Box display="flex" justifyContent="center">
                        <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} />
                    </Box>
                )}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <Select variant="outlined"
                        value={filter}
                        onChange={(e) => { setFilter(e.target.value); setPage(1); }}
                        sx={{ color: '#ccc' }}
                    >
                        <MenuItem value="all">All Quizzes</MenuItem>
                        <MenuItem value="published">Published Only</MenuItem>
                        <MenuItem value="draft">Draft Only</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Stack spacing={2}>
                {paginatedQuizzes.map((quiz) => (
                    <UserQuizCard key={quiz.id}>
                        <Link to={!quiz.isDraft ? `/quiz/${quiz.id}` : `/quiz/edit/${quiz.id}`} style={{ textDecoration: 'none', display: 'flex', flex: 1, gap: 16 }}>
                            <UserQuizThumbnail sx={{ backgroundImage: `url(${quiz.thumbnailUrl})` }} />
                            <UserQuizHeader>
                                <Box sx={{ flexGrow: 1, marginTop: "-4px" }}>
                                    <Typography variant="subtitle1" fontWeight="bold" color="#fff" noWrap>
                                        {quiz.title}
                                    </Typography>
                                    <UserQuizDescription>
                                        {quiz.description}
                                    </UserQuizDescription>
                                </Box>
                                <Stack direction="row" spacing={1} sx={{ color: "#aaa", marginTop: "auto" }}>
                                    {quiz.isDraft && (
                                        <>
                                            <TagTypography variant="caption">DRAFT</TagTypography>
                                            <Typography variant="caption" sx={{ px: 0.5 }}>|</Typography>
                                        </>
                                    )}
                                    <QuizIcon fontSize="inherit" sx={{ opacity: 0.7 }} />
                                    <Typography variant="caption">{quiz.questionsCount} Questions</Typography>

                                    <Typography variant="caption" sx={{ px: 0.5 }}>|</Typography>

                                    <PeopleIcon fontSize="inherit" sx={{ opacity: 0.7 }} />
                                    <Typography variant="caption">{quiz.playedBy} Played</Typography>

                                    <Typography variant="caption" sx={{ px: 0.5 }}>|</Typography>

                                    <StarIcon fontSize="inherit" sx={{ opacity: 0.7 }} />
                                    <Typography variant="caption">{quiz.averageRating?.toFixed(1) ?? "N/A"}</Typography>
                                </Stack>
                            </UserQuizHeader>
                        </Link>

                        <Stack direction="row" spacing={1} alignSelf="center">
                            <Tooltip title="Edit Quiz">
                                <IconButton component={Link} to={`/quiz/edit/${quiz.id}`} size="small" sx={{ color: "#aaa" }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete Quiz">
                                <IconButton onClick={() => onDeleteClick(quiz)} size="small" sx={{ color: "#f44336" }}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </UserQuizCard>
                ))}
            </Stack>
        </UserQuizListWrapper>
    );
};

export default UserQuizListCard;