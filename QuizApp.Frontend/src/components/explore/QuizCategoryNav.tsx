import React, { useEffect, useRef, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useCategories } from "@hooks/meta/useCategories";
import {
    QuizCategoryChip,
    QuizCategoryNavContainer,
    QuizCategoryNavWrapper
} from "@components/explore/styles/QuizCategoryNavLayout";
import { QuizCategorySkeletonChips } from "@components/explore/ExplorePageSkeletons";

type Props = {
    filters: {
        selectedCategories: number[];
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

const QuizCategoryNav = ({ filters, setFilters }: Props) => {
    const { data: categories = [], isLoading } = useCategories();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [center, setCenter] = useState(true);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const checkOverflow = () => {
            const isOverflowing = el.scrollWidth > el.clientWidth + 1;
            setCenter(!isOverflowing);
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [categories]);

    const toggleCategory = (id: number) => {
        const updated = filters.selectedCategories.includes(id)
            ? filters.selectedCategories.filter((catId) => catId !== id)
            : [...filters.selectedCategories, id];

        setFilters((prev: any) => ({
            ...prev,
            selectedCategories: updated,
        }));
    };

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });

    return (
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="center" marginX={4}>
            {!center && (
                <IconButton onClick={scrollLeft} >
                    <ChevronLeft sx={{ color: "#888" }} />
                </IconButton>
            )}

            <QuizCategoryNavContainer>
                <QuizCategoryNavWrapper className={center ? "centered" : "leftAligned"} ref={scrollRef}>
                    {isLoading ? (
                        <QuizCategorySkeletonChips />
                    ) : (
                        categories.map((category) => (
                            <QuizCategoryChip
                                key={category.id}
                                label={category.name}
                                selected={filters.selectedCategories.includes(category.id)}
                                onClick={() => toggleCategory(category.id)}
                            />
                        ))
                    )}
                </QuizCategoryNavWrapper>
            </QuizCategoryNavContainer>

            {!center && (
                <IconButton onClick={scrollRight}>
                    <ChevronRight sx={{ color: "#888" }} />
                </IconButton>
            )}
        </Stack>
    );
};

export default QuizCategoryNav;