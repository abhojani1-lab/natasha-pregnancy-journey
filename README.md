# Natasha's Pregnancy Journey

A beautiful pregnancy tracking web application built with Next.js 15 and React 19.

## Features

- **Home Dashboard**: Weekly pregnancy information, baby size, and quick actions
- **Symptom Tracker**: Log and track pregnancy symptoms with severity levels
- **Photo Timeline**: Document your bump progression week by week
- **Appointments**: Keep track of all your medical appointments
- **Memory Journal**: Write and preserve precious memories
- **Pregnancy Checklist**: Manage tasks organized by trimester and category
- **Kick Counter**: Track baby movements (available from week 28)
- **Contraction Timer**: Time contractions when labor begins

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Lucide React** - Beautiful icons
- **localStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Vercel Deployment

### Option A: Deploy from GitHub (Recommended)

1. Push your code to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click "Import Git Repository"
4. Select your repository
5. Vercel will auto-detect Next.js - just click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## Customization

### Update Due Date or Current Week

Edit `components/PregnancyJourneyApp.tsx`:
- Line 37: Change `dueDate`
- Line 38: Change `currentWeek`

### Add More Weekly Data

Extend the `weekData` object in `components/PregnancyJourneyApp.tsx` to add information for more weeks of pregnancy.

## Data Privacy

- All data is stored **locally in the browser** using localStorage
- No data is sent to external servers
- Data persists across browser sessions on the same device

## Mobile Access

Add the website to your phone's home screen for easy access:
- **iPhone**: Safari → Share → Add to Home Screen
- **Android**: Chrome → Menu → Add to Home Screen

## Project Structure

```
natasha-pregnancy-journey/
├── app/
│   ├── globals.css      # Global styles and animations
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page
├── components/
│   ├── ModalForm.tsx    # Form modal component
│   └── PregnancyJourneyApp.tsx  # Main app component
├── hooks/
│   └── useLocalStorage.ts  # LocalStorage hook
├── types/
│   └── index.ts         # TypeScript types
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── package.json
└── tsconfig.json
```

## License

Private project for personal use.
