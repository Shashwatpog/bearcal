# 📆 Bearcal - University of Cincinnati Calendar Generator Tool

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

## Run Locally

### 1. Clone the project

```bash
git clone https://github.com/shashwatpog/bearcal.git
```

### 2. Start the backend (Go)

Make sure you have Go installed
Go to the backend directory

```bash
cd bearcal/backend
```
Install dependencies

```bash
go mod tidy
```
Run the API

```bash
go run main.go
```

### 3. Start the frontend

Go to the frontend directory

```bash
cd bearcal/frontend
```

Install dependencies

```bash
npm i
```

Start development server

```bash
npm run dev
```
