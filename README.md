# Kunti Najma Jalia - Personal Website

A dynamic professional and academic personal website powered by Firebase, featuring an admin panel for content management.

## Features

- **Dynamic Content Management**: Admin panel for managing all content
- **Firebase Backend**: Authentication, Firestore, and Storage
- **Bilingual Support**: Indonesian and English content
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and semantic HTML
- **Production Ready**: Deployed on Vercel

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Content Format**: Markdown with sanitization

## Project Structure

```
kunti-najma-website/
├── public/              # Static assets
├── src/
│   ├── admin/          # Admin panel
│   ├── components/     # Reusable components
│   ├── config/         # Firebase configuration
│   ├── lib/            # Utilities and helpers
│   ├── pages/          # Page modules
│   ├── services/       # Firebase service layer
│   ├── styles/         # CSS modules
│   ├── app.js          # Main application
│   └── router.js       # Client-side routing
├── index.html          # Entry point
├── package.json
├── vercel.json
└── README.md
```

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/kuntinajma/kunti-najma-website.git
cd kunti-najma-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore Database (production mode)
4. Enable Storage
5. Copy your Firebase configuration

### 4. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_ADMIN_EMAIL=your_admin_email@example.com
```

### 5. Firebase Security Rules

Deploy the security rules in `firestore.rules` and `storage.rules`

### 6. Create Admin User

1. Run the development server: `npm run dev`
2. Navigate to `/admin`
3. Sign up with your admin email (specified in `.env`)

### 7. Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deployment

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `npm run deploy`
4. Add environment variables in Vercel dashboard

### Environment Variables in Vercel

Add all variables from `.env` in Vercel project settings:
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_ADMIN_EMAIL

## Firestore Data Model

### Collections

#### posts
```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "content": "string (markdown)",
  "tags": ["array"],
  "language": "id | en",
  "published": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "imageUrl": "string (optional)"
}
```

#### projects
```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "content": "string (markdown)",
  "tags": ["array"],
  "language": "id | en",
  "published": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "imageUrl": "string",
  "projectUrl": "string (optional)",
  "githubUrl": "string (optional)",
  "year": "number"
}
```

#### research
```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "content": "string (markdown)",
  "tags": ["array"],
  "language": "id | en",
  "published": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "year": "number",
  "authors": ["array"],
  "publicationVenue": "string",
  "doi": "string (optional)",
  "pdfUrl": "string (optional)"
}
```

#### activities
```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "content": "string (markdown)",
  "tags": ["array"],
  "language": "id | en",
  "published": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "imageUrl": "string (optional)",
  "startDate": "timestamp",
  "endDate": "timestamp (optional)",
  "organization": "string",
  "role": "string"
}
```

#### reflections
```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "content": "string (markdown)",
  "tags": ["array"],
  "language": "id | en",
  "published": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "imageUrl": "string",
  "location": "string",
  "date": "timestamp"
}
```

## License

MIT License - feel free to use this template for your own projects.
