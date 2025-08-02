import { Modal, Box, Fade, Backdrop } from "@mui/material";
import { type ReactNode } from "react";

interface BaseModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: number | string;
    height?: number | string;
    blur?: boolean;
    boxCenter?: boolean;
    textCenter?: boolean;
}

const BaseModal = ({ open, onClose, children, width = 440, height = "auto", blur = true, boxCenter = true, textCenter = true }: BaseModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: blur
                    ? {
                        timeout: 700,
                        sx: {
                            backdropFilter: "blur(6px)",
                            backgroundColor: "rgba(0,0,0,0.3)",
                        },
                    }
                    : undefined,
            }}
        >
            <Fade in={open} unmountOnExit>
                <Box
                    sx={{
                        position: "absolute",
                        top: boxCenter ? "50%" : "10%",
                        left: "50%",
                        transform: boxCenter ? "translate(-50%, -50%)" : "translate(-50%, 0)",
                        width,
                        height,
                        backgroundColor: "#121212",
                        borderRadius: 8,
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        padding: "30px 32px",
                        textAlign: textCenter ? "center" : "left",
                        border: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default BaseModal;