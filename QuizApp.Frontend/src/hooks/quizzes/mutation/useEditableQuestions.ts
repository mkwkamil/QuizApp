import { useState } from "react";
import type { EditableQuestion} from "@interfaces/quiz-manage.ts";
import { useQuizStore } from "@store/quiz/quizStore";

export const useEditableQuestions = () => {
    const { questions, setQuestions } = useQuizStore();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleAccordionToggle = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const addNewQuestion = () => {
        const newQuestion: EditableQuestion = {
            id: `q${Date.now()}`,
            text: "",
            type: "single",
            options: ["", ""],
            correctAnswers: [],
        };
        setQuestions([...questions, newQuestion]);
        setExpandedId(newQuestion.id);
    };

    const updateQuestion = (id: string, updates: Partial<EditableQuestion>) => {
        const updated = questions.map((q) =>
            q.id === id ? { ...q, ...updates } : q
        );
        setQuestions(updated);
    };

    const handleQuestionFieldChange = (
        id: string,
        field: keyof EditableQuestion,
        value: any
    ) => {
        const current = questions.find((q) => q.id === id);
        if (!current) return;

        if (field === "type") {
            const updates: Partial<EditableQuestion> = { type: value };

            if (value === "truefalse") {
                updates.options = ["True", "False"];
                updates.correctAnswers = [];
            } else if (value === "single") {
                updates.correctAnswers = current.correctAnswers.slice(0, 1);
            } else if (current.type === "truefalse") {
                updates.options = ["", ""];
            }

            updateQuestion(id, updates);
        } else {
            updateQuestion(id, { [field]: value });
        }
    };

    const handleOptionChange = (id: string, index: number, value: string) => {
        const current = questions.find((q) => q.id === id);
        if (!current) return;

        const newOptions = [...current.options];
        newOptions[index] = value;

        updateQuestion(id, { options: newOptions });
    };

    const addOption = (id: string) => {
        const current = questions.find((q) => q.id === id);
        if (!current || current.options.length >= 6) return;

        updateQuestion(id, { options: [...current.options, ""] });
    };

    const removeOption = (id: string, index: number) => {
        const current = questions.find((q) => q.id === id);
        if (!current) return;

        const newOptions = current.options.filter((_, i) => i !== index);
        const newCorrectAnswers = current.correctAnswers
            .filter((a) => a !== index)
            .map((a) => (a > index ? a - 1 : a));

        updateQuestion(id, {
            options: newOptions,
            correctAnswers: newCorrectAnswers,
        });
    };

    const handleCorrectAnswerChange = (
        id: string,
        index: number,
        checked: boolean
    ) => {
        const current = questions.find((q) => q.id === id);
        if (!current) return;

        if (current.type === "truefalse") {
            updateQuestion(id, { correctAnswers: [index] });
        } else if (current.type === "single") {
            updateQuestion(id, { correctAnswers: checked ? [index] : [] });
        } else {
            const correctAnswers = checked
                ? [...current.correctAnswers, index]
                : current.correctAnswers.filter((i) => i !== index);

            updateQuestion(id, { correctAnswers });
        }
    };

    const deleteQuestion = (id: string) => {
        setQuestions(questions.filter((q) => q.id !== id));
        if (expandedId === id) setExpandedId(null);
    };

    return {
        questions,
        expandedId,
        handleAccordionToggle,
        addNewQuestion,
        updateQuestion,
        handleQuestionFieldChange,
        handleOptionChange,
        addOption,
        removeOption,
        handleCorrectAnswerChange,
        deleteQuestion,
    };
};