// src/storage/quizDraft.js
import { get, set, del } from 'idb-keyval';

const KEY = 'quiz-draft';

export const saveQuizDraft = async (data) => {
    try {
        await set('quiz-draft', {
            ...data,
            savedAt: new Date().toISOString()
        });
        console.log("Draft saved successfully");
    } catch (err) {
        console.error("Failed to save quiz draft:", err);
    }
};

export const loadQuizDraft = async () => {
    try {
        return await get(KEY);
    } catch (err) {
        console.error("Failed to load quiz draft from IndexedDB:", err);
        return null;
    }
};

export const clearQuizDraft = async () => {
    try {
        await del(KEY);
    } catch (err) {
        console.error("Failed to clear quiz draft from IndexedDB:", err);
    }
};