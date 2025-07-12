# Re-wear - Sustainable Fashion Marketplace

A Next.js application for buying and selling pre-loved fashion items with Google OAuth authentication.

## Features

- 🔐 Google OAuth Authentication
- 🛍️ Browse sustainable fashion items
- 👤 User profile management
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🌱 Focus on sustainability

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd re-wear
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Google OAuth credentials:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env` file

### Database Setup

1. Generate Prisma client:
```bash
npx prisma generate
```

2. Push the database schema:
```bash
npx prisma db push
```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth.js configuration
│   ├── components/
│   │   ├── ProtectedRoute.tsx           # Route protection component
│   │   └── UserProfile.tsx              # User profile display
│   ├── hooks/
│   │   └── useAuth.ts                   # Authentication hook
│   ├── lib/
│   │   └── auth.ts                      # Server-side auth utilities
│   ├── main/
│   │   └── page.tsx                     # Main marketplace page
│   ├── signin/
│   │   └── page.tsx                     # Sign in page
│   ├── signup/
│   │   └── page.tsx                     # Sign up page
│   ├── globals.css                      # Global styles
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Landing page
│   └── providers.tsx                    # Session provider
├── prisma/
│   └── schema.prisma                    # Database schema
├── .env                                 # Environment variables
└── package.json                         # Dependencies
```

## Authentication Flow

1. **Sign Up/Sign In**: Users can authenticate using Google OAuth
2. **Protected Routes**: The main marketplace is protected and requires authentication
3. **User Profile**: Displays user information and provides logout functionality
4. **Session Management**: Automatic session handling with NextAuth.js

## Database Schema

The application uses Prisma with the following models:
- `User`: User accounts with Google OAuth data
- `Account`: OAuth account information
- `Session`: User sessions
- `VerificationToken`: Email verification tokens

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `NEXTAUTH_URL` | Your application URL | Yes |
| `NEXTAUTH_SECRET` | Secret for JWT encryption | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
