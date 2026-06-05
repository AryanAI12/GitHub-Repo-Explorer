import express from 'express'
import axios from 'axios'
import { get, set } from '../cache/store.js'

const router = express.Router()
const GITHUB_BASE = 'https://api.github.com'

const githubAxios = axios.create({
  baseURL: GITHUB_BASE,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    })
  }
})

router.get('/user/:username', async (req, res) => {
  const { username } = req.params
  const cacheKey = `user:${username}`

  const cached = get(cacheKey)
  if (cached) return res.json({ ...cached, fromCache: true })

  try {
    const response = await githubAxios.get(`/users/${username}`)
    set(cacheKey, response.data)
    return res.json({ ...response.data, fromCache: false })
  } catch (err) {
    console.log('USER ERROR:', err.message)
    if (err.response) {
      console.log('STATUS:', err.response.status)
      console.log('DATA:', err.response.data)
    }
    if (err.response?.status === 404)
      return res.status(404).json({ error: 'User not found' })
    if (err.response?.status === 403)
      return res.status(429).json({ error: 'GitHub rate limit exceeded' })
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

router.get('/user/:username/repos', async (req, res) => {
  const { username } = req.params
  const { page = 1, per_page = 10 } = req.query
  const cacheKey = `repos:${username}:${page}`

  const cached = get(cacheKey)
  if (cached) return res.json(cached)

  try {
    const response = await githubAxios.get(`/users/${username}/repos`, {
      params: { page, per_page, sort: 'updated' }
    })
    set(cacheKey, response.data)
    return res.json(response.data)
  } catch (err) {
    console.log('REPOS ERROR:', err.message)
    if (err.response) {
      console.log('STATUS:', err.response.status)
      console.log('DATA:', err.response.data)
    }
    return res.status(500).json({ error: 'Failed to fetch repositories' })
  }
})

export default router