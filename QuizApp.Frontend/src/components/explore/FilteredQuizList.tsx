import React from "react";
import type { ExploreFilters, FilteredQuizListProps } from "@interfaces/explore";
import { Link } from "react-router-dom";
import {Stack, Typography, Pagination, Box} from "@mui/material";
import {
    FilteredQuizListWrapper, FilteredQuizCard,
    FilteredQuizThumbnail,
    FilteredQuizPaginationBox, FilteredQuizHeader, FilteredQuizDescription
} from "@components/explore/styles/FilteredQuizListLayout";
import { ExploreQuizSkeleton } from "@components/explore/ExplorePageSkeletons";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";

const FilteredQuizList = ({ quizzes, loading, totalPages, page, setFilters }: FilteredQuizListProps) => {
    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setFilters((prev: ExploreFilters) => ({ ...prev, page: value }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <FilteredQuizListWrapper>
            <Typography variant="h5" fontWeight={550} marginTop={1}>
                Quizzes Below
            </Typography>

            {loading ? (
                <ExploreQuizSkeleton items={7} />
            ) : quizzes.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                    No quizzes to display.
                </Typography>
            ) : (
                <>
                    <Stack spacing={2}>
                        {quizzes.map((quiz) => (
                            <Link to={`/quiz/${quiz.id}`} key={quiz.id} style={{ textDecoration: 'none' }}>
                                <FilteredQuizCard>
                                    <FilteredQuizThumbnail sx={{ backgroundImage: `url(${quiz.thumbnailUrl})` }} />
                                    <FilteredQuizHeader>
                                        <Box sx={{ flexGrow: 1, marginTop: "-4px" }}>
                                            <Typography variant="subtitle1" fontWeight="bold" color="#fff" noWrap>
                                                {quiz.title}
                                            </Typography>
                                            <FilteredQuizDescription>
                                                {quiz.description}
                                            </FilteredQuizDescription>
                                        </Box>
                                        <Stack direction="row" spacing={1} sx={{ color: "#aaa", marginTop: "auto", marginBottom: "-2px" }}>
                                            <QuizIcon fontSize="inherit" sx={{ opacity: 0.7 }} />
                                            <Typography variant="caption">{quiz.questionsCount} Questions</Typography>

                                            <Typography variant="caption" sx={{ px: 0.5 }}>|</Typography>

                                            <PeopleIcon fontSize="inherit" sx={{ opacity: 0.7 }} />
                                            <Typography variant="caption">{quiz.playedBy} Played</Typography>

                                            <Typography variant="caption" sx={{ px: 0.5 }}>|</Typography>

                                            <StarIcon fontSize="inherit" sx={{ opacity: 0.7, color: "#ffcc00" }} />
                                            <Typography variant="caption">{quiz.averageRating?.toFixed(1) ?? "N/A"}</Typography>
                                        </Stack>
                                    </FilteredQuizHeader>
                                </FilteredQuizCard>
                            </Link>
                        ))}
                    </Stack>
                    <FilteredQuizPaginationBox>
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                    </FilteredQuizPaginationBox>
                </>
            )}
        </FilteredQuizListWrapper>
    );
}

export default FilteredQuizList;