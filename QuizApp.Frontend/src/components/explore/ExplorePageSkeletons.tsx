import { Chip, Paper, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const SkeletonCard = styled(Paper)({
    display: 'flex',
    gap: 16,
    padding: 15,
    borderRadius: 12,
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    transition: 'all 0.2s',
});

export const ExploreQuizSkeleton = ({ items = 4 }: { items?: number }) => (
    <Stack spacing={2}>
        {Array.from({ length: items }).map((_, idx) => (
            <SkeletonCard key={idx}>
                <Skeleton variant="rectangular" width={100} height={80} animation="wave" />
                <Stack spacing={1} flex={1}>
                    <Skeleton variant="text" width="80%" animation="wave" />
                    <Skeleton variant="text" width="60%" animation="wave" />
                </Stack>
            </SkeletonCard>
        ))}
    </Stack>
);

const QuizCategorySkeletonChip = styled(Chip)({
    borderRadius: 24,
    fontWeight: 600,
    fontSize: 14,
    padding: "8px 16px",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#aaa",
    width: 100,
    height: 32,
});

export const QuizCategorySkeletonChips = ({ items = 8 }: { items?: number }) => (
    <Stack direction="row" spacing={1}>
        {Array.from({ length: items }).map((_, idx) => (
            <QuizCategorySkeletonChip key={idx} />
        ))}
    </Stack>
);