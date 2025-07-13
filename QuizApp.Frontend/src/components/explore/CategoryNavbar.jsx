import { CategoryNav, CategoryButton } from "./StyledExploreComponents";
import { Box, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useCategories } from "../../hooks/useCategories";
import { useEffect, useRef, useState } from "react";
import { CategorySkeleton} from "../common/SkeletonBoxes";

function CategoryNavbar({ loading, filters, setFilters }) {
    const { categories } = useCategories();
    const scrollRef = useRef();
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

    const toggleCategory = (id) => {
        const updated = filters.selectedCategories.includes(id)
            ? filters.selectedCategories.filter((catId) => catId !== id)
            : [...filters.selectedCategories, id];

        setFilters((prev) => ({
            ...prev,
            selectedCategories: updated,
        }));
    };

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });

    return (
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
            {!center && <IconButton onClick={scrollLeft}><ChevronLeft sx={{ color: '#888' }} /></IconButton>}
            <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
                <CategoryNav className={center ? "centered" : "leftAligned"} ref={scrollRef}>
                    {loading ? (
                        <CategorySkeleton items={8} />
                    ) : (
                        categories.map((category) => (
                            <CategoryButton
                                key={category.id}
                                label={category.name}
                                selected={filters.selectedCategories.includes(category.id)}
                                onClick={() => toggleCategory(category.id)}
                            />
                        ))
                    )}
                </CategoryNav>
            </Box>
            {!center && <IconButton onClick={scrollRight}><ChevronRight sx={{ color: '#888' }} /></IconButton>}
        </Stack>
    );
}

export default CategoryNavbar;