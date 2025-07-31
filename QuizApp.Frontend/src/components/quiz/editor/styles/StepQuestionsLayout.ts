import {styled} from "@mui/system";
import {Accordion, Box, Button, type ButtonProps, type AccordionProps, Typography} from "@mui/material";

export const QuestionAddBox = styled(Box)({
    display: "flex", 
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
});

export const AddQuestionButton = styled(Button)<ButtonProps>(() => ({
    backgroundColor: "#1E2A38",
    color: "#E3F2FD", 
    border: "1px solid #2C3E50", 
    fontWeight: 600,
    textTransform: "none",
    padding: "10px 20px",
    fontSize: 14,
    borderRadius: 8,
    transition: "all 0.25s ease-in-out",
    boxShadow: "none",
    "&:hover": {
        backgroundColor: "#28384A", 
        borderColor: "#3C4F65",
    }
}));

export const EmptyQuestionBox = styled(Box)({
    textAlign: "center",
    padding: "32px",
    border: "2px dashed #ccc",
    borderRadius: "8px",
    marginBottom: "32px",
})

interface QuestionAccordionProps extends AccordionProps {
    invalid?: boolean;
}

export const QuestionAccordion = styled(Accordion, {
    shouldForwardProp: (prop) => prop !== "invalid",
})<QuestionAccordionProps>(({ invalid }) => ({
    padding: "8px",
    width: "100%",
    "&.MuiPaper-root": {
        borderRadius: "12px",
        boxShadow: invalid
            ? "inset 0 0 0 3px rgba(183, 28, 28, 0.25)"
            : "none",
        transition: "box-shadow 0.3s ease"
    },
    backgroundColor: invalid ? 'rgba(183, 28, 28, 0.1)' : "transparent",
    color: invalid ? '#b71c1c' : "#fff",
    transition: "background-color 0.3s ease",
}));

export const QuestionTitle = styled(Typography)({
    fontWeight: 600,
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
});

export const AddOptionButton = styled(Button)<ButtonProps>(() => ({
    color: "#aaa",
    fontWeight: 600,
    fontSize: 15,
    padding: "6px 12px",
    textTransform: "none",
    "&:hover": {
        color: "#eee",
        backgroundColor: "transparent",
    }
}));