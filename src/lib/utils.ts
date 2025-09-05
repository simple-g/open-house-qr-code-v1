import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'CAD') {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
  }).format(amount / 100)
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(time: string) {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function generateSignInUrl(eventId: string) {
  return `${process.env.QR_BASE_URL || 'http://localhost:3000/signin'}/${eventId}`
}

export function validateCanadianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return /^1?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(cleaned)
}

export function formatCanadianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+1${cleaned}`
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`
  }
  return phone
}
