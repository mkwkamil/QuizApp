import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useQuizStore } from '../store/quizStore';
import { loadQuizDraft } from '../store/quizDraft';
import QuizStepper from '../components/QuizComponents/QuizStepper';
import FirstStage from '../components/QuizComponents/FirstStage';
import SecondStage from '../components/QuizComponents/SecondStage';
import ThirdStage from '../components/QuizComponents/ThirdStage';
import useAutoSafeDraft from '../hooks/useAutoSafeDraft';
import { useQuizNavigation } from '../hooks/useQuizNavigation';
import RestoreDraftModal from '../components/RestoreDraftModal';

function QuizBuilder({ editMode = false, quizId = null }) {
    const [draft, setDraft] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const reset = useQuizStore((state) => state.reset);
    const setBasicInfo = useQuizStore((state) => state.setBasicInfo);
    const setQuestions = useQuizStore((state) => state.setQuestions);
    const { activeStep, next, prev } = useQuizNavigation();

    useEffect(() => {
        if (!editMode) {
            reset();
            useQuizStore.getState().setDraftId(null);
        }
    }, []);

    useAutoSafeDraft(editMode);

    useEffect(() => {
        if (editMode) return;

        const tryLoadDraft = async () => {
            try {
                const savedDraft = await loadQuizDraft();
                const isEmpty =
                    !savedDraft ||
                    (!savedDraft.basicInfo?.title?.trim() &&
                        !savedDraft.basicInfo?.description?.trim());

                if (!isEmpty) {
                    setDraft(savedDraft);
                    setModalOpen(true);
                }
            } catch (err) {
                console.error('Error loading quiz draft:', err);
            }
        };

        void tryLoadDraft();
    }, [editMode]);

    const handleRestore = () => {
        if (draft) {
            const defaultOptions = {
                isPublic: true,
                revealAnswers: true,
                shuffleQuestions: false,
            };

            const basicInfoWithDefaults = {
                title: '',
                description: '',
                category: '',
                difficulty: '',
                thumbnailUrl: '',
                ...draft.basicInfo,
                options: {
                    ...defaultOptions,
                    ...(draft.basicInfo?.options || {}),
                },
            };

            setBasicInfo(basicInfoWithDefaults);
            setQuestions(draft.questions || []);
        }
        setModalOpen(false);
    };

    const handleCloseModal = () => {
        setDraft(null);
        setModalOpen(false);
    };

    return (
        <Box sx={{
                width: '100%',
                maxWidth: 1200,
                margin: 'auto',
                padding: 2,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <QuizStepper activeStep={activeStep} />

            {activeStep === 0 && <FirstStage onComplete={next} editMode={editMode} />}
            {activeStep === 1 && <SecondStage onBack={prev} onComplete={next} />}
            {activeStep === 2 && <ThirdStage onBack={prev} editMode={editMode} quizId={quizId} />}

            <RestoreDraftModal open={modalOpen} onClose={handleCloseModal} onRestore={handleRestore} draft={draft}/>
        </Box>
    );
}

export default QuizBuilder;