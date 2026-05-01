# Candidate Application UI

A simple Next.js app for submitting a candidate job application.

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open in your browser:

- Home page: `http://localhost:3000`
- Application form: `http://localhost:3000/apply`

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run lint checks

## Notes

- The form submits to `POST /api/apply`.
- Resume upload currently accepts PDF and stores it as a base64 data URL for demo purposes.
