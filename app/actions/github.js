export async function getGithubCommits(username) {
  if (!username) return null;
  
  try {
    const res = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      console.error('GitHub API error:', res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data.total_count;
  } catch (error) {
    console.error('Failed to fetch github commits', error);
    return null;
  }
}




