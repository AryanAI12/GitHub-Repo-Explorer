export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}

export function getLanguageStats(repos) {
  const stats = {}
  repos.forEach(repo => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1
    }
  })
  return Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
}

export function saveToHistory(username) {
  const history = JSON.parse(localStorage.getItem('gh_history') || '[]')
  const updated = [username, ...history.filter(u => u !== username)].slice(0, 5)
  localStorage.setItem('gh_history', JSON.stringify(updated))
  return updated
}

export function getHistory() {
  return JSON.parse(localStorage.getItem('gh_history') || '[]')
}