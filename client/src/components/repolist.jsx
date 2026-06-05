import { useState } from 'react'
import RepoCard from './repocard'

function RepoList({ repos, hasMore, onLoadMore }) {
  const [sortBy, setSortBy] = useState('updated')

  const sorted = [...repos].sort((a, b) => {
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return new Date(b.updated_at) - new Date(a.updated_at)
  })

  return (
    <div className="repo-section">
      <div className="repo-header">
        <h3 className="repo-title">Repositories ({repos.length})</h3>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="updated">Last Updated</option>
          <option value="stars">Most Stars</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      <div className="repo-list">
        {sorted.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {hasMore && (
        <button className="load-more-btn" onClick={onLoadMore}>
          Load More Repositories
        </button>
      )}
    </div>
  )
}

export default RepoList