# Open House QR - Real Estate Lead Capture App

A modern web application that replaces paper sign-in sheets at real estate open houses with QR code check-ins, instant follow-up emails, and automated lead tracking.

## Features

- **Instant QR Code Generation**: Create professional QR posters in seconds
- **Mobile-Optimized Sign-in**: Zero-friction mobile forms for visitors
- **Automated Follow-up**: Branded thank-you emails with contact cards
- **Lead Tracking**: Google Sheets sync and CSV export
- **Stripe Integration**: $15 per event or $29/month unlimited
- **CASL Compliant**: Canadian Anti-Spam Legislation compliance

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Payments**: Stripe
- **Email**: Resend
- **QR Codes**: qrcode library
- **Deployment**: Vercel

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd openhouse-qr
npm install
```

### 2. Environment Setup

See `environment-setup.md` for detailed instructions and example API keys.

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

**Quick Setup:**
1. Copy the example values from `environment-setup.md`
2. Sign up for required services (Neon, Stripe, Resend)
3. Replace placeholder values with real API keys
4. Generate a secure secret key: `openssl rand -base64 32`

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   │   ├── events/        # Event CRUD operations
│   │   ├── signin/        # Sign-in submission
│   │   └── webhooks/      # Stripe webhooks
│   ├── create-event/      # Event creation page
│   ├── demo/              # Demo sign-in page
│   ├── signin/[eventId]/  # Public sign-in pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
│   ├── prisma.ts         # Database client
│   ├── stripe.ts         # Stripe configuration
│   ├── email.ts          # Email service
│   ├── qr.ts             # QR code generation
│   └── utils.ts          # Helper functions
└── prisma/               # Database schema
    └── schema.prisma
```

## API Endpoints

### Events
- `POST /api/events` - Create new event
- `GET /api/events?agentEmail=...` - Get agent's events
- `GET /api/events/[eventId]` - Get specific event

### Sign-in
- `POST /api/signin` - Submit visitor sign-in

### Webhooks
- `POST /api/webhooks/stripe` - Stripe payment webhooks

## Database Schema

### Agents
- Basic contact information
- Stripe subscription details
- Branding preferences

### Events
- Property details and timing
- Agent information
- Payment status
- QR code URLs

### Sign-ins
- Visitor information
- Email delivery status
- CASL compliance tokens

## Stripe Integration

### Pricing
- **Single Event**: $15 CAD one-time
- **Monthly Unlimited**: $29 CAD/month

### Webhook Events
- `checkout.session.completed` - Process payments
- `invoice.payment_succeeded` - Renew subscriptions
- `invoice.payment_failed` - Handle failed payments
- `customer.subscription.deleted` - Cancel subscriptions

## Email Features

### Thank You Emails
- Branded with agent colors and logo
- vCard attachment for easy contact saving
- Scheduling link integration
- CASL-compliant unsubscribe

### Magic Links
- Passwordless agent authentication
- Secure dashboard access

## QR Code Generation

- SVG format for crisp printing
- Customizable colors and sizing
- Direct URL embedding
- PDF poster generation (planned)

## CASL Compliance

- Explicit consent collection
- Unsubscribe tokens
- Clear privacy notices
- Canadian phone validation

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
NEXTAUTH_SECRET="production-secret"
NEXTAUTH_URL="https://yourdomain.com"
QR_BASE_URL="https://yourdomain.com/signin"
```

## Development

### Adding New Features

1. Update Prisma schema if needed
2. Run `npx prisma migrate dev`
3. Update TypeScript types
4. Implement API routes
4. Add UI components
5. Test thoroughly

### Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run build
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please contact [your-email@domain.com]

---

**Built with ❤️ for Canadian real estate agents**