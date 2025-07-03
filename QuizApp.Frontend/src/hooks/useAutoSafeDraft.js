import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { saveQuizDraft } from "../store/quizDraft";
import { useQuizStore } from "../store/quizStore";

const useAutoSafeDraft = (editMode = false) => {
    const store = useQuizStore();

    const debouncedSaveRef = useRef(null);

    useEffect(() => {
        debouncedSaveRef.current = debounce((draft) => {
            if (editMode) return;
            saveQuizDraft(draft).catch(err => {
                console.error("Failed to save quiz draft:", err);
            });
        }, 5000);

        return () => {
            debouncedSaveRef.current.cancel();
        };
    }, [editMode]);

    useEffect(() => {
        if (editMode) return;

        const draft = {
            basicInfo: store.basicInfo,
            questions: store.questions
        };

        debouncedSaveRef.current(draft);
    }, [store.basicInfo, store.questions, editMode]);
};

export default useAutoSafeDraft;