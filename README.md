# Smart Calendar - AI-Powered Time Management

A prototype calendar application that integrates with Google Calendar and provides AI-powered time blocking suggestions with social features for activity tracking and sharing.

## Features

### 🗓️ Google Calendar Integration
- Import and display calendar events
- View weekly calendar layout
- Add new events

### 🧠 AI Time Block Suggestions
- Analyze free time in your schedule
- Suggest optimal time blocks for different activities:
  - CS Study sessions
  - Economics study time
  - Reading time
  - Gym workouts
  - Personal time
- Accept or reject AI suggestions
- Priority-based recommendations

### ⏱️ Activity Tracker (Strava-like)
- Start, pause, and stop activity timers
- Track time spent on different activities
- Real-time session tracking
- Daily activity summaries
- Categories: CS Study, Econ Study, Reading, Gym, Personal

### 👥 Social Features
- Share completed activities with friends
- Like and comment on friends' activities
- Activity feed showing community achievements
- Social engagement metrics

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React hooks
- **Calendar**: React Calendar

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── GoogleCalendarAuth.tsx    # Google Calendar authentication
│   ├── CalendarView.tsx          # Calendar display component
│   ├── TimeBlockSuggestions.tsx  # AI suggestions interface
│   ├── ActivityTracker.tsx       # Activity tracking component
│   └── SocialFeed.tsx            # Social activity feed
└── package.json
```

## User Journey

1. **Connect Calendar**: User authenticates with Google Calendar to import their schedule
2. **AI Suggestions**: System analyzes free time and suggests optimal time blocks for different activities
3. **Activity Tracking**: User starts timing activities (like Strava) and can pause/stop as needed
4. **Social Sharing**: Completed activities can be shared with friends who can react and comment

## Future Enhancements

- Real Google Calendar API integration
- Machine learning for better time block suggestions
- Push notifications for activity reminders
- Team/group activity challenges
- Detailed analytics and insights
- Mobile app development

## Prototype Notes

This is a prototype demonstrating the core user journey and interface design. The Google Calendar integration is simulated, and the AI suggestions are generated with mock data. In a production version, you would:

- Integrate with real Google Calendar API
- Implement actual AI/ML algorithms for suggestions
- Add backend services for data persistence
- Implement real-time social features
- Add user authentication and profiles
