import React, {useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useCategories } from "@hooks/meta/useCategories";
import { useDifficulties } from "@hooks/meta/useDifficulties";
import Loading from "@components/common/Loading";
import { useQuizStore } from "@store/quiz/quizStore";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { QuizBasicInfo } from "@store/quiz/quizTypes";
import { basicInfoSchema } from "@schemas/quizEditorSchema";
import {
    Box,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {
    OptionSwitcher,
    SectionSubtitle,
    ThumbnailIconButton,
    ThumbnailPreview, ThumbnailUploadButton
} from "@components/quiz/editor/styles/StepBasicInfoLayout";
import {
    SectionTitle,
    QuizFieldErrorText,
    StyledCancelButton,
    StyledDraftButton,
    StyledQuizNextButton, StepContainer
} from "@components/quiz/editor/styles/QuizEditorLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useCreateDraftQuiz} from "@hooks/quizzes/mutation/useCreateDraftQuiz.ts";
import {useUpdateDraftQuiz} from "@hooks/quizzes/mutation/useUpdateDraftQuiz.ts";
import {useUploadThumbnail} from "@hooks/quizzes/mutation/useUploadThumbnail.ts";
import type {CreateDraftPayload} from "@interfaces/quiz-manage.ts";
import {toast} from "react-toastify";

type StepBasicInfoProps = {
    onComplete: () => void;
    editMode?: boolean;
};

const StepBasicInfo = ({ onComplete, editMode }: StepBasicInfoProps) => {
    const navigate = useNavigate();

    const { data: categories, isLoading: loadingCategories } = useCategories();
    const { data: difficulties, isLoading: loadingDifficulties } = useDifficulties();
    const { quizId, basicInfo, setBasicInfo, questions, thumbnailFile, setThumbnailFile, reset } = useQuizStore();
    const { mutateAsync: createDraft } = useCreateDraftQuiz();
    const { mutateAsync: updateDraft } = useUpdateDraftQuiz();
    const { mutateAsync: uploadThumbnail } = useUploadThumbnail();
    

    const { control, handleSubmit, formState: { errors }, setValue, getValues, watch} = useForm<QuizBasicInfo>({
        defaultValues: basicInfo,
        resolver: yupResolver(basicInfoSchema) as any,
        mode: "onChange",
    });

    useEffect(() => {
        setValue("thumbnailUrl", basicInfo.thumbnailUrl);
    }, [basicInfo.thumbnailUrl, setValue]);

    if (loadingCategories || loadingDifficulties) return <Loading />;

    const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
        }
    };

    const onSubmit = (data: QuizBasicInfo) => {
        setBasicInfo(data);
        onComplete();
    };

    const handleSaveDraft = async () => {
        const { title } = getValues();

        if (!title || title.trim() === "") {
            toast.error("Title is required to save draft.");
            return;
        }

        const formData = getValues();
        setBasicInfo(formData);

        const thumbnailUrl = await uploadThumbnail(thumbnailFile ?? undefined);

        const payload: CreateDraftPayload = {
            title: formData.title,
            description: formData.description,
            thumbnailUrl,
            categoryId: formData.categoryId ?? null,
            difficultyId: formData.difficultyId ?? null,
            isPublic: formData.isPublic,
            isDraft: true,
            revealAnswers: formData.revealAnswers,
            shuffleQuestions: formData.shuffleQuestions,
            questions,
        };

        console.log(payload);
        
        if (quizId) {
            await updateDraft({ draftId: quizId, payload });
        } else {
            await createDraft(payload);
        }
        
        reset();
    };

    const handleCancel = () => navigate(editMode ? "/profile" : "/");

    return (
        <StepContainer>
            <SectionTitle variant="h3">
                Quiz Information
            </SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Controller name="title" control={control} render={({ field }) => (
                            <TextField{...field} label="Title" fullWidth error={!!errors.title} /> )} />
                        {errors.title && <QuizFieldErrorText>{errors.title?.message}</QuizFieldErrorText>}

                        <Controller name="description" control={control} render={({ field }) => (
                            <TextField {...field} label="Description" fullWidth multiline minRows={3} error={!!errors.description} /> )} />
                        {errors.description && <QuizFieldErrorText>{errors.description?.message}</QuizFieldErrorText>}

                        <Box display="flex" gap={2}>
                            <Controller name="categoryId" control={control} render={({ field }) => (
                                <FormControl fullWidth error={!!errors.categoryId}>
                                    <InputLabel>Category</InputLabel>
                                    <Select {...field} label="Category" value={field.value ?? ''}
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

                            <Controller name="difficultyId" control={control} render={({ field }) => (
                                <FormControl fullWidth error={!!errors.difficultyId}>
                                    <InputLabel>Difficulty</InputLabel>
                                    <Select {...field} label="Difficulty" value={field.value ?? ''}
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
                    </Stack>

                    <Box display="flex" gap={4} alignItems="flex-start">
                        <Stack spacing={2} flex={1}>
                            <SectionSubtitle variant="h6">Quiz Settings</SectionSubtitle>
                            <Controller
                                name="isPublic"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        label="Make quiz public"
                                        control={
                                            <OptionSwitcher
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="revealAnswers"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        label="Reveal answers after submission"
                                        control={
                                            <OptionSwitcher
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        }
                                    />
                                )}
                            />
                            <Controller
                                name="shuffleQuestions"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        label="Shuffle questions"
                                        control={
                                            <OptionSwitcher
                                                {...field}
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                            />
                                        }
                                    />
                                )}
                            />
                        </Stack>

                        <Stack spacing={2} flex={1}>
                            <SectionSubtitle variant="h6">Quiz Thumbnail</SectionSubtitle>
                            {!watch("thumbnailUrl") ? (
                                <ThumbnailUploadButton variant="contained" component="label">
                                    Upload Image
                                    <input hidden type="file" accept="image/*" onChange={handleThumbnailSelect} />
                                </ThumbnailUploadButton>
                            ) : (
                                <Box display="flex" alignItems="center" gap={2}>
                                    <ThumbnailPreview src={watch("thumbnailUrl")} />

                                    <Stack spacing={1}>
                                        <ThumbnailIconButton component="label">
                                            <EditIcon />
                                            <input hidden type="file" accept="image/*" onChange={handleThumbnailSelect} />
                                        </ThumbnailIconButton>

                                        <ThumbnailIconButton onClick={() => setBasicInfo({ thumbnailUrl: "" })}>
                                            <DeleteIcon color="error" />
                                        </ThumbnailIconButton>
                                    </Stack>
                                </Box>
                            )}
                        </Stack>
                    </Box>

                    <Stack spacing={2} mt={4} alignItems="center">
                        <StyledQuizNextButton fullWidth type="submit">
                            Next Step
                        </StyledQuizNextButton>
                        <Box display="flex" gap={2} width="100%">
                            <StyledCancelButton fullWidth onClick={handleCancel}>Cancel</StyledCancelButton>
                            <StyledDraftButton fullWidth onClick={handleSaveDraft}>Save Draft</StyledDraftButton>
                        </Box>
                    </Stack>
                </Stack>
            </form>
        </StepContainer>
    );
}

export default StepBasicInfo;