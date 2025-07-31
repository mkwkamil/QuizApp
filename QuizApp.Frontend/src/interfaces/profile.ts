export interface ProfileSummary {
    publicName: string;
    bio: string;
    avatarUrl: string;
    username: string;
    email: string;
    joinDate: string;
    followersCount: number;
    followingCount: number;
}

export interface ProfileUpdate {
    publicName?: string;
    bio?: string;
}