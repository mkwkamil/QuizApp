import { usePopularQuizzes } from "@hooks/explore/usePopularQuizzes";
import { ExploreQuizSkeleton } from "@components/explore/ExplorePageSkeletons";
import { Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
    PopularQuizCard, PopularQuizInfo,
    PopularQuizListWrapper,
    PopularQuizThumbnail
} from "@components/explore/PopularQuizListLayout";

const PopularQuizList = () => {
    const { data: popularQuizzes = [], isLoading } = usePopularQuizzes();
    
    return (
        <PopularQuizListWrapper>
            <Typography variant="h5" gutterBottom marginBottom={2}>
                Most Popular Quizzes
            </Typography>

            {isLoading ? (
                <ExploreQuizSkeleton />
            ) : (
                <Stack spacing={2}>
                    {popularQuizzes.slice(0, 4).map((quiz) => (
                        <Link to={`/quiz/${quiz.id}`} key={quiz.id} style={{ textDecoration: "none" }}>
                            <PopularQuizCard>
                                <PopularQuizThumbnail sx={{ backgroundImage: `url(${quiz.thumbnailUrl})` }} />
                                <PopularQuizInfo>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {quiz.title}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ color: "#aaa" }}>
                                        <Typography variant="caption">{quiz.questionsCount} questions</Typography>
                                        <Typography variant="caption">• {quiz.playedBy} plays</Typography>
                                        <Typography variant="caption">
                                            • ⭐ {quiz.averageRating.toFixed(1)}
                                        </Typography>
                                    </Stack>
                                </PopularQuizInfo>
                            </PopularQuizCard>
                        </Link>
                    ))}
                </Stack>
            )}
        </PopularQuizListWrapper>
    );
};

export default PopularQuizList;