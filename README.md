![Nextjs](https://img.shields.io/badge/Nextjs-%23000000?style=for-the-badge&logo=nextdotjs)
![Typescript](https://img.shields.io/badge/Typescript-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%234169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)



Book blog platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## Tech Stack
- **Frontend**: Next.js, TypeScript, TailwindCSS, shadcn/ui
- **Database**: Neon Postgres with Drizzle ORM
- **Storage**: AWS S3

## Project Structure
```plaintext
├── app
│   ├── essays      -> Dynamic essay pages (slug based)
│   ├── favorites
│   └── contact
|   └── api         -> API routes
│       
├── components      -> Reusable UI components
├── db              -> Drizzle ORM schema & migrations
├── lib
├── scripts         -> Seed functions
