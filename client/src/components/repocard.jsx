import { useState } from 'react'
import { formatDate } from '../utils/formatters'

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Solidity: '#AA6746',
  Rust: '#dea584',
  Go: '#00ADD8',
  Other: '#8b949e'
}

function RepoCard({ repo }) {
  const [expanded, setExpanded] = useState(false)
  const color = langColors[repo.language] || langColors.Other

  return (
    <div className="repo-card" onClick={() => setExpanded(!expanded)}>
      <div className="repo-top">
        <div>
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-name" onClick={(e) => e.stopPropagation()}>
            {repo.name}
          </a>
          {repo.description && <p className="repo-desc">{repo.description}</p>}
        </div>
        <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
      </div>

      <div className="repo-meta">
        {repo.language && (
          <span className="repo-lang">
            <span className="lang-dot" style={{ background: color }}></span>
            {repo.language}
          </span>
        )}
        <span className="repo-stat">⭐ {repo.stargazers_count}</span>
        <span className="repo-stat">🍴 {repo.forks_count}</span>
        <span className="repo-stat">Updated {formatDate(repo.updated_at)}</span>
      </div>

      {expanded && (
        <div className="repo-expanded">
          <div className="expanded-row">
            <span>📂 Branch: <strong>{repo.default_branch}</strong></span>
            <span>🐛 Issues: <strong>{repo.open_issues_count}</strong></span>
            <span>👁 Watchers: <strong>{repo.watchers_count}</strong></span>
          </div>
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-link" onClick={(e) => e.stopPropagation()}>
            Open Repository →
          </a>
        </div>
      )}
    </div>
  )
}

export default RepoCard