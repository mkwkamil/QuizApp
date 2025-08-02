import { Typography } from "@mui/material";
import {
    ActionButton,
    FollowUserItemWrapper,
    NameColumn,
    StyledAvatar,
    UserInfo
} from "@components/profile/modal/styles/FollowListModalLayout.ts";
import {useFollowUser} from "@hooks/users/useFollowUser.ts";

type FollowUserItemProps = {
    userId: number;
    username: string;
    publicName?: string;
    avatarUrl?: string;
    type: "followers" | "following";
};

const FollowUserItem = ({ userId, username, publicName, avatarUrl, type }: FollowUserItemProps) => {
    const { unfollow, removeFollower } = useFollowUser(userId);

    const handleClick = () => {
        if (type === "followers") {
            removeFollower.mutate();
        } else {
            unfollow.mutate();
        }
    };

    return (
        <FollowUserItemWrapper>
            <UserInfo>
                <StyledAvatar src={avatarUrl} />
                <NameColumn>
                    {username != publicName ? (
                        <>
                            <Typography fontWeight={700}>{publicName}</Typography>
                            <Typography fontSize={14} color="#aaa">{username}</Typography>
                        </>
                    ) : (
                        <Typography fontWeight={700} mt="-3px">{username}</Typography>
                    )}
                </NameColumn>
            </UserInfo>

            <ActionButton variant="contained" onClick={handleClick}>
                {type === "followers" ? "Remove" : "Following"}
            </ActionButton>
        </FollowUserItemWrapper>
    );
};

export default FollowUserItem;