import { usePopularQuizzes } from "@hooks/explore/usePopularQuizzes";
import { ExploreQuizSkeleton } from "@components/explore/ExplorePageSkeletons";
import { Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
    PopularQuizCard, PopularQuizInfo,
    PopularQuizListWrapper,
    PopularQuizThumbnail, PopularQuizTitle
} from "@components/explore/styles/PopularQuizListLayout";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";

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
                                    <PopularQuizTitle>
                                        {quiz.title}
                                    </PopularQuizTitle>
                                    <Stack direction="row" spacing={1} sx={{ color: "#aaa", marginTop: "auto", pb: "4px" }}>
                                        <QuizIcon fontSize="inherit" sx={{ opacity: 0.7 }} />
                                        <Typography variant="caption">{quiz.questionsCount} Questions</Typography>

                                        <Typography variant="caption" sx={{ px: 0.5 }}>|</Typography>

                                        <PeopleIcon fontSize="inherit" sx={{ opacity: 0.7 }} />
                                        <Typography variant="caption">{quiz.playedBy} Played</Typography>

                                        <Typography variant="caption" sx={{ px: 0.5 }}>|</Typography>

                                        <StarIcon fontSize="inherit" sx={{ opacity: 0.7, color: "#ffcc00" }} />
                                        <Typography variant="caption">{quiz.averageRating?.toFixed(1) ?? "N/A"}</Typography>
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