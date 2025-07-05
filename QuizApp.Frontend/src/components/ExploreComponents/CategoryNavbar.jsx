import {CategoryButton, CategoryNav} from "./StyledExploreComponents";
import {IconButton} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

function CategoryNavbar({ categories }) {
    return (
        <CategoryNav>
            <IconButton><ChevronLeft sx={{ color: '#888' }} /></IconButton>
            {categories.map((cat) => (
                <CategoryButton key={cat} label={cat} />
            ))}
            <IconButton><ChevronRight sx={{ color: '#888' }} /></IconButton>
        </CategoryNav>
    )
}

export default CategoryNavbar