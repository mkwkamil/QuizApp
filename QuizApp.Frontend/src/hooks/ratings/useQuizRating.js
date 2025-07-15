import {useState} from "react";
import {useRateQuizMutation} from "./useRateQuizMutation";

export function useQuizRating({ quizId, initialRating = 0 }) {
    const [hovered, setHovered] = useState(0);
    const [selected, setSelected] = useState(initialRating);
    
    const { mutate } = useRateQuizMutation();
    
    const handleMouseEnter = (value) => setHovered(value);
    const handleMouseLeave = () => setHovered(0);

    const handleClick = (value) => {
        setSelected(value);
        mutate({ quizId, value });
    }
    
    return {
        hovered,
        selected,
        handleMouseEnter,
        handleMouseLeave,
        handleClick
    };
}