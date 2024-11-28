# TopStudz

TopStudz is a modern student study management platform designed to help students track, optimize, and improve their study habits. With features like study session tracking, group collaboration, and performance analytics, TopStudz makes studying more effective and engaging.

## Features

- **🕒 Study Timer**
  - Customizable Pomodoro-style study sessions
  - Session tracking and statistics

- **📈 Performance Analytics**
  - Visual progress tracking
  - Monthly study hour analysis
  - Performance trends and insights

- **👥 Study Groups**
  - Create and join study groups
  - Group chat functionality
  - Collaborative study sessions

- **🏆 Leaderboards**
  - Global study time rankings
  - Group-specific leaderboards
  - Personal progress tracking

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/ui** - Re-usable component system

### Backend
- **Convex** - Backend application platform with real-time capabilities

## Getting Started

### Prerequisites
- Node.js 18+
- Convex account
- GitHub account (for authentication)

### Installation

1. Clone the repository
```bash
gh repo clone amanvarshney01/topstudz
cd topstudz
```

2. Install dependencies
```bash
bun i
```

5. Start the development server
```bash
bun run dev
```

> **Note:** Running `bun run dev` will automatically set up and initialize Convex for you. You'll be prompted to log in to your Convex account if you haven't already.

## Project Structure

```
topstudz/
├── app/                    # Next.js app directory
│   ├── (protected)/       # Protected routes (dashboard, groups, etc.)
│   └── signin/            # Authentication pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn)
│   └── ...               # Feature-specific components
├── convex/               # Backend functions and schema
│   ├── _generated/      # Generated Convex types
│   ├── schema.ts        # Database schema
│   └── ...              # Backend functions
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared logic
└── public/             # Static assets
```

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Convex](https://www.convex.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)

## Roadmap

- [ ] Mobile application
- [ ] Study material sharing
- [ ] AI-powered study recommendations
- [ ] Integration with calendar apps
- [ ] Advanced analytics and insights
