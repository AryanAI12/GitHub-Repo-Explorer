import { formatNumber } from '../utils/formatters'

function UserProfile({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-top">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <div className="profile-info">
          <div className="profile-name-row">
            <h2 className="profile-name">{user.name || user.login}</h2>
            {user.fromCache
              ? <span className="cache-badge cache-hit">⚡ Cached</span>
              : <span className="cache-badge cache-live">🔄 Live</span>}
          </div>
          <p className="profile-login">@{user.login}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
          {user.company && <p className="profile-meta">🏢 {user.company}</p>}
          {user.location && <p className="profile-meta">📍 {user.location}</p>}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-num">{formatNumber(user.followers)}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-num">{formatNumber(user.following)}</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat">
          <span className="stat-num">{user.public_repos}</span>
          <span className="stat-label">Repos</span>
        </div>
        <div className="stat">
          <span className="stat-num">{user.public_gists}</span>
          <span className="stat-label">Gists</span>
        </div>
      </div>

      <a href={user.html_url} target="_blank" rel="noreferrer" className="github-link">View on GitHub →</a>
    </div>
  )
}

export default UserProfile