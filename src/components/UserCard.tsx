import { checkIfFollowingUser, followUser, unfollowUser } from "../api/github";
import { FaGithubAlt, FaUserMinus } from "react-icons/fa";
import type { GithubUser } from "../types";
import { useQuery, useMutation } from "@tanstack/react-query";

const UserCard = ({user}: {user: GithubUser}) => {
    const {data:isFollowing, refetch} = useQuery({
        queryKey: ['follow-status',user.login],
        queryFn: () => checkIfFollowingUser(user.login),
        enabled: !!user.login
    });

    const followMutation = useMutation({
        mutationFn: () => followUser(user.login),
        onSuccess: () => {
            console.log(`You are now following ${user.login}`)
            refetch();
        },
        onError: (error) => {
            console.error(error.message)
        }
    })

    const unfollowMutation = useMutation({
        mutationFn: () => unfollowUser(user.login),
        onSuccess: () => {
            console.log(`You are no longer following ${user.login}`)
            refetch();
        },
        onError: (error) => {
            console.error(error.message)
        }
    })

    const handleFollow = () => {
        if (isFollowing) {
            unfollowMutation.mutate();
        } else {
            followMutation.mutate();
        }
    }
    return (
        <div className="user-card">
            <img src={user.avatar_url} alt={user.name} className="avatar"/>
            <h2>{user.name || user.login}</h2>
            <p className="bio">{user.bio}</p>

            <div className="user-card-buttons">
                <button
                    disabled={followMutation.isPending || unfollowMutation.isPending}
                    onClick={handleFollow}
                    className={`follow-btn ${isFollowing ? "following" : ""}`}
                >
                    {isFollowing ? (
                        <>
                            <FaUserMinus className="follow-icon" /> Following
                        </>
                    ) : (
                        <>
                            <FaUserMinus className="follow-icon" /> Follow User
                        </>
                    )}
                </button>
            <a href={user.html_url} className="profile-btn" target="_blank" rel="noopener noreferer">
                <FaGithubAlt /> Github URL
                </a>

            </div>
        </div>
    );
}

export default UserCard;