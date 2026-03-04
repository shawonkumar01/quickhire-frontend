# QuickHire Frontend

A modern job board frontend built with Next.js 15, TypeScript, and Tailwind CSS.


## 🔗 Backend Repository

[QuickHire Backend](https://github.com/shawonkumar01/quickhire-backend)

## ✨ Features

- **Home Page** — Hero section, category explorer, featured jobs, latest jobs, footer
- **Job Listings** — Search, filter by category/location/job type
- **Job Detail** — Full job info with Apply Now modal
- **Apply Now** — Submit application with name, email, resume link, cover note
- **Login/Register** — JWT authentication with role-based access
- **Admin Panel** — Create/delete jobs, view all applications
- **Browse Companies** — View all companies with open positions
- **Responsive Design** — Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **HTTP Client** — Axios
- **Notifications** — React Hot Toast
- **Icons** — Lucide React

## 📁 Project Structure
```
quickhire-frontend/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CategorySection.tsx
│   │   ├── BannerSection.tsx
│   │   ├── FeaturedJobsSection.tsx
│   │   ├── LatestJobsSection.tsx
│   │   ├── JobCard.tsx
│   │   └── Footer.tsx
│   ├── jobs/
│   │   ├── page.tsx          # Job listings with filters
│   │   └── [id]/
│   │       └── page.tsx      # Job detail + apply modal
│   ├── companies/
│   │   └── page.tsx          # Browse companies
│   ├── login/
│   │   └── page.tsx          # Login + register
│   ├── admin/
│   │   └── page.tsx          # Admin panel
│   ├── lib/
│   │   └── api.ts            # Axios API client
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── .env.local
├── .env.example
├── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- Backend server running on port 3001

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/shawonkumar01/quickhire-frontend.git
cd quickhire-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**4. Run the development server**
```bash
npm run dev
```

Frontend runs on **http://localhost:3002**

## 🔐 Authentication

| Role  | Access |
|-------|--------|
| Guest | View jobs, apply for jobs |
| User  | View jobs, apply for jobs |
| Admin | All above + create/delete jobs, view applications |

**Default Admin Credentials:**
```
Email: admin@quickhire.com
Password: admin123
```

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, categories, jobs |
| Jobs | `/jobs` | All jobs with search and filters |
| Job Detail | `/jobs/:id` | Job info and apply now |
| Companies | `/companies` | Browse all companies |
| Login | `/login` | Login and register |
| Admin | `/admin` | Admin dashboard (admin only) |

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001/api` |

## 📦 Available Scripts
```bash
npm run dev        # Start development server (port 3002)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🤝 Related

- [QuickHire Backend](https://github.com/shawonkumar01/quickhire-backend) — NestJS REST API
```

---

Also create `.env.example`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api