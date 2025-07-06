import { useState } from "react";
import { CategoryNav, CategoryButton } from "./StyledExploreComponents";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useCategories } from "../../hooks/useCategories";

function CategoryNavbar({ selectedCategories, onChange }) {
    const { categories } = useCategories();

    const toggleCategory = (id) => {
        const updated = selectedCategories.includes(id)
            ? selectedCategories.filter(catId => catId !== id)
            : [...selectedCategories, id];

        onChange?.(updated);
    };

    return (
        <CategoryNav>
            <IconButton><ChevronLeft sx={{ color: '#888' }} /></IconButton>
            {categories.map((category) => (
                <CategoryButton
                    key={category.id}
                    label={category.name}
                    selected={selectedCategories.includes(category.id)}
                    onClick={() => toggleCategory(category.id)}
                />
            ))}
            <IconButton><ChevronRight sx={{ color: '#888' }} /></IconButton>
        </CategoryNav>
    );
}

export default CategoryNavbar;