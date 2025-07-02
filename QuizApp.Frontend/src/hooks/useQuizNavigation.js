import {useState} from "react";

export function useQuizNavigation() {
    const [activeStep, setActiveStep] = useState(0)

    const next = () => setActiveStep(prev => prev + 1)
    const prev = () => setActiveStep(prev => prev - 1)
    const goTo = (step) => setActiveStep(step)

    return { activeStep, next, prev, goTo }
}