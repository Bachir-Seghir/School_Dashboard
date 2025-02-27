# School Dashboard

*A modern school management dashboard built with Next.js and containerized using Docker.*

## 🚀 Features

- **Server-Side Rendering (SSR)** with Next.js for fast performance
- **Clerk Authentication** for user management
- **Role-Based Access Control (RBAC)** for managing permissions
- **Prisma ORM** for database interactions
- **PostgreSQL** as the database
- **Zod** for schema validation
- **Tailwind CSS** for a sleek and responsive UI
- **Recharts** for data visualization
- **React Hook Form** for form management
- **React Calendar & Big Calendar** for scheduling and events
- **Toastify** for notifications
- **Cloudinary** for image uploads
- **Docker & Docker Compose** for containerization

## 📂 Project Structure

```bash
School_Dashboard/
├── prisma/                            # Database migrations and schema
├── .next/                             # Next.js build files
├── public/                            # Static assets
├── src/
│   ├── app/                           # Next.js application pages and layouts
│   │   ├── (dashboard)/               # Main dashboard sections
│   │   │   ├── admin/                 # Admin dashboard
│   │   │   ├── student/               # Student dashboard
│   │   │   ├── teacher/               # Teacher dashboard
│   │   │   ├── parent/                # Parent dashboard
│   │   │   ├── list/                  # List pages for various entities
│   │   │   │   ├── parents/
│   │   │   │   ├── teachers/
│   │   │   │   ├── students/
│   │   │   │   ├── classes/
│   │   │   │   ├── subjects/
│   │   │   │   ├── lessons/
│   │   │   │   ├── exams/
│   │   │   │   ├── results/
│   │   │   │   ├── events/
│   │   │   │   ├── assignments/
│   │   │   │   ├── announcements/
│   │   ├── fonts/                     # Custom fonts
│   │   ├── [[...sign-in]]/            # Authentication pages
│   ├── components/                    # Reusable UI components
│   ├── lib/                           # Utility functions and schemas
├── .vscode/                           # VS Code workspace settings
├── .git/                              # Git repository data
├── docker-compose.yml                 # Docker Compose configuration
├── Dockerfile                         # Docker container setup
├── .env                               # Environment variables
├── package.json                       # Dependencies and scripts
└── README.md                          # Project documentation
```

## 🛠️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)
- [Clerk](https://clerk.com/) for authentication

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/school-dashboard.git
cd school-dashboard
```

### Set Up Environment Variables

Create a `.env` file and configure it with your environment variables:

```bash
# Development (Local)
DATABASE_URL="postgresql://user:password@localhost:5432/master_db"

# Production (Use Docker or Remote Database)
DATABASE_URL="postgresql://user:password@postgres:5432/master_db"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk public key
CLERK_SECRET_KEY=clerk secret key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary cloud name
NEXT_PUBLIC_CLOUDINARY_API_KEY=cloudinary public key
```

### Run the Development Server

```bash
npm install
npx prisma migrate dev
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
The app will be available at `http://localhost:3000`.

### Run the Prisma Studio to visualize database tables

```bash
npx prisma studio
```
The app will be available at `http://localhost:5555`.

### Run the Application with Docker

```bash
docker-compose up --build
```

This will start the app along with PostgreSQL in a container.

## 🏗️ Usage

- **Admin Panel:** Manage students, teachers, and courses
- **Attendance Tracking:** Mark and monitor student attendance
- **Event Management:** Schedule school events using the calendar
- **Dashboard Analytics:** View performance insights with Recharts
- **User Authentication:** Secure login and user management with Clerk

## 📊 Tech Stack

- **Frontend:** Next.js, Tailwind CSS, React
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Clerk, Role-Based Access Control
- **DevOps:** Docker, Docker Compose

## 📸 Screenshots

soon!

## 🤝 Contributing
Messages, profile section, settings, and attendances are not developed yet!
Feel free to open issues and pull requests for improvements.

## 📬 Contact

For any questions, reach out at [bachir.seghir17@gmail.com](mailto:bachir.seghir17@gmail.com).
