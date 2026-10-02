import { test } from 'node:test'
import assert from 'node:assert/strict'
import { kpis, bookingTrend, funnel, cancellationReasons, supportTickets, studioOps } from '../src/lib/data.js'
test('workshop totals, funnel order and competing signals remain consistent', () => {
  assert.equal(cancellationReasons.reduce((n, x) => n + x.value, 0), 100)
  assert.equal(supportTickets.reduce((n, x) => n + x.tickets, 0), 1240)
  assert.equal(supportTickets.reduce((n, x) => n + x.share, 0), 100)
  for (let i = 1; i < funnel.length; i++) assert.ok(funnel[i].users <= funnel[i - 1].users)
  for (const x of funnel) assert.ok(Math.abs(x.rate - x.users / funnel[0].users * 100) < 0.1)
  assert.ok(bookingTrend.at(-1).bookings > bookingTrend[0].bookings)
  assert.ok(bookingTrend.at(-1).cancellation > bookingTrend[0].cancellation)
  assert.equal(kpis.find(x => x.label === 'Cancellation rate').direction, 'up')
  for (const x of studioOps) assert.ok(x.value >= 0 && x.value <= 100 && x.target >= 0 && x.target <= 100)
})
