import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";
import UserCard from "./UserCard";

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [recentUsers, setRecentUsers] = useState<string[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setSubmittedUsername(trimmed);

    setRecentUsers((prev) => {
        const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
        return updated.slice(0,5);
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter the Github Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>

    {isLoading && <p className="status">Loading..</p>}
    {isError && <p className="status error">{error.message}</p>}

    {data && 
        <UserCard user = {data}/>
    }
    </>

  )
}

export default UserSearch;