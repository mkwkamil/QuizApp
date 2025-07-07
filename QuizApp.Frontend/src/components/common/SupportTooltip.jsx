import { Tooltip } from "@mui/material";
import { SupportFeb } from "../explore/StyledExploreComponents";
import { SupportAgent } from "@mui/icons-material";

function SupportTooltip() {
    return (
        <Tooltip title="Contact Support" arrow>
            <SupportFeb color="primary" aria-label="contact support">
                <SupportAgent />
            </SupportFeb>
        </Tooltip>
    )
}

export default SupportTooltip;