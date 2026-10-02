export const kpis = [
  { label: 'Monthly bookings', value: '18,420', delta: '+25.3%', direction: 'up', note: 'vs. previous period' },
  { label: 'Booking conversion', value: '18.6%', delta: '-0.8pp', direction: 'down', note: 'target 25%' },
  { label: 'Cancellation rate', value: '24.2%', delta: '+6.1pp', direction: 'up', note: 'target <15%' },
  { label: 'Repeat booking · 30d', value: '21.3%', delta: '-3.2pp', direction: 'down', note: 'target >35%' },
  { label: 'Active studios', value: '185', delta: '+14.2%', direction: 'up', note: 'of 320 onboarded' },
]

export const bookingTrend = [
  { week: 'W1', bookings: 13200, cancellation: 16.2 },
  { week: 'W2', bookings: 13780, cancellation: 17.1 },
  { week: 'W3', bookings: 14120, cancellation: 17.8 },
  { week: 'W4', bookings: 14700, cancellation: 18.1 },
  { week: 'W5', bookings: 15190, cancellation: 19.5 },
  { week: 'W6', bookings: 15740, cancellation: 20.3 },
  { week: 'W7', bookings: 16280, cancellation: 21.4 },
  { week: 'W8', bookings: 16820, cancellation: 22.8 },
  { week: 'W9', bookings: 17290, cancellation: 23.1 },
  { week: 'W10', bookings: 17750, cancellation: 23.7 },
  { week: 'W11', bookings: 18110, cancellation: 24.0 },
  { week: 'W12', bookings: 18420, cancellation: 24.2 },
]

export const funnel = [
  { stage: 'Visit', users: 100000, rate: 100 },
  { stage: 'Studio view', users: 63000, rate: 63 },
  { stage: 'Select slot', users: 25830, rate: 25.8 },
  { stage: 'Booking completed', users: 18598, rate: 18.6 },
]

export const cancellationReasons = [
  { name: 'Customer cancelled', value: 48 },
  { name: 'Studio cancelled', value: 21 },
  { name: 'Scheduling conflict', value: 17 },
  { name: 'Other', value: 14 },
]

export const customerMetrics = [
  { label: 'No-show rate', value: '11.3%', delta: '+1.9pp', tone: 'negative' },
  { label: 'Reminder adoption', value: '42%', delta: '+7pp', tone: 'positive' },
  { label: 'Reschedule usage', value: '9%', delta: '+1pp', tone: 'neutral' },
  { label: 'Avg. bookings / customer', value: '1.4', delta: '-0.1', tone: 'negative' },
]

export const studioOps = [
  { name: 'Studio activation', value: 58, target: 75 },
  { name: 'Auto-confirmed bookings', value: 54, target: 80 },
  { name: 'Manual confirmation', value: 46, target: 20 },
  { name: 'Manual reschedule', value: 68, target: 30 },
]

export const supportTickets = [
  { category: 'Change / cancel booking', tickets: 384, share: 31 },
  { category: 'Payment', tickets: 223, share: 18 },
  { category: 'Studio confirmation', tickets: 211, share: 17 },
  { category: 'Login / account', tickets: 136, share: 11 },
  { category: 'Other', tickets: 286, share: 23 },
]

export const businessMetrics = [
  { label: 'GMV', value: '2.8B ₫', delta: '+22%' },
  { label: 'Revenue', value: '280M ₫', delta: '+19%' },
  { label: 'Revenue / active studio', value: '1.51M ₫', delta: '+4%' },
  { label: 'Cost-to-serve / studio', value: '+18%', delta: 'worse vs. last quarter' },
]

export const evidence = [
  { source: 'Product analytics', finding: '59% of studio viewers do not select a slot (63,000 → 25,830); a 37.2pp drop relative to all visits.', confidence: 'High' },
  { source: 'Support data', finding: '31% of 1,240 monthly tickets are change/cancel related.', confidence: 'High' },
  { source: 'Studio interviews', finding: '7/10 managers say rescheduling creates the most manual work.', confidence: 'Medium' },
  { source: 'Sales feedback', finding: 'Sales believes AI recommendations could increase conversion.', confidence: 'Low' },
]
