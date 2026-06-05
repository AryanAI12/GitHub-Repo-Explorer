import express from 'express'
import axios from 'axios'
import { get, set } from '../cache/store.js'

const router = express.Router()
const GITHUB_BASE = 'https://api.github.com'

const githubHeaders = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
}

router.get('/user/:username', async (req, res) => {
  const { username } = req.params
  const cacheKey = `user:${username}`

  const cached = get(cacheKey)
  if (cached) return res.json({ ...cached, fromCache: true })

  try {
    const { data } = await axios.get(`${GITHUB_BASE}/users/${username}`, {
      headers: githubHeaders
    })
    set(cacheKey, data)
    res.json({ ...data, fromCache: false })
  } catch (err) {
    if (err.response?.status === 404)
      return res.status(404).json({ error: 'User not found' })
    if (err.response?.status === 403)
      return res.status(429).json({ error: 'GitHub rate limit exceeded. Try again later.' })
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.get('/user/:username/repos', async (req, res) => {
  const { username } = req.params
  const { page = 1, per_page = 10 } = req.query
  const cacheKey = `repos:${username}:${page}`

  const cached = get(cacheKey)
  if (cached) return res.json(cached)

  try {
    const { data } = await axios.get(
      `${GITHUB_BASE}/users/${username}/repos`,
      {
        headers: githubHeaders,
        params: { page, per_page, sort: 'updated' }
      }
    )
    set(cacheKey, data)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch repositories' })
  }
})

export default router