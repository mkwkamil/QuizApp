
function ProfileDetails({ username, email, role }) {
    return (
        <div>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {role}</p>
        </div>
    )
}

export default ProfileDetails