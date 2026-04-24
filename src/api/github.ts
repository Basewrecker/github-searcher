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
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const apiUrlFromEnv = import.meta.env.VITE_GITHUB_API_URL;
  const normalizedApiUrl = typeof apiUrlFromEnv === "string" ? apiUrlFromEnv.trim() : "";
  const apiUrl =
    normalizedApiUrl && normalizedApiUrl !== "undefined" && normalizedApiUrl !== "null"
    ? normalizedApiUrl
    : "https://api.github.com";
      
  const res = await fetch(`${apiUrl.replace(/\/$/, "")}/search/users?q=${encodeURIComponent(trimmedQuery)}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!res.ok) throw new Error('User not found');

    const data = await res.json();
    
    return data.items ?? [];
}

export const checkIfFollowingUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    }
  );

  if (res.status === 204) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Failed to check follow status')
  }
}

export const followUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      }
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to follow user');
  }
}