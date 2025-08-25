# 📆 Bearcal - University of Cincinnati iCalendar Tool

Simple tool to generate your course schedule and import it to your Apple Calendar, Google Calendar, and other calendars that accept .ics files

This project is inspired by [aelew](https://github.com/aelew)'s [ucmerced-ical](https://github.com/aelew/ucmerced-ical). Shout out to [Andre Lew](https://aelew.com/)!

## Built With
- [Vercel](https://vercel.com/) 
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Go](https://go.dev/)
- [Supabase](https://supabase.com/)

---

## Environment Variables

### For Frontend

Create an .env.local file in frontend directory and add the following
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

### For Backend

Create an .env file in backend directory and add the following

```bash
DATABASE_URL=[your database connection string here]
PORT=8080
```

## API Endpoints

| Method | Route          | Description                                                |
|--------|----------------|------------------------------------------------------------|
| GET    | `/api/terms`   | Fetch list of available academic terms                     |
| GET    | `/api/course`  | Get details for a specific course by CRN                   |
| GET    | `/api/filter`  | Filter courses by subject, class number, and/or term       |
| GET    | `/api/search`  | Search for courses by keyword (title, instructor, etc.)    |
| POST   | `/api/generate`| Generate and download `.ics` file from selected courses    |

---

## Run Locally

### 1. Clone the project

```bash
git clone https://github.com/shashwatpog/bearcal.git
```

### 2. Start the backend (Go)

Make sure you have Go installed

```bash
cd bearcal/backend
go mod tidy
go run main.go
```

### 3. Start the frontend (Nextjs)

```bash
cd bearcal/frontend
npm i
npm run dev
```
