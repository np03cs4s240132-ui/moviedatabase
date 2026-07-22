# Movie Database Workshop

Full-stack movie collection app built with React + Vite, Tailwind CSS, Express, and MongoDB Atlas.

## Project Structure

```
week10workshop/
├── frontend/     # React + Vite client
└── backend/      # Express + MongoDB API
```

## Setup

### Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Replace `<username>` and `<password>` with your MongoDB Atlas credentials
3. Install and run:

```bash
cd backend
npm install
npm run dev
```

API runs at `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies?genre=Action` | Filter by genre |
| GET | `/api/movies?search=matrix` | Search by title |
| GET | `/api/movies/:id` | Get single movie |
| POST | `/api/movies` | Add a movie |
| DELETE | `/api/movies/:id` | Delete a movie |

### POST body example

```json
{
  "title": "The Matrix",
  "genre": "Action",
  "year": 1999,
  "director": "The Wachowskis",
  "synopsis": "A computer hacker learns about the true nature of reality."
}
```

## Postman Testing

1. Start the backend server
2. Test `GET http://localhost:5000/api/movies`
3. Test `POST http://localhost:5000/api/movies` with JSON body
4. Test `GET http://localhost:5000/api/movies/:id`
5. Test `DELETE http://localhost:5000/api/movies/:id`
6. Test filters: `?genre=Action` and `?search=matrix`

## Features

- Movie cards with color-coded rating badges (8+ green, 5-7.9 amber, below 5 red)
- Browse, Watchlist, and Add Movie views
- Live search and dashboard stats
- Movie detail view with synopsis and cast
- MongoDB persistence via Axios

## Git Branches

- `main` — stable branch
- `dev` — development branch
