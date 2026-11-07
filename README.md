## School Clinic Management System Frontend (React.js, TypeScript, Tailwind CSS)

This is the frontend of the School Clinic Management System, built using **React**, **TypeScript**, and **Tailwind CSS**. It helps school nurses and clinic staff track student visits, medical logs, illness trends, and medicine inventory in real time.

### Key Features

• Automatic Login Persistence: Keeps users logged in when they refresh the browser by checking their token, name, and role from local storage on startup.
• Data Modeling: Organized TypeScript types that match the backend API response exactly to prevent broken pages or undefined values.
• Fast Development: Configured with Vite for instant hot-reloading whenever you save code changes.

### Project Structure

The code is split up strictly to keep the application organized and ensure that instant hot-reloading works without bugs:

```
text
src/
├── api/             # Axis configuration
├── components/      # UI Cards, buttons, tables, and layouts
├── contexts/        # Central state managers (like authentication status)
├── features/
├── hooks/           # Custom React hooks
├── layouts/
├── pages/
├── types/           # Data modeling matching backend database entities
│   ├── patient.ts
│   ├── illness.ts
│   ├── medicine.ts
│   ├── consultation.ts
│   └── user.ts
└── utils/            # Helper functions (like local storage readers)
```

### Tech Stack & Tool Used

- React.js
- TypeScript
- TailwindCSS
- Axios

### Setup & Run

**1. Install dependencies:**

```
bash
npm install
```

**2. Run the development server:**

```
bash
npm run dev
```

After that, open the local link printed in the terminal to see the app in the browser.
**3. Build for production:**

```
bash
npm run build
```
