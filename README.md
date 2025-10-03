# Firepie 🍕  

[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white&style=for-the-badge)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge)](https://ui.shadcn.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white&style=for-the-badge)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white&style=for-the-badge)](https://stripe.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge)](https://next-auth.js.org/)
[![Resend](https://img.shields.io/badge/Resend-FF6F61?style=for-the-badge)](https://resend.com/)  

---

## 🍕 About  

**Firepie** is a modern pizza delivery platform built with cutting-edge web technologies.  
It combines a seamless user experience with powerful features like real-time pizza customization, secure online payments, and elegant email notifications.  
Designed to reflect a real-world e-commerce workflow, Firepie demonstrates how speed, scalability, and great design come together in a single application.  

---

## ✨ Features  

- 👤 **Authentication** — login via Google, GitHub, or Email (NextAuth)  
- 📱 **Responsive UI** — optimized for mobile, tablet, and desktop  
- 🍕 **Pizza Customization** — choose size, dough, and toppings  
- 🛒 **Shopping Cart** — real-time cart updates and checkout  
- 💳 **Online Payments** — secure Stripe integration  
- 📧 **Email Notifications** — transactional emails with beautiful templates via Resend  
- ⚡ **Next.js Server Actions** — efficient server-side execution  
- 🚀 **Deployment on Vercel** — fast and reliable hosting  

---

## 🛠️ Tech Stack  

- **Next.js 14 (App Router, Server Actions)**  
- **React 18**  
- **TypeScript**  
- **Prisma + PostgreSQL**
- **NextAuth.js**
- **Stripe**
- **Resend**
- **TailwindCSS + Shadcn UI**

---

## 🚀 Getting Started  

### 1. Clone & Install  

```bash
git clone git@github.com:yevheniiorhanistyi/firepie.git
cd firepie
npm install
```

### 2. Setup Environment Variables  

Create a `.env` file in the project root and add the following variables:  

```env
# Database
POSTGRES_URL=your_postgres_connection_string
PRISMA_DATABASE_URL=your_prisma_connection_string

# App & API
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=/api

# Resend (transactional emails)
RESEND_API_KEY=your_resend_api_key

# Stripe (payments)
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# OAuth (social login)
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
```

### 3. Setup Database & Seed  

Push schema and seed initial products into the database:  

```bash
npm run prisma:push
npm run prisma:seed
```

(Optional) open Prisma Studio to explore the data:  

```bash
npm run prisma:studio
```

### 4. Start the App  

```bash
npm run dev
```

Open 👉 http://localhost:3000  

## 📸 Screenshots  

![Preview](https://github.com/yevheniiorhanistyi/Firepie/blob/main/public/images/preview.png?raw=true)

---

## 📜 Available Scripts  

- `npm run dev` — run in development mode  
- `npm run build` — production build  
- `npm run start` — start in production  
- `npm run lint` — run ESLint  
- `npm run prisma:push` — sync database schema with Prisma  
- `npm run prisma:seed` — seed initial data into database  
- `npm run prisma:studio` — open Prisma Studio to inspect DB  

---

## 🌍 Live Demo  

👉 [Firepie on Vercel](https://firepie.site)

---

## 👨‍💻 Author  

- [Yevhenii Orhanistyi](https://github.com/yevheniiorhanistyi)  
