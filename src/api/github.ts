export const fetchGithubUser = async (username:string) => {
    const apiUrlFromEnv = import.meta.env.VITE_GITHUB_API_URL;
    const normalizedApiUrl = typeof apiUrlFromEnv === "string" ? apiUrlFromEnv.trim() : "";
    const apiUrl =
      normalizedApiUrl && normalizedApiUrl !== "undefined" && normalizedApiUrl !== "null"
      ? normalizedApiUrl
      : "https://api.github.com";
        
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (!res.ok) throw new Error('User not found');

      const data = await res.json();
      
      return data;
}

export const searchGithubUser = async (query:string) => {
  const apiUrlFromEnv = import.meta.env.VITE_GITHUB_API_URL;
  const normalizedApiUrl = typeof apiUrlFromEnv === "string" ? apiUrlFromEnv.trim() : "";
  const apiUrl =
    normalizedApiUrl && normalizedApiUrl !== "undefined" && normalizedApiUrl !== "null"
    ? normalizedApiUrl
    : "https://api.github.com";
      
  const res = await fetch(`${apiUrl.replace(/\/$/, "")}/users/?q=${query}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!res.ok) throw new Error('User not found');

    const data = await res.json();
    
    return data;
}