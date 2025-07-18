export interface ProfileSummary {
    publicName: string;
    bio: string;
    avatarUrl: string;
    username: string;
    email: string;
    joinDate: string;
    quizzesCreated: number;
    accuracy: string;
}

export interface ProfileUpdate {
    publicName?: string;
    bio?: string;
}