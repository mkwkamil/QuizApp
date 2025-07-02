import { useQuizStore } from "../store/quizStore";
import { saveQuizDraft } from "../store/quizDraft";
import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const useAutoSafeDraft = () => {
    const store = useQuizStore();

    const debouncedSaveRef = useRef(null);

    useEffect(() => {
        debouncedSaveRef.current = debounce((draft) => {
            saveQuizDraft(draft).catch(err => {
                console.error("Failed to save quiz draft:", err);
            });
        }, 5000);

        return () => {
            debouncedSaveRef.current.cancel();
        };
    }, []);

    useEffect(() => {
        const draft = {
            basicInfo: store.basicInfo,
            questions: store.questions
        };

        debouncedSaveRef.current(draft);
    }, [store.basicInfo, store.questions]);
};

export default useAutoSafeDraft;