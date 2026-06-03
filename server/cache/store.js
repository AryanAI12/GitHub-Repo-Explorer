const cache = {}
const TTL = 60 * 1000

export function get(key) {
  const entry = cache[key]
  if (!entry) return null
  if (Date.now() - entry.timestamp > TTL) {
    delete cache[key]
    return null
  }
  return entry.data
}

export function set(key, data) {
  cache[key] = { data, timestamp: Date.now() }
}