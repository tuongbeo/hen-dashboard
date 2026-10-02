import {test} from 'node:test'
import assert from 'node:assert/strict'
import {anchors,caseContract,creationRows,funnel,kpis,latest,latestCreation,lateUpdateShare,onboardingTotal,outcomes,percent,periods,ratio,relativeChange,reportOpenRate,serviceRows,support,supportMinutes,supportRows,supportTotal,trend} from '../src/lib/data.js'
test('P2 anchors and denominator boundaries',()=>{
 assert.equal(onboardingTotal,48); assert.equal(anchors.onboarding.awaitingApproval,28);assert.equal(anchors.onboarding.approvedWithoutCalendar,20)
 assert.equal(anchors.cancellation.cancelledSeats,180);assert.equal(anchors.cancellation.lateUpdateRelatedSeats,90);assert.equal(lateUpdateShare,50)
 assert.equal(anchors.studioReport.opened,9);assert.equal(anchors.studioReport.tracked,72);assert.equal(reportOpenRate,12.5)
 assert.equal(latest.cancelled,anchors.cancellation.cancelledSeats)
 assert.ok(!('registeredStudios' in latest)); assert.ok(!('recoverableSeats' in anchors.cancellation))
})
test('service cohort reconciles exclusive seat statuses and 8% fee on completion',()=>{
 assert.deepEqual(trend.map(r=>r.completed),[910,1070,1180])
 assert.deepEqual(trend.map(r=>r.booked),[1120,1320,1450])
 assert.deepEqual(trend.map(r=>r.completedValue),[263200000,313100000,365200000])
 assert.deepEqual(trend.map(r=>r.revenue),[21056000,25048000,29216000])
 for(const row of trend){
  assert.equal(row.completed+row.cancelled+row.noShow+row.pending,row.booked)
  assert.equal(row.revenue,row.completedValue*0.08)
  assert.notEqual(row.revenue,row.bookedGMV*0.08)
  assert.equal(row.cancellationRate,row.cancelled/row.booked*100)
  assert.equal(row.completedRate,row.completed/row.booked*100)
  assert.equal(row.noShowRate,row.noShow/row.booked*100)
  assert.ok(row.pending>0)
 }
 assert.equal(outcomes.reduce((n,r)=>n+r.count,0),latest.booked)
 assert.ok(Math.abs(outcomes.reduce((n,r)=>n+r.rate,0)-100)<1e-9)
 assert.ok(serviceRows.some(r=>r.price!==caseContract.referenceSeatPrice))
})
test('creation and service windows remain distinct; funnel is same ordered journey cohort',()=>{
 for(const row of creationRows){
  assert.ok(row.seats>row.bookings);assert.ok(row.bookings>=row.customers)
  assert.ok(row.visit>=row.calendar&&row.calendar>=row.slot&&row.slot>=row.created)
  assert.equal(row.created,row.bookings);assert.ok(row.repeatCustomers<=row.customers)
 }
 assert.equal(latest.createdSeats,1520);assert.notEqual(latest.createdSeats,latest.booked)
 assert.deepEqual(funnel.map(r=>r.stage),['Visit studio page','View session/calendar','Select slot','Booking created'])
 for(let i=0;i<funnel.length;i++){
  assert.equal(funnel[i].fromStart,funnel[i].count/latestCreation.visit*100)
  assert.equal(funnel[i].fromPrevious,i===0?null:funnel[i].count/funnel[i-1].count*100)
 }
 assert.equal(funnel.at(-1).fromStart,12.75)
 assert.equal(latest.repeatRate,96/350*100)
 assert.equal(latest.bookingsPerCustomer,510/350)
})
test('all displayed KPI deltas and support shares derive from inputs without inventing rates',()=>{
 for(const k of kpis){
  assert.equal(k.value,latest[k.key]);assert.ok(Math.abs(k.change-(trend.at(-1)[k.key]/trend.at(-2)[k.key]-1)*100)<1e-9)
 }
 for(const row of support) assert.equal(row.share,row.tickets/supportTotal*100)
 assert.equal(supportRows.reduce((n,r)=>n+r.tickets,0),200);assert.equal(supportTotal,200)
 assert.equal(supportMinutes,3800);assert.ok(!('ticketsPerBooking' in latest))
 assert.ok(latest.completed>trend[0].completed&&latest.revenue>trend[0].revenue)
 assert.equal(periods.length,new Set(periods.map(p=>p.id)).size)
 assert.equal(ratio(1,0),null);assert.equal(relativeChange(1,0),null);assert.equal(percent(null),'Chưa đo');assert.equal(percent(0),'0%')
})
test('baseline preserves basic functions and absence of self-service/reminders',()=>{
 assert.deepEqual(caseContract.baseline,['H01','H02','H04','H05','H08'])
 assert.deepEqual(caseContract.notAvailable,['H03','H07','H10 nâng cao','H12','H19'])
 assert.equal(caseContract.capacityCU,20);assert.equal(caseContract.planningWeeks,6);assert.equal(caseContract.feeRate,0.08)
})
