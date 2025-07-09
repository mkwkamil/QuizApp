import { useParams } from "react-router-dom";
import { useLoadQuiz } from "../hooks/useLoadQuiz";
import Loading from "../components/common/Loading";
import { HeroContainer } from "../components/explore/StyledExploreComponents";
import { MainColumn, SidebarBox } from "../components/quiz/StyledQuizPageComponents";

import QuizHeader from "../components/quiz/QuizHeader";
import CommentForm from "../components/quiz/CommentForm";
import CommentsSection from "../components/quiz/CommentsSection";
import AuthorCard from "../components/quiz/AuthorCard";
import RatingSummary from "../components/quiz/RatingSummary";
import QuizStatsCard from "../components/quiz/QuizStatsCard";

const mockQuiz = {
    title: "From Morse Code to AI: The Tech Timeline Challenge",
    description: "Test your knowledge of technology from the telegraph to artificial intelligence.",
    category: "Technology",
    difficulty: "Medium",
    questionCount: 7,
    rating: 4.2,
    iconUrl: "/quiz-icon.png",
    author: {
        name: "Kamil",
        avatarUrl: "/avatar.png",
    },
    stats: {
        plays: 123,
        avgScore: 68,
    },
    ratingsBreakdown: {
        5: 18,
        4: 10,
        3: 6,
        2: 3,
        1: 2,
    },
    comments: [
        { id: 1, author: "Ola", text: "Great quiz, really fun questions!" },
        { id: 2, author: "Mike", text: "It was okay, could use more AI topics." },
        { id: 3, author: "Zoe", text: "A bit too hard for me :)" },
    ],
};

export default function QuizPage() {
    const { id } = useParams();
    const { loading, quizData } = useLoadQuiz(id);

    if (loading) return <Loading />;

    return (
        <HeroContainer>
            <MainColumn>
                <QuizHeader quiz={quizData} mock={mockQuiz} />
                <CommentForm />
                <CommentsSection comments={mockQuiz.comments} />
            </MainColumn>

            <SidebarBox>
                <AuthorCard author={mockQuiz.author} />
                <QuizStatsCard
                    stats={mockQuiz.stats}
                    questionCount={mockQuiz.questionCount}
                    category={mockQuiz.category}
                    difficulty={mockQuiz.difficulty}
                    plays={mockQuiz.stats.plays}
                />
                <RatingSummary breakdown={mockQuiz.ratingsBreakdown} average={mockQuiz.rating} />
            </SidebarBox>
        </HeroContainer>
    );
}