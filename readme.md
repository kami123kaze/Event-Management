# Event Management System — Development Progress

A full-stack event management system built with:

- Frontend: React, Axios, TailwindCSS  
- Backend: Node.js, Express, Sequelize (SQLite)  
- Auth: JWT-based authentication

---

## Completed Features

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

---


## In Progress

### Attendee Management
- [ ] RSVP to Event
- [ ] Unregister from Event
- [ ] View Attendees for a Specific Event (by creator only)
- [ ] Add dedicated route/page to list attendees

### UI
- [ ] Dashboard layout and routing
- [ ] Show error/success notifications with better UX

---

## To Be Done

### Auth & Middleware
- [ ] Add role-based access (optional)


### Event Editing
- [ ] Add edit functionality for event creator

### Validation
- [ ] Form validation (client + server)

### Deployment
- [ ] Setup frontend for production
- [ ] Setup backend for production
- [ ] Deployment (Render / Vercel / Railway / Others)

---

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
