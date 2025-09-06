# EMS Technical Assessment

Welcome to the **EMS Technical Assessment** project!  
This is a mini Event Management System built with Next.js that lets users view upcoming events, create new events, search or filter them, and see detailed information for each event. It is a lightweight project showcasing modern frontend practices with simple state management and validation.

---

## Table of Contents

- [Project Objectives](#project-objectives)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [How the Project Works](#how-the-project-works)
- [Contributing](#contributing)

---

## Tech Stack

- **JavaScript**
- **Next.js**
- **Tailwind CSS**
- **Daisy UI**
- **Axios**
- **React Hook Form**
- **Zod**
- **Lucid-React**
- **AOS**
- **ESLint**

---

## Project Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ashrafulatif/ems-technical-assesment.git
cd ems-technical-assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.  
Add the following line:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000/
```

**Note:**  
The .env file is included here only for task demonstration purposes.

### 4. Start the Development Server

```bash
npm run dev
```

The app should now be running locally.  
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

Here is a simple overview of the project's structure:

```
ems-technical-assesment/
│
├── .env                      # Environment variables (do not commit secrets)
├── .gitignore                # Files and folders to ignore in git
├── README.md                 # Main project documentation
├── eslint.config.mjs         # ESLint configuration for code quality
├── jsconfig.json             # JS/TS project configuration
├── next.config.mjs           # Next.js framework configuration
├── package.json              # NPM dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── postcss.config.mjs        # PostCSS configuration for styling
│
├── public/                   # Static assets served directly
│
└── src/                      # Main source code
    ├── app/                  # Next.js app directory (routing/pages/api)
    │   ├── layout.jsx        # App-wide layout
    │   ├── page.jsx          # Home page
    │   ├── events/           # Event-related routes
    │   │   ├── page.jsx      # All events listing
    │   │   ├── [id]/         # Dynamic route for event details
    │   │   │   └── page.jsx  # Event details page
    │   │   └── create-event/ # Create new event page
    │   │       └── page.jsx  # Event creation form
    │   └── api/              # Next.js API routes (server functions)
    │       └── events/       # API endpoints for events
    │           ├── route.js  # GET, POST, DELETE, PUT for events
    │           └── ...
    │
    ├── components/           # Reusable React components
    │   ├── layout.jsx        # Main contents layout
    │   ├── EventForm.tsx     # Form for creating/editing events
    │   ├── EventCard.tsx     # Card UI for individual event
    │   ├── Button.tsx        # Custom button component
    │   └── ...               # Other UI components
    │
    ├── context/              # React context for global state
    │   ├── EventContext.tsx  # Global event state management
    │   └── ...
    │
    ├── data/                 # Static/mock data files
    │   └── events.json       # Sample events data
    │
    ├── lib/
    │   ├── validation.js     # form validation schema
    │   └── ...
    │
    ├── page-section/         # Large sections of pages/layouts (optional)
    │   ├── event-sections    # Individual pages for each major part
    │   └── landing-pages     # Homepage banner/hero
    │
    └── utils/                # Helper functions
        ├── __api_            # Axios API helpers
        ├── instances.js      # Backend api instances
        └── ...
```

### Typical Usage of Folders

- **app/**: Main entry and Next.js route structure.
- **components/**: UI elements like event cards, search bar, forms.
- **context/**: Manage global state (for events, filters, etc.).
- **data/**: Store sample events or static data.
- **lib/**: API calls, validation, business logic helpers.
- **page-section/**: Individual pages/sections for each major part of the app (list, details, create event).
- **utils/**: Helper functions (date formatting, filtering, etc.).

---

## How the Project Works

- The app starts at the homepage, showing a list of upcoming events.
- Each event card can be clicked for more details.
- Use the filter/search bar to find specific events.
- Create a new event by filling out the form on the "Create Event" page.
- The event can be deleted or edited.
- All data can be managed via context or mock data in `src/data/`.

---

## Contributing

Want to improve the project?  
Fork it, create a new branch, make your changes, and submit a pull request!

---

Happy coding!
