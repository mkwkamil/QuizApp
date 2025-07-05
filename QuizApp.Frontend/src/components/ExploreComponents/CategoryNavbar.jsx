import {CategoryButton, CategoryNav} from "./StyledExploreComponents";
import {IconButton} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useCategories} from "../../hooks/useCategories";

function CategoryNavbar() {
    const { categories} = useCategories()

    return (
        <CategoryNav>
            <IconButton><ChevronLeft sx={{ color: '#888' }} /></IconButton>
            {categories.map((category) => (
                <CategoryButton key={category.id} label={category.name} />
            ))}
            <IconButton><ChevronRight sx={{ color: '#888' }} /></IconButton>
        </CategoryNav>
    )
}

export default CategoryNavbar