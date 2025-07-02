import { useEffect, useState, useCallback } from 'react';
import { Box, Snackbar } from '@mui/material';
import { useQuizStore } from '../store/quizStore';
import { loadQuizDraft } from "../store/quizDraft";
import QuizStepper from '../components/QuizComponents/QuizStepper';
import FirstStage from '../components/QuizComponents/FirstStage';
import SecondStage from '../components/QuizComponents/SecondStage';
import ThirdStage from '../components/QuizComponents/ThirdStage';
import useAutoSafeDraft from "../hooks/useAutoSafeDraft";
import {useQuizNavigation} from "../hooks/useQuizNavigation";
import {useNavigate} from "react-router-dom";

function QuizBuilder() {
    const navigate = useNavigate();
    
    const setBasicInfo = useQuizStore((state) => state.setBasicInfo);
    const setQuestions = useQuizStore((state) => state.setQuestions);
    const { activeStep, next, prev } = useQuizNavigation()

    const [saveNotification, setSaveNotification] = useState(false);
    const [restoreAttempted, setRestoreAttempted] = useState(false);

    const showSaveNotification = useCallback(() => {
        setSaveNotification(true);
    }, []);

    useAutoSafeDraft(showSaveNotification);

    useEffect(() => {
        const restoreDraft = async () => {
            if (restoreAttempted) return;

            try {
                const draft = await loadQuizDraft();
                const isEmptyDraft =
                    !draft ||
                    (!draft.basicInfo?.title?.trim() && !draft.basicInfo?.description?.trim())

                if (isEmptyDraft) {
                    setRestoreAttempted(true);
                    return;
                }

                const lastSaved = draft.savedAt
                    ? new Date(draft.savedAt).toLocaleString()
                    : "unknown";

                const shouldRestore = window.confirm(
                    `A quiz draft was found.\nLast saved: ${lastSaved}.\n\nDo you want to restore it?`
                );

                if (shouldRestore) {
                    setBasicInfo(draft.basicInfo || {});
                    setQuestions(draft.questions || []);

                    if (draft.questions?.length > 0) {
                        next();
                    }
                }

                setRestoreAttempted(true);
            } catch (error) {
                console.error("Failed to restore quiz draft:", error);
                setRestoreAttempted(true);
            }
        };

        void restoreDraft();
    }, [restoreAttempted, setBasicInfo, setQuestions, next]);

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 1200,
                margin: "auto",
                padding: 2,
                alignItems: "center",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <QuizStepper activeStep={activeStep} />

            {activeStep === 0 && <FirstStage onComplete={next} />}
            {activeStep === 1 && <SecondStage onBack={prev} onComplete={next} />}
            {activeStep === 2 && <ThirdStage onBack={prev} onFinish={() => navigate("/")} />}
            
            <Snackbar
                open={saveNotification}
                onClose={() => setSaveNotification(false)}
                autoHideDuration={3000}
                message="Quiz draft has been auto-saved"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </Box>
    );
}

export default QuizBuilder;