import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');

  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: async () => {
      

      const res = await fetch(`https://api.github.com/users/${submittedUsername}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (!res.ok) throw new Error('User not found');

      const data = await res.json();
      console.log('data received:', data);
      return data;
    },
    enabled: !!submittedUsername,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setSubmittedUsername(username.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter the Github Username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default UserSearch;