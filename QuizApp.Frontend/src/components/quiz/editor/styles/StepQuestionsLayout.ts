import {styled} from "@mui/system";
import {Accordion, Box, Button, type ButtonProps, type AccordionProps} from "@mui/material";

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

export const QuestionAccordion = styled(Accordion)<AccordionProps>(() => ({
    padding: "8px",
    width: "100%",
    "&.MuiPaper-root": {
        borderRadius: "12px",
    },
}));

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