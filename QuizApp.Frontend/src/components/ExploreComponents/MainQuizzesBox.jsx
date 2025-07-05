import {Box, Pagination, Stack, Typography} from "@mui/material";
import {PaginationBox, QuizCard, QuizInfo, QuizThumbnail} from "./StyledExploreComponents";

function MainQuizzesBox({ mainQuizzes }) {
  return (
      <Box>
          <Typography variant="h5" marginBottom={3} gutterBottom>
              Quizzes Below
          </Typography>
          <Stack spacing={2}>
              {mainQuizzes.map((quiz) => (
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
          <PaginationBox>
              <Pagination count={10} />
          </PaginationBox>
      </Box>
  );
}

export default MainQuizzesBox;