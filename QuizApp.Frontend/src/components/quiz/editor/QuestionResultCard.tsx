import {
    Divider,
    List
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
    CardWrapper,
    QuestionHeader,
    QuestionAvatar,
    QuestionText,
    OptionItem,
    TypeChip,
    OptionText
} from "@components/quiz/editor/styles/QuestionResultCardLayout.ts";

interface QuestionResultCardProps {
    index: number;
    q: {
        text: string;
        options: string[];
        correctAnswers: number[];
        type: "single" | "multiple" | "truefalse";
    };
}

const QuestionResultCard = ({ index, q }: QuestionResultCardProps) => {
    return (
        <CardWrapper>
            <QuestionHeader>
                <QuestionAvatar>{index + 1}</QuestionAvatar>
                <QuestionText variant="h6">{q.text}</QuestionText>
                <TypeChip
                    label={`Type: ${
                        q.type === "single"
                            ? "Single Choice"
                            : q.type === "multiple"
                                ? "Multiple Choice"
                                : "True/False"
                    }`}
                    variant="outlined"
                />
            </QuestionHeader>

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.08)" }} />

            <List dense disablePadding>
                {q.options.map((opt, i) => {
                    const isCorrect = q.correctAnswers.includes(i);
                    return (
                        <OptionItem
                            key={i}
                            sx={{
                                backgroundColor: isCorrect
                                    ? "rgba(76,175,80,0.1)"
                                    : "transparent",
                            }}
                        >
                            {isCorrect ? (
                                <CheckCircleIcon
                                    sx={{ color: "success.main", mr: 1, fontSize: 20 }}
                                />
                            ) : (
                                <RadioButtonUncheckedIcon
                                    sx={{ color: "#777", mr: 1, fontSize: 20 }}
                                />
                            )}
                            <OptionText primary={opt} correct={isCorrect} />
                        </OptionItem>
                    );
                })}
            </List>
        </CardWrapper>
    );
};

export default QuestionResultCard;