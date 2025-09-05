# Environment Variables Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# ===========================================
# OPEN HOUSE QR - ENVIRONMENT VARIABLES
# ===========================================

# ===========================================
# DATABASE CONFIGURATION
# ===========================================
# PostgreSQL connection string
# Get from: Neon (neon.tech), Supabase (supabase.com), or Railway (railway.app)
DATABASE_URL="postgresql://username:password@localhost:5432/openhouse_qr?schema=public"

# ===========================================
# STRIPE PAYMENT PROCESSING
# ===========================================
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY="sk_test_51ABC123def456GHI789jkl012MNO345pqr678STU901vwx234YZa567bcd890efgh123ijk456lmn789opq012rst345uvw678xyz901"
STRIPE_PUBLISHABLE_KEY="pk_test_51ABC123def456GHI789jkl012MNO345pqr678STU901vwx234YZa567bcd890efgh123ijk456lmn789opq012rst345uvw678xyz901"

# Webhook secret for Stripe events
# Get from: https://dashboard.stripe.com/webhooks
STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz"

# ===========================================
# EMAIL SERVICE (RESEND)
# ===========================================
# Get from: https://resend.com/api-keys
RESEND_API_KEY="re_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz"

# ===========================================
# GOOGLE SHEETS INTEGRATION (OPTIONAL)
# ===========================================
# Service account credentials for Google Sheets API
# Get from: https://console.cloud.google.com/apis/credentials
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"your-project","private_key_id":"1234567890abcdef","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com","client_id":"123456789012345678901","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com"}'

# Google Sheets spreadsheet ID for lead export
# Get from: Create a new Google Sheet and copy the ID from the URL
GOOGLE_SHEETS_SPREADSHEET_ID="1ABC123def456GHI789jkl012MNO345pqr678STU901vwx234YZa567bcd890efgh123ijk456lmn789opq012rst345uvw678xyz901"

# ===========================================
# NEXT.JS AUTHENTICATION
# ===========================================
# Secret key for JWT tokens and session encryption
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-super-secret-key-here-32-characters-minimum"

# Base URL of your application
NEXTAUTH_URL="http://localhost:3000"

# ===========================================
# QR CODE CONFIGURATION
# ===========================================
# Base URL for QR code sign-in links
# Update this to your production domain when deploying
QR_BASE_URL="http://localhost:3000/signin"

# ===========================================
# EMAIL CONFIGURATION
# ===========================================
# From email address for outgoing emails
# Must be verified in your Resend account
FROM_EMAIL="noreply@yourdomain.com"

# Reply-to email address
REPLY_TO_EMAIL="support@yourdomain.com"

# ===========================================
# DEVELOPMENT SETTINGS
# ===========================================
# Set to 'development' for local dev, 'production' for live site
NODE_ENV="development"

# Enable debug logging (set to 'true' for verbose logs)
DEBUG="false"
```

## Quick Setup Instructions

### 1. Database Setup
- **Neon (Recommended)**: Go to [neon.tech](https://neon.tech), create a project, copy the connection string
- **Supabase**: Go to [supabase.com](https://supabase.com), create a project, get the connection string
- **Local**: Install PostgreSQL locally and create a database

### 2. Stripe Setup
1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create an account or sign in
3. Go to "Developers" → "API Keys"
4. Copy the "Secret key" and "Publishable key"
5. Go to "Developers" → "Webhooks"
6. Create a new webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`
7. Select events: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.deleted`
8. Copy the webhook secret

### 3. Resend Email Setup
1. Go to [resend.com](https://resend.com)
2. Create an account
3. Go to "API Keys" and create a new key
4. Copy the API key
5. Add your domain and verify it
6. Update `FROM_EMAIL` with your verified domain

### 4. Google Sheets (Optional)
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create a service account
5. Download the JSON credentials
6. Copy the entire JSON as a string to `GOOGLE_SHEETS_CREDENTIALS`
7. Create a Google Sheet and copy the ID from the URL

### 5. Generate Secret Key
```bash
# Generate a secure secret key
openssl rand -base64 32
```

## Production Environment Variables

For production deployment, update these values:

```env
NEXTAUTH_URL="https://yourdomain.com"
QR_BASE_URL="https://yourdomain.com/signin"
NODE_ENV="production"
```

## Security Notes

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Rotate API keys regularly
- Use strong, unique secrets
- Enable 2FA on all service accounts

## Testing Your Setup

1. Create `.env.local` with your values
2. Run: `npx prisma migrate dev`
3. Run: `npm run dev`
4. Visit: `http://localhost:3000`
5. Test the demo sign-in flow
6. Test event creation (will require Stripe setup)
