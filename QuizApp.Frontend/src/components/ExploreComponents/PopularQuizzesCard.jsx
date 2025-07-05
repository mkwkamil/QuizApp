import {PopularQuizzesBox, QuizCard, QuizInfo, QuizThumbnail} from "./StyledExploreComponents";
import {Stack, Typography} from "@mui/material";

function PopularQuizzesCard({ popularQuizzes }) {
    return (
        <PopularQuizzesBox>
            <Typography variant="h6" gutterBottom marginBottom={2}>
                Most Popular Quizzes
            </Typography>
            <Stack spacing={2}>
                {popularQuizzes.slice(0, 4).map((quiz) => (
                    <QuizCard key={quiz.id}>
                        <QuizThumbnail sx={{ backgroundImage: `url(https://picsum.photos/seed/${quiz.id}/100/80)` }} />
                        <QuizInfo>
                            <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                {quiz.title}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ color: '#aaa' }}>
                                <Typography variant="caption">{quiz.questions} questions</Typography>
                                <Typography variant="caption">• {quiz.plays} plays</Typography>
                                <Typography variant="caption">• ⭐ {quiz.rating}</Typography>
                            </Stack>
                        </QuizInfo>
                    </QuizCard>
                ))}
            </Stack>
        </PopularQuizzesBox>
    )
}

export default PopularQuizzesCard;