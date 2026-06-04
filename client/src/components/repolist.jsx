import { useState } from 'react'
import RepoCard from './RepoCard'
import { getLanguageStats } from '../utils/formatters'

function RepoList({ repos, hasMore, onLoadMore }) {
  const [sortBy, setSortBy] = useState('updated')

  const sorted = [...repos].sort((a, b) => {
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return new Date(b.updated_at) - new Date(a.updated_at)
  })

  const langStats = getLanguageStats(repos)

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

      {langStats.length > 0 && (
        <div className="lang-chart">
          <p className="lang-chart-title">Top Languages</p>
          <div className="lang-bars">
            {langStats.map(([lang, count]) => (
              <div key={lang} className="lang-bar-row">
                <span className="lang-name">{lang}</span>
                <div className="lang-bar-bg">
                  <div
                    className="lang-bar-fill"
                    style={{ width: `${(count / repos.length) * 100}%` }}
                  ></div>
                </div>
                <span className="lang-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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