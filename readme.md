# Event Management System

A full-stack event management system built with:

- Frontend: React, Axios, TailwindCSS  
- Backend: Node.js, Express, Sequelize (SQLite)  
- Auth: JWT-based authentication

---



### Authentication
- [x] User Registration
- [x] User Login
- [x] JWT token stored in localStorage
- [x] Protected routes using JWT in frontend

### Event Management
- [x] Create New Event (Authenticated Users Only)
- [x] View All Events
- [x] Delete Event (Only Creator can delete)
- [x] Middleware to check event ownership before edit/delete
- [x] Fetch username for each user alongside events to enhance user experience.
- [x] Conditional delete button for the owner of the event.

---
### Attendee Management
- [x] RSVP to Event
- [x] Unregister from Event

### UI
- [x] Dashboard layout and routing
- [x] Show error/success notifications with better UX

### Auth & Middleware
- [x] Add role-based access (optional)

 ### Attendee Management
- [x] View Attendees for a Specific Event (by creator only)
- [x] Add dedicated route/page to list attendees

### Event Editing
- [x] Add edit functionality for event creator

### Validation
- [x] Form validation (client + server)


```bash
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

**.env**
```env
JWT_SECRET=yourSecretKey
```

---

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

> Make sure the frontend communicates with the backend at `http://localhost:5000`
