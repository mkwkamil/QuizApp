import {PopularQuizzesBox, QuizCard, QuizInfo, QuizThumbnail} from "./StyledExploreComponents";
import {Stack, Typography} from "@mui/material";
import {usePopularQuizzes} from "../../hooks/usePopularQuizzes";

function PopularQuizzesCard() {
    const { popularQuizzes } = usePopularQuizzes();

    return (
        <PopularQuizzesBox>
            <Typography variant="h6" gutterBottom marginBottom={2}>
                Most Popular Quizzes
            </Typography>
            <Stack spacing={2}>
                {popularQuizzes.slice(0, 4).map((quiz) => (
                    <QuizCard key={quiz.id}>
                        <QuizThumbnail sx={{ backgroundImage: `url(${quiz.thumbnailUrl})` }} />
                        <QuizInfo>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {quiz.title}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ color: '#aaa' }}>
                                <Typography variant="caption">{quiz.questionsCount} questions</Typography>
                                <Typography variant="caption">• {quiz.playedBy} plays</Typography>
                                <Typography variant="caption">• ⭐ {quiz.averageRating.toFixed(1)}</Typography>
                            </Stack>
                        </QuizInfo>
                    </QuizCard>
                ))}
            </Stack>
        </PopularQuizzesBox>
    )
}

export default PopularQuizzesCard;