export const fetchGithubUser = async (username:string) => {
    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (!res.ok) throw new Error('User not found');

      const data = await res.json();
      
      return data;
}