import { useState } from 'react'
import SearchBar from './components/searchbar'
import UserProfile from './components/userprofile'
import RepoList from './components/repolist'
import SkeletonLoader from './components/skeletonload'
import { useGithubSearch } from './hooks/usersearch'
import './index.css'

function App() {
  const [username, setUsername] = useState('')
  const { user, repos, loading, error, hasMore, search, loadMore } = useGithubSearch()

  const handleSearch = (val) => {
    setUsername(val)
    search(val)
  }

  return (
    <div className="app">
      <h1 className="title">GitHub Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <SkeletonLoader />}
      {error && <p className="error">{error}</p>}
      {user && !loading && (
        <>
          <UserProfile user={user} />
          <RepoList repos={repos} hasMore={hasMore} onLoadMore={loadMore} />
        </>
      )}
      {!user && !loading && !error && (
        <div className="empty-state">
          <p>Search for any GitHub username to explore their profile and repositories.</p>
        </div>
      )}
    </div>
  )
}

export default App