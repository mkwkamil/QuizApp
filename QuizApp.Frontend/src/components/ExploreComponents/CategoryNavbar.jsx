import { CategoryNav, CategoryButton } from "./StyledExploreComponents";
import { IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useCategories } from "../../hooks/useCategories";
import { useRef } from "react";

function CategoryNavbar({ selectedCategories, onChange }) {
    const { categories } = useCategories();
    const scrollRef = useRef();

    const toggleCategory = (id) => {
        const updated = selectedCategories.includes(id)
            ? selectedCategories.filter(catId => catId !== id)
            : [...selectedCategories, id];
        onChange?.(updated);
    };

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={scrollLeft}><ChevronLeft sx={{ color: '#888' }} /></IconButton>
            <CategoryNav ref={scrollRef}>
                {categories.map((category) => (
                    <CategoryButton
                        key={category.id}
                        label={category.name}
                        selected={selectedCategories.includes(category.id)}
                        onClick={() => toggleCategory(category.id)}
                    />
                ))}
            </CategoryNav>
            <IconButton onClick={scrollRight}><ChevronRight sx={{ color: '#888' }} /></IconButton>
        </Stack>
    );
}

export default CategoryNavbar;