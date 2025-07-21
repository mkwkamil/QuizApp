import React from "react";
import {useNavigate} from "react-router-dom";
import {useCategories} from "@hooks/meta/useCategories.ts";
import {useDifficulties} from "@hooks/meta/useDifficulties.ts";
import Loading from "@components/common/Loading.tsx";
import {useQuizStore} from "@store/quiz/quizStore.ts";
import {Controller, useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type {QuizBasicInfo} from "@store/quiz/quizTypes.ts";
import {basicInfoSchema} from "@schemas/quizEditorSchema.ts";
import {useUploadThumbnail} from "@hooks/quizzes/mutation/useUploadThumbnail.ts";
import {
    Box, Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField
} from "@mui/material";
import {
    SectionSubtitle,
    SectionTitle,
    StepBasicInfoWrapper,
    ThumbnailPreview
} from "@components/quiz/editor/styles/StepBasicInfoLayout.ts";
import {
    StyledCancelButton,
    StyledDraftButton,
    StyledQuizNextButton
} from "@components/quiz/editor/styles/QuizEditorLayout.ts";

type StepBasicInfoProps = {
    onComplete: () => void;
    editMode?: boolean;
};

const StepBasicInfo = ({ onComplete, editMode }: StepBasicInfoProps) => {
    const navigate = useNavigate();
    
    const { data: categories, isLoading: loadingCategories } = useCategories();
    const { data: difficulties, isLoading: loadingDifficulties } = useDifficulties();
    const { basicInfo, setBasicInfo } = useQuizStore();
    
    const { mutateAsync: uploadThumbnail } = useUploadThumbnail();

    const { control, handleSubmit, formState: { errors }} = useForm<QuizBasicInfo>({
        defaultValues: basicInfo,
        resolver: yupResolver(basicInfoSchema) as any,
        mode: "onChange",
    });
    
    if (loadingCategories || loadingDifficulties) return <Loading />;

    const onSubmit = (data: QuizBasicInfo) => {
        setBasicInfo(data);
        onComplete();
    };

    const handleCancel = () => navigate(editMode ? "/profile" : "/");

    const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const img = new Image();
        const reader = new FileReader();

        reader.onload = async () => {
            img.onload = async () => {
                if (file.size > 1024 * 300) {
                    return console.error("Image too large. Max 300KB.");
                }

                if (img.width <= img.height) {
                    return console.error("Only landscape images are allowed.");
                }

                try {
                    const thumbnailUrl = await uploadThumbnail(file);
                    setBasicInfo({ thumbnailUrl: thumbnailUrl });
                } catch {
                    console.error("Upload failed.");
                }
            };
            if (typeof reader.result === "string") {
                img.src = reader.result;
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <StepBasicInfoWrapper>
            <SectionTitle variant="h4">Quiz Information</SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                multiline
                                minRows={3}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />

                    <Box display="flex" gap={2}>
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.categoryId}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        {...field}
                                        label="Category"
                                        value={field.value ?? ''}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    >
                                        {categories?.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="difficultyId"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.difficultyId}>
                                    <InputLabel>Difficulty</InputLabel>
                                    <Select
                                        {...field}
                                        label="Difficulty"
                                        value={field.value ?? ''}
                                        onChange={(e) => field.onChange(Number(e.target.value))}>
                                        {difficulties?.map((diff) => (
                                            <MenuItem key={diff.id} value={diff.id}>
                                                {diff.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>

                    <Box display="flex" gap={4} alignItems="flex-start">
                        <Stack spacing={2} flex={1}>
                            <SectionSubtitle variant="h6">Quiz Settings</SectionSubtitle>
                            <FormControlLabel
                                label="Make quiz public"
                                control={
                                    <Switch
                                        checked={basicInfo.isPublic}
                                        onChange={(e) => setBasicInfo({ isPublic: e.target.checked })}
                                    />
                                }
                            />
                            <FormControlLabel
                                label="Reveal answers after submission"
                                control={
                                    <Switch
                                        checked={basicInfo.revealAnswers}
                                        onChange={(e) => setBasicInfo({ revealAnswers: e.target.checked })}
                                    />
                                }
                            />
                            <FormControlLabel
                                label="Shuffle questions"
                                control={
                                    <Switch
                                        checked={basicInfo.shuffleQuestions}
                                        onChange={(e) => setBasicInfo({ shuffleQuestions: e.target.checked })}
                                    />
                                }
                            />
                        </Stack>

                        <Stack spacing={2} flex={1}>
                            <SectionSubtitle variant="h6">Quiz Thumbnail</SectionSubtitle>

                            <Button variant="outlined" component="label">
                                Upload Image
                                <input hidden type="file" accept="image/*" onChange={handleThumbnailUpload} />
                            </Button>

                            {basicInfo.thumbnailUrl && (
                                <ThumbnailPreview src={basicInfo.thumbnailUrl} />
                            )}
                        </Stack>
                    </Box>

                    <Stack spacing={2} mt={4} alignItems="center">
                        <StyledQuizNextButton fullWidth type="submit">
                            Next Step
                        </StyledQuizNextButton>
                        <Box display="flex" gap={2} width="100%">
                            <StyledCancelButton fullWidth onClick={handleCancel}>Cancel</StyledCancelButton>
                            <StyledDraftButton fullWidth>Save Draft</StyledDraftButton>
                        </Box>
                    </Stack>
                </Stack>
            </form>
        </StepBasicInfoWrapper>
    );
}

export default StepBasicInfo;