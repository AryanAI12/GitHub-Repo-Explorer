# GitHub Repo Explorer

A full-stack web application that lets you search any GitHub user and explore
their public repositories. Built with React + Vite (frontend) and 
Node.js + Express (backend).

## Live Demo
- Frontend: https://git-hub-repo-explorer-alpha.vercel.app/
- Backend: https://github-repo-explorer-1.onrender.com

## Tech Stack

| Tool | Why |
|------|-----|
| Node.js + Express | Lightweight backend, perfect for a proxy API |
| Axios (server) | Cleaner than fetch for server-side HTTP requests |
| In-memory Cache | Reduces GitHub API calls, avoids rate limiting |
| React + Vite | Fast dev setup with hot reload |
| Axios (client) | Promise-based HTTP requests from frontend |
| CSS | Plain CSS for full control over styling |

## How to Run Locally

### Prerequisites
- Node.js v18 or higher

### 1. Clone the repository
git clone https://github.com/AryanAI12/GitHub-Repo-Explorer.git
cd GitHub-Repo-Explorer

### 2. Setup Backend
cd server
npm install

Create a .env file inside the server folder:
PORT=5000
GITHUB_TOKEN=your_github_token_here

Get a free token at: github.com → Settings → Developer settings → 
Personal access tokens → Generate new token (no scopes needed)

Run the server:
node index.js

Server will start at http://localhost:5000

### 3. Setup Frontend
Open a new terminal:
cd client
npm install
npm run dev

Frontend will start at http://localhost:5173

## API Documentation

### GET /api/user/:username
Fetches a GitHub user's profile.

Response (200):
{
  "login": "torvalds",
  "name": "Linus Torvalds",
  "avatar_url": "https://...",
  "bio": "...",
  "followers": 240000,
  "following": 0,
  "public_repos": 12,
  "fromCache": false
}

Error responses:
- 404: { "error": "User not found" }
- 429: { "error": "GitHub rate limit exceeded. Try again later." }
- 500: { "error": "Something went wrong" }

### GET /api/user/:username/repos?page=1&per_page=10
Fetches paginated list of public repositories.

Query params:
- page (default: 1)
- per_page (default: 10)

Response (200): Array of repository objects with name, description,
language, stargazers_count, forks_count, updated_at, default_branch,
open_issues_count

## Project Structure

```
GitHub-Repo-Explorer/
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   ├── searchbar.jsx     # Search input with history
│       │   ├── userprofile.jsx   # User profile card with cache badge
│       │   ├── repolist.jsx      # Repo list with sorting
│       │   ├── repocard.jsx      # Expandable repo card
│       │   └── skeletonloa.jsx   # Loading skeleton
│       ├── hooks/
│       │   └── usersearch.js     # Custom hook for API calls
│       ├── utils/
│       │   └── formatters.js     # Date, number, localStorage helpers
│       └── App.jsx
├── server/                  # Node.js backend
│   ├── cache/
│   │   └── store.js         # In-memory cache with 60s TTL
│   ├── routes/
│   │   └── github.js        # GitHub API proxy routes
│   └── index.js             # Express app entry point
├── .gitignore
└── README.md
```

## Features

- Search any GitHub username with Enter key or Search button
- View profile: avatar, name, bio, location, company, follower stats
- Browse public repositories with name, description, language, stars, forks
- Sort repositories by Last Updated, Most Stars, or Name A-Z
- Click any repo card to expand and see branch, issues, watchers
- Load more repositories with pagination (10 per page)
- Recently searched usernames saved and shown as clickable chips
- Server-side cache (60 second TTL) with visual ⚡ Cached / 🔄 Live badge
- Skeleton loading states while data is being fetched
- Clear error messages for invalid usernames and rate limits

## Development Notes

### AI Tool Usage
I used Claude (Anthropic) as a development assistant during this project.
Specifically for suggesting folder structure, debugging JSX syntax errors,
and reviewing Express route design.

Every line of code has been read, understood, and tested by me locally.

### Inspiration
The backend proxy pattern in this project is similar to the service layer
I built in my blockchain-based land registry system, where the React 
frontend never called the Ethereum node directly. All contract interactions
went through a dedicated backend layer, keeping credentials server-side.

## Next Steps

- Language distribution chart showing breakdown of languages across repos
- Redis cache for persistence across server restarts
- Dark / light mode toggle
- Unit tests with Jest/Vitest for cache module and API routes
- Search repositories by name or filter by language