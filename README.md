# Ticketing System

The Support Ticketing System is a scalable and secure RESTful API built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.  
It provides customers, agents, and admins with tools to manage tickets, comments, file attachments, and automated workflows.  
The system supports role-based access control, AI-powered assistance, caching, and job queues.

---

## Features
- **Authentication & Authorization**  
  - JWT + Refresh tokens  
  - RBAC (Customer, Agent, Admin)  
  - Password hashing with bcrypt  

- **Ticket Management**  
  - Create, assign, update status, close tickets  
  - Priorities, departments, and filtering  

- **Comments & Attachments**  
  - Customer/agent comments  
  - file upload 

- **AI Integration**   
  - Auto-tagging 
  - Auto-assign

- **Performance & Scalability**  
  - Redis caching  
  - BullMQ job queues for async tasks  
  
- **Automation & Scheduling**  
  - Auto-Archive inactive tickets and closed tickets  

---

## User Roles
- **Customer** → Create tickets, track progress, add comments, upload attachments  
- **Agent** → Manage assigned tickets, respond, update status, add notes  
- **Admin** → Manage users, assign tickets, configure rules, analytics  

---

## Tech Stack
- **Backend**: Node.js, Express, TypeScript  
- **Database**: PostgreSQL + Prisma ORM  
- **Caching/Queues**: Redis + BullMQ  
- **Docs**: Swagger/OpenAPI  

---

## API Documentation

Swagger UI available at: `http://localhost:3000/api/docs`

---

## Setup & Installation
```bash
# 1. Clone the repository
git clone https://github.com/OmarAbdelmonemSayed/ticketing-system.git
cd ticketing-system

# 2. Install dependencies
npm install

# 3. Setup environment variables (Fill in DB, Redis, etc).

# 4. Start Docker services (Postgres, Redis)
docker-compose up -d

# 5. Run database migrations
npx prisma migrate dev

# 6. Start development server
npm run dev
```