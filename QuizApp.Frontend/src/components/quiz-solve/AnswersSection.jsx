import { Stack } from "@mui/material";
import { AnswerOption } from "./StyledQuizSolveComponents";

export default function AnswersSection({ question, selected, onAnswerChange }) {
    const isMultiple = question.type === "multiple";

    const handleClick = (id) => {
        if (isMultiple) {
            const currentSet = new Set(selected || []);
            if (currentSet.has(id)) {
                currentSet.delete(id);
            } else {
                currentSet.add(id);
            }
            onAnswerChange([...currentSet]);
        } else {
            onAnswerChange(id);
        }
    };

    const isSelected = (id) => {
        return isMultiple ? selected?.includes(id) : selected === id;
    };

    return (
        <Stack spacing={2}>
            {question.answers.map((answer) => (
                <AnswerOption key={answer.id} selected={isSelected(answer.id)} onClick={() => handleClick(answer.id)}>
                    {answer.text}
                </AnswerOption>
            ))}
        </Stack>
    );
}