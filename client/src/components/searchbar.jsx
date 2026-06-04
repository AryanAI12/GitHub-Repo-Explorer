import { useState, useEffect, useRef } from 'react'
import { saveToHistory, getHistory } from '../utils/formatters'

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(getHistory())
  const debounceRef = useRef(null)

  const handleSearch = (val) => {
    if (!val.trim()) return
    const updated = saveToHistory(val.trim())
    setHistory(updated)
    onSearch(val.trim())
  }

  const handleChange = (e) => {
    const val = e.target.value
    setInput(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (val.trim().length > 2) handleSearch(val.trim())
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      clearTimeout(debounceRef.current)
      handleSearch(input)
    }
  }

  return (
    <div className="search-wrap">
      <div className="search-row">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={() => handleSearch(input)} className="search-btn">
          Search
        </button>
      </div>

      {history.length > 0 && (
        <div className="history-row">
          <span className="history-label">Recent:</span>
          {history.map(u => (
            <button
              key={u}
              className="history-chip"
              onClick={() => { setInput(u); handleSearch(u) }}
            >
              {u}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar