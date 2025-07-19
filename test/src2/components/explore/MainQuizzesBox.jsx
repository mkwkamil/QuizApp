import { Box, Pagination, Stack, Typography } from "@mui/material";
import { PaginationBox, QuizCard, QuizInfo, QuizThumbnail } from "./StyledExploreComponents";
import { QuizSkeleton } from "../common/SkeletonBoxes";
import { Link } from "react-router-dom";

function MainQuizzesBox({ quizzes, loading, totalPages, page, setFilters }) {
    const handlePageChange = (_, value) => {
        setFilters(prev => ({
            page: value,
            selectedCategories: prev.selectedCategories,
            includeAnswered: prev.includeAnswered,
            sortBy: prev.sortBy,
            selectedDifficulties: prev.selectedDifficulties,
            selectedLengths: prev.selectedLengths,
            selectedRatings: prev.selectedRatings
        }))
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <Box>
            <Typography variant="h5" marginBottom={3} gutterBottom>
                Quizzes Below
            </Typography>

            {loading ? (
                <QuizSkeleton items={7}/>
            ) : quizzes.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                    No quizzes to display.
                </Typography>
            ) : (
                <>
                    <Stack spacing={2}>
                        {quizzes.map((quiz) => (
                            <Link to={`/quiz/${quiz.id}`} key={quiz.id} style={{ textDecoration: 'none' }}>
                                <QuizCard key={quiz.id}>
                                    <QuizThumbnail sx={{ backgroundImage: `url(${quiz.thumbnailUrl})` }} />
                                    <QuizInfo>
                                        <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                            {quiz.title}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="#aaa"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {quiz.description}
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{ color: "#aaa" }}>
                                            <Typography variant="caption">{quiz.questionsCount} questions</Typography>
                                            <Typography variant="caption">• {quiz.playedBy} plays</Typography>
                                            <Typography variant="caption">• ⭐ {quiz.averageRating.toFixed(1)}</Typography>
                                        </Stack>
                                    </QuizInfo>
                                </QuizCard>
                            </Link>
                        ))}
                    </Stack>
                    <PaginationBox>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                    </PaginationBox>
                </>
            )}
        </Box>
    );
}

export default MainQuizzesBox;