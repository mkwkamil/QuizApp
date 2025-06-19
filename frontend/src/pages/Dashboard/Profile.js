
import useAuthStore from "../../store/authStore";
import ProfileDetails from "../../components/ProfileDetails";
import Loading from "../../components/Loading";
import useProfile from "../../hooks/useProfile";

function Profile() {
    const user = useAuthStore(state => state.user);
    const { loading, error } = useProfile();

    if (loading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>You are not logged in!</div>;

    return <ProfileDetails {...user} />;
}

export default Profile;