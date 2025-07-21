import { useEffect } from "react";
import type { QuizLoad } from "@interfaces/quizzes";
import { useQuizStore } from "@store/quiz/quizStore";
import { useQuizNavigation } from "@hooks/quizzes/useQuizNavigation";
import { QuizEditorWrapper } from "@components/quiz/editor/styles/QuizEditorLayout";
import QuizEditorStepper from "@components/quiz/editor/QuizEditorStepper";
import StepBasicInfo from "@components/quiz/editor/StepBasicInfo";
import StepQuestions from "@components/quiz/editor/StepQuestions.tsx";
import StepReviewPublish from "@components/quiz/editor/StepReviewPublish";

const QuizEditor = ({ quizData }: { quizData?: QuizLoad }) => {
    const { activeStep, next, prev } = useQuizNavigation();
    const { setBasicInfo, setQuestions, setQuizId, reset } = useQuizStore();
    const isEditMode = Boolean(quizData);

    useEffect(() => {
        if (quizData) {
            setQuizId(quizData.quizId);
            setBasicInfo({
                title: quizData.title,
                description: quizData.description,
                thumbnailUrl: quizData.thumbnailUrl,
                categoryId: quizData.categoryId,
                difficultyId: quizData.difficultyId,
                isPublic: quizData.isPublic,
                isDraft: quizData.isDraft,
                revealAnswers: quizData.revealAnswers,
                shuffleQuestions: quizData.shuffleQuestions,
            });
            setQuestions(quizData.questions);
        } else {
            reset();
        }
    }, [quizData]);

    return (
        <QuizEditorWrapper>
            <QuizEditorStepper activeStep={activeStep} />
            {activeStep === 0 && <StepBasicInfo onComplete={next} editMode={isEditMode} />}
            {activeStep === 1 && <StepQuestions onBack={prev} onComplete={next} />}
            {activeStep === 2 && <StepReviewPublish onBack={prev} />}
        </QuizEditorWrapper>
    );
};

export default QuizEditor;