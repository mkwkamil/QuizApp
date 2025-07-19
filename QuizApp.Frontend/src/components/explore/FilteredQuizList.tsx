import React from "react";
import type { ExploreFilters, FilteredQuizListProps } from "@interfaces/explore";
import { Link } from "react-router-dom";
import { Stack, Typography, Pagination } from "@mui/material";
import { 
    FilteredQuizListWrapper, FilteredQuizCard, 
    FilteredQuizThumbnail, FilteredQuizContent, 
    FilteredQuizPaginationBox 
} from "@components/explore/FilteredQuizListLayout";
import { ExploreQuizSkeleton } from "@components/explore/ExplorePageSkeletons";



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
                                    <FilteredQuizContent>
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
                                    </FilteredQuizContent>
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