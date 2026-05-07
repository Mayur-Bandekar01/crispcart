# More Retail Landing Page

This workspace contains a React/Vite landing page and a small Express API that serves mock landing-page data.

## Project Layout

- `frontend/` - main React app
- `backend/` - Express API
- `index.html`, `style.css`, `script.js` - standalone static prototype
- `landing.html` - currently empty

## Run Locally

Backend:

```sh
cd backend
npm install
npm run dev
```

Frontend:

```sh
cd frontend
npm install
npm run dev
```

By default, the frontend expects the API at `http://localhost:5000/api`. Override it with `frontend/.env`:

```sh
VITE_API_URL=http://localhost:5000/api
```

The backend allows `http://localhost:5173` by default. Override allowed origins with `backend/.env`:

```sh
CORS_ORIGIN=http://localhost:5173
```

Use comma-separated origins for multiple frontend URLs.

## Verification

```sh
cd backend
npm test

cd ../frontend
npm test
```
"# more-cloned" 
