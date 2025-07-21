import { Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { UserQuizListWrapper, UserQuizCard, UserQuizInfoBox, EditQuizButton, DeleteQuizButton } from "@components/profile/styles/UserQuizListCardLayout.ts";
import type { UserQuizSummary } from "@interfaces/quizzes.ts";

interface UserQuizListCardProps {
    userQuizzes: UserQuizSummary[];
    onDeleteClick: (quiz: UserQuizSummary) => void;
}

const UserQuizListCard = ({ userQuizzes, onDeleteClick }: UserQuizListCardProps) => {
    return (
        <UserQuizListWrapper>
            <Typography variant="h6" color="#fff" fontFamily="Poppins, sans-serif" gutterBottom>
                My Quizzes
            </Typography>

            <Stack spacing={2}>
                {userQuizzes.map((quiz) => (
                    <UserQuizCard key={quiz.id}>
                        <UserQuizInfoBox>
                            <Typography fontWeight="bold" sx={{ color: "#fff", mb: 0.5 }}>
                                {quiz.title}
                            </Typography>

                            {quiz.isDraft && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "orange",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        letterSpacing: 0.5,
                                    }}
                                >
                                    DRAFT
                                </Typography>
                            )}

                            <Stack direction="row" spacing={1} sx={{ color: "#aaa" }}>
                                <Typography variant="caption">{quiz.questionCount} questions</Typography>
                                <Typography variant="caption">• {quiz.playedBy} plays</Typography>
                                <Typography variant="caption">• ⭐ {quiz.averageRating.toFixed(1)}</Typography>
                            </Stack>
                        </UserQuizInfoBox>

                        <Stack direction="row" spacing={1}>
                            <Link to={`/quiz/edit/${quiz.id}`}>
                                <EditQuizButton variant="outlined" size="small">
                                    Edit
                                </EditQuizButton>
                            </Link>
                            <DeleteQuizButton variant="outlined" size="small" onClick={() => onDeleteClick(quiz)}>
                                Delete
                            </DeleteQuizButton>
                        </Stack>
                    </UserQuizCard>
                ))}
            </Stack>
        </UserQuizListWrapper>
    );
};

export default UserQuizListCard;