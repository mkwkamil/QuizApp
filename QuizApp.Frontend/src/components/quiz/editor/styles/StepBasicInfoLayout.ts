import {Box, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";

export const StepBasicInfoWrapper = styled(Box)({
    padding: "32px",
    maxWidth: "900px",
    margin: "0 auto",
});

export const SectionTitle = styled(Typography)({
    fontWeight: 700,
    marginBottom: 24,
});

export const SectionSubtitle = styled(Typography)({
    fontWeight: 600,
    marginBottom: 8,
});

export const ThumbnailPreview = styled("img")({
    width: 180,
    height: "auto",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
});
