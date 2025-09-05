# Setup Instructions

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/openhouse_qr?schema=public"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend
RESEND_API_KEY="re_..."

# App
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# QR Code base URL
QR_BASE_URL="http://localhost:3000/signin"
```

## 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## 3. Run Development Server

```bash
npm run dev
```

## 4. Test the Application

1. Visit `http://localhost:3000` to see the landing page
2. Click "Try Demo" to test the sign-in flow
3. Click "Get Started" to test event creation

## 5. Production Deployment

1. Set up a PostgreSQL database (Neon, Supabase, or similar)
2. Configure Stripe account and webhooks
3. Set up Resend account for email sending
4. Deploy to Vercel or your preferred platform
5. Update environment variables in production
