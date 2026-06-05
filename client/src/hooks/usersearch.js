import { useState } from 'react'
import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:5000/api'

export function useGithubSearch() {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [currentUsername, setCurrentUsername] = useState('')

  const search = async (username) => {
    if (!username.trim()) return
    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])
    setPage(1)
    setCurrentUsername(username)

    try {
      const [userRes, reposRes] = await Promise.all([
        axios.get(`${BASE}/user/${username}`),
        axios.get(`${BASE}/user/${username}/repos?page=1&per_page=10`)
      ])
      setUser(userRes.data)
      setRepos(reposRes.data)
      setHasMore(reposRes.data.length === 10)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    const nextPage = page + 1
    try {
      const { data } = await axios.get(
        `${BASE}/user/${currentUsername}/repos?page=${nextPage}&per_page=10`
      )
      setRepos(prev => [...prev, ...data])
      setPage(nextPage)
      setHasMore(data.length === 10)
    } catch (err) {
      setError('Failed to load more repos')
    }
  }

  return { user, repos, loading, error, hasMore, search, loadMore }
}