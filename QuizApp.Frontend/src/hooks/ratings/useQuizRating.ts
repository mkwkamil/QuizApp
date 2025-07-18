import { useState } from "react";
import { useRateQuizMutation } from "@hooks/ratings/useRateQuizMutation";
import type { UseQuizRatingProps } from "@interfaces/ratings";

export const useQuizRating = ({ quizId, initialRating = 0 }: UseQuizRatingProps) => {
    const [hovered, setHovered] = useState<number>(0);
    const [selected, setSelected] = useState<number>(initialRating);
    
    const { mutate } = useRateQuizMutation();
    
    const handleMouseEnter = (value: number) => setHovered(value);
    const handleMouseLeave = () => setHovered(0);
    
    const handleClick = (value: number) => {
        setSelected(value);
        mutate({ quizId, value });
    };
    
    return { hovered, selected, handleMouseEnter, handleMouseLeave, handleClick };
};