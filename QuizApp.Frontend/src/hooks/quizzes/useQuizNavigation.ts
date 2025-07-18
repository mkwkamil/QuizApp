import {useState} from "react";

export const useQuizNavigation = () => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const prev = () => setActiveStep(prev => Math.max(prev - 1, 0));
    const next = () => setActiveStep(prev => prev + 1);
    const goTo = (step: number) => setActiveStep(step);
    
    return { activeStep, prev, next, goTo };
};