import { styled } from "@mui/material/styles";
import { Fab, Tooltip } from "@mui/material";
import { SupportAgent } from "@mui/icons-material";

export const SupportFeb = styled(Fab)({
    position: 'fixed',
    bottom: 40,
    right: 40,
    zIndex: 1300,
    backgroundColor: 'rgba(24,42,159)',
    '&:hover': {
        backgroundColor: 'rgba(24,42,159,0.7)',
    },
});

const SupportTooltip = () => {
    return (
        <Tooltip title="Contact Support" arrow>
            <SupportFeb color="primary" aria-label="contact support">
                <SupportAgent />
            </SupportFeb>
        </Tooltip>
    );
};

export default SupportTooltip;