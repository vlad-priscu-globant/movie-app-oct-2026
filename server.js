import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import fs from 'fs-extra'
import dotenv from 'dotenv'

// Load .env (and support fallback to 'env' if file is un-dotted)
dotenv.config()
if (fs.existsSync('env')) {
  dotenv.config({ path: 'env' })
}
const app = express()
const PORT = 3000
const JWT_SECRET = 'super-secret-key'
const DB_FILE = './db.json'

// Hardcoded users for demonstration
const USERS = [
  { username: 'student@adresa.ro', password: 'password123' }
]

app.use(cors())
app.use(express.json())

// Login Endpoint for JWT Generation
app.post('/login', (req, res) => {
  const { username, password } = req.body

  // interogare in db
  const user = USERS.find(u => u.username === username && u.password === password)

  if (user || username === 'guest' || username === 'student') {
    const token = jwt.sign({ username: user?.username || username || 'guest' }, JWT_SECRET, { expiresIn: '24h' })
    return res.json({ token })
  }

  res.status(401).json({ error: 'Invalid credentials' })
})

// JWT Protection Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]
  
  if (!token) return res.status(401).json({ error: 'Token required' })

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

// Database helper functions
async function readFavorites() {
  const db = await fs.readJson(DB_FILE).catch(() => ({ favorites: [] }))
  return db.favorites || []
}

async function writeFavorites(favorites) {
  await fs.writeJson(DB_FILE, { favorites }, { spaces: 2 })
}

// Routes

// Proxy endpoint for TMDB API (Public)
app.get('/api/movies/popular', async (req, res) => {
  const token = process.env.VITE_API_URL || process.env.VITE_TMDB_API_KEY || ''
  const baseUrl = (process.env.NUXT_PUBLIC_BASE_URL || process.env.VITE_BASE_URL || 'https://api.themoviedb.org/3').replace(/\/$/, '')
  try {
    const headers = {}
    let fetchUrl = `${baseUrl}/movie/popular?language=en-US&page=1`

    if (token.startsWith('eyJ')) {
      headers['Authorization'] = `Bearer ${token}`
    } else if (token) {
      fetchUrl += `&api_key=${token}`
    }

    const response = await fetch(fetchUrl, { headers })
    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      console.error(`TMDB fetch failed (${response.status}):`, errorText)
      return res.status(response.status).json({ error: 'Failed to fetch from TMDB' })
    }
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('TMDB Proxy Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Proxy endpoint for TMDB Movie Details (Public)
app.get('/api/movies/:id', async (req, res) => {
  const id = req.params.id
  const token = process.env.VITE_API_URL || process.env.VITE_TMDB_API_KEY || ''
  const baseUrl = (process.env.NUXT_PUBLIC_BASE_URL || process.env.VITE_BASE_URL || 'https://api.themoviedb.org/3').replace(/\/$/, '')

  try {
    const headers = {}
    let fetchUrl = `${baseUrl}/movie/${id}?language=en-US`

    if (token.startsWith('eyJ')) {
      headers['Authorization'] = `Bearer ${token}`
    } else if (token) {
      fetchUrl += `&api_key=${token}`
    }

    const response = await fetch(fetchUrl, { headers })
    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      console.error(`TMDB detail fetch failed (${response.status}):`, errorText)
      return res.status(response.status).json({ error: 'Failed to fetch movie details from TMDB' })
    }
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('TMDB Detail Proxy Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})
app.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const favorites = await readFavorites()
    const userFavorites = favorites.filter(item => item.addedBy === req.user.username)
    res.json(userFavorites)
  } catch {
    res.status(500).json({ error: 'Failed to read favorites' })
  }
})

app.get('/favorites/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

  try {
    const favorites = await readFavorites()
    const favorite = favorites.find(item => item.id === id && item.addedBy === req.user.username)
    res.json({ isFavorite: !!favorite, favorite: favorite || null })
  } catch {
    res.status(500).json({ error: 'Failed to check favorite' })
  }
})

app.post('/favorites', authenticateToken, async (req, res) => {
  const data = req.body
  const requiredFields = ['id', 'title'] // Simplified for the new session structure

  const missing = requiredFields.filter(field => !(field in data))
  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` })
  }

  try {
    const favorites = await readFavorites()
    
    if (favorites.some(item => item.id === data.id && item.addedBy === req.user.username)) {
      return res.status(409).json({ error: 'Movie already in favorites' })
    }

    favorites.push({ ...data, addedBy: req.user.username })
    await writeFavorites(favorites)

    res.status(200).json({ message: 'Favorite added' })
  } catch {
    res.status(500).json({ error: 'Failed to save favorite' })
  }
})

app.delete('/favorites/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

  try {
    const favorites = await readFavorites()
    const updated = favorites.filter(item => !(item.id === id && item.addedBy === req.user.username))

    if (updated.length === favorites.length) {
      return res.status(404).json({ error: 'Favorite not found' })
    }

    await writeFavorites(updated)
    res.json({ message: `Favorite ${id} removed` })
  } catch {
    res.status(500).json({ error: 'Failed to delete favorite' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})