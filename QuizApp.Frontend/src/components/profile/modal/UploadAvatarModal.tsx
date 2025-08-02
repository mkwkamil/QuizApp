import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Cropper from "react-easy-crop";
import BaseModal from "@components/common/BaseModal.tsx";
import {
    AvatarPreviewBox,
    ConfirmCancelButton,
    ConfirmUpdateButton,
    DarkSlider
} from "@components/profile/modal/styles/EditProfileModalLayout.ts";

interface UploadAvatarModalProps {
    open: boolean;
    onClose: () => void;
    preview: string | null;
    file: File | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpload: (croppedBlob: Blob) => void;
}

const UploadAvatarModal = ({ open, onClose, preview, file, handleFileChange, handleUpload }: UploadAvatarModalProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = (_: any, croppedPixels: any) => {
        setCroppedAreaPixels(croppedPixels);
    };

    const getCroppedImg = async () => {
        if (!preview || !croppedAreaPixels) return;

        const image = new Image();
        image.src = preview;

        await new Promise((resolve) => (image.onload = resolve));

        const canvas = document.createElement("canvas");
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
            }, "image/jpeg");
        });
    };

    const handleSave = async () => {
        const blob = await getCroppedImg();
        if (blob) handleUpload(blob);
    };

    return (
        <BaseModal open={open} onClose={onClose}>
            <Stack spacing={3}>
                <Typography variant="h6" fontWeight={600}>
                    Change Profile Picture
                </Typography>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="avatar-upload"
                    style={{ display: "none" }}
                />

                <AvatarPreviewBox>
                    {!preview ? (
                        <label
                            htmlFor="avatar-upload"
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: "100%",
                                textAlign: "center"
                            }}
                        >
                            <ImageOutlinedIcon sx={{ fontSize: 40, color: "#888" }} />
                            <Typography color="#888" fontSize={14} fontWeight={600} mt={1}>
                                Browse or drop image
                            </Typography>
                        </label>
                    ) : (
                        <Cropper
                            image={preview}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    )}
                </AvatarPreviewBox>

                {preview && (
                    <DarkSlider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.01}
                        onChange={(_, val) => setZoom(val as number)}
                    />
                )}

                <Stack direction="row" spacing={2} justifyContent="center">
                    <ConfirmCancelButton onClick={onClose} fullWidth>
                        Cancel
                    </ConfirmCancelButton>
                    <ConfirmUpdateButton onClick={handleSave} disabled={!file} fullWidth>
                        Update
                    </ConfirmUpdateButton>
                </Stack>
            </Stack>
        </BaseModal>
    );
};

export default UploadAvatarModal;