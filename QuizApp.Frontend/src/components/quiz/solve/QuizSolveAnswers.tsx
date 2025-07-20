import { Stack } from "@mui/material";
import { QuizAnswerOption } from "@components/quiz/solve/styles/QuizSolvePageLayout";
import type { SolveQuestion } from "@interfaces/quizzes";

interface QuizAnswerListProps {
    question: SolveQuestion;
    selected: number[] | number | undefined;
    onAnswerChange: (value: number[] | number) => void;
}

const QuizAnswerList = ({ question, selected, onAnswerChange }: QuizAnswerListProps) => {
    const isMultiple = question.type === "multiple";

    const handleClick = (id: number) => {
        if (isMultiple) {
            const currentSet = new Set(selected as number[] || []);
            currentSet.has(id) ? currentSet.delete(id) : currentSet.add(id);
            onAnswerChange([...currentSet]);
        } else {
            onAnswerChange(id);
        }
    };

    const isSelected = (id: number) => {
        if (Array.isArray(selected)) {
            return selected.includes(id);
        }
        return selected === id;
    };

    return (
        <Stack spacing={2}>
            {question.answers.map((answer) => (
                <QuizAnswerOption
                    key={answer.id}
                    selected={isSelected(answer.id)}
                    onClick={() => handleClick(answer.id)}
                >
                    {answer.text}
                </QuizAnswerOption>
            ))}
        </Stack>
    );
};

export default QuizAnswerList;