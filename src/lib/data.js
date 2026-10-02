// Canonical inputs. P2 anchors are separate from explicitly supplemental synthetic aggregates.
export const caseContract = {
 model: 'Hẹn là B2B2C software cho studio làm gốm, vẽ, cắm hoa và thủ công. Mỗi studio có trang đặt chỗ riêng mang thương hiệu studio.',
 outcome: 'Tăng chỗ hoàn thành từ studios đã đăng ký và nhu cầu hiện có.',
 capacityCU:20, planningWeeks:6, feeRate:0.08, referenceSeatPrice:300000,
 baseline:['H01','H02','H04','H05','H08'], notAvailable:['H03','H07','H10 nâng cao','H12','H19']
}
export const anchors = {
 onboarding:{awaitingApproval:28, approvedWithoutCalendar:20},
 cancellation:{cancelledSeats:180, lateUpdateRelatedSeats:90},
 studioReport:{opened:9, tracked:72}
}
// Calendar labels are synthetic, not dates asserted by the PDFs.
export const periods = [
 {id:'2026-07',label:'Tháng 1',window:'01–31/07/2026',completedStudios:26},
 {id:'2026-08',label:'Tháng 2',window:'01–31/08/2026',completedStudios:32},
 {id:'2026-09',label:'Tháng 3',window:'01–30/09/2026',completedStudios:37}
]
// Rows represent scheduled service-month seats already due at close; statuses are exclusive.
// Pending = already due but not yet classified. No future seats in this cohort.
export const serviceRows = [
 {period:'2026-07',price:250000,completed:400,cancelled:60,noShow:30,pending:15},
 {period:'2026-07',price:320000,completed:510,cancelled:60,noShow:30,pending:15},
 {period:'2026-08',price:250000,completed:500,cancelled:80,noShow:32,pending:12},
 {period:'2026-08',price:330000,completed:570,cancelled:80,noShow:33,pending:13},
 {period:'2026-09',price:280000,completed:600,cancelled:anchors.cancellation.cancelledSeats/2,noShow:35,pending:10},
 {period:'2026-09',price:340000,completed:580,cancelled:anchors.cancellation.cancelledSeats/2,noShow:35,pending:10}
]
// Creation month: booking events, seats and gross booked value; not service-month outcomes.
// Journey_id scoped to a session on ONE studio page; ordered stages, max one booking/journey.
// Follow entrants for 7 days. All creation events in these synthetic rows are within this funnel.
export const creationRows = [
 {period:'2026-07',bookings:390,seats:1150,bookedValue:335000000,customers:280,repeatCustomers:65,visit:3000,calendar:2000,slot:760,created:390},
 {period:'2026-08',bookings:440,seats:1340,bookedValue:399000000,customers:310,repeatCustomers:78,visit:3500,calendar:2250,slot:810,created:440},
 {period:'2026-09',bookings:510,seats:1520,bookedValue:467000000,customers:350,repeatCustomers:96,visit:4000,calendar:2600,slot:900,created:510}
]
// One primary category/ticket. Total active handling time, not median or monetary cost.
export const supportRows = [
 {name:'Đổi buổi',tickets:62,minutes:1200}, {name:'Tìm vé',tickets:48,minutes:780},
 {name:'Hồ sơ studio',tickets:30,minutes:540}, {name:'Lịch / số chỗ',tickets:28,minutes:620},
 {name:'Báo cáo',tickets:12,minutes:240}, {name:'Thanh toán',tickets:20,minutes:420}
]
const sum=(rows,key)=>rows.reduce((n,r)=>n+r[key],0)
export const ratio=(n,d)=>d===0?null:n/d*100
export const relativeChange=(n,b)=>b===0?null:(n-b)/b*100
export const number=v=>v==null?'Chưa đo':new Intl.NumberFormat('vi-VN',{maximumFractionDigits:0}).format(v)
export const decimal=v=>v==null?'Chưa đo':new Intl.NumberFormat('vi-VN',{maximumFractionDigits:1}).format(v)
export const percent=v=>v==null?'Chưa đo':decimal(v)+'%'
export const money=v=>v==null?'Chưa đo':number(v)+' ₫'
export const trend=periods.map(p=>{
 const rows=serviceRows.filter(r=>r.period===p.id), creation=creationRows.find(r=>r.period===p.id)
 const completed=sum(rows,'completed'),cancelled=sum(rows,'cancelled'),noShow=sum(rows,'noShow'),pending=sum(rows,'pending')
 const booked=completed+cancelled+noShow+pending
 const completedValue=rows.reduce((n,r)=>n+r.completed*r.price,0)
 return {...p,completed,cancelled,noShow,pending,booked,completedValue,revenue:completedValue*caseContract.feeRate,
  cancellationRate:ratio(cancelled,booked),completedRate:ratio(completed,booked),noShowRate:ratio(noShow,booked),
  bookings:creation.bookings,createdSeats:creation.seats,bookedGMV:creation.bookedValue,customers:creation.customers,
  repeatRate:ratio(creation.repeatCustomers,creation.customers),bookingsPerCustomer:creation.bookings/creation.customers}
})
export const latest=trend.at(-1),previous=trend.at(-2),latestCreation=creationRows.at(-1)
const steps=[['Visit studio page','Vào trang studio','visit'],['View session/calendar','Xem buổi / lịch','calendar'],['Select slot','Chọn slot','slot'],['Booking created','Tạo đơn thành công','created']]
export const funnel=steps.map(([stage,label,key],i)=>({stage,label,count:latestCreation[key],fromStart:ratio(latestCreation[key],latestCreation.visit),fromPrevious:i===0?null:ratio(latestCreation[key],latestCreation[steps[i-1][2]])}))
export const outcomes=[['Đã tham gia và ghi nhận','completed'],['Đã hủy','cancelled'],['Không đến (no-show)','noShow'],['Đến hạn, chờ ghi nhận','pending']].map(([name,key])=>({name,count:latest[key],rate:ratio(latest[key],latest.booked)}))
export const onboardingTotal=anchors.onboarding.awaitingApproval+anchors.onboarding.approvedWithoutCalendar
export const reportOpenRate=ratio(anchors.studioReport.opened,anchors.studioReport.tracked)
export const lateUpdateShare=ratio(anchors.cancellation.lateUpdateRelatedSeats,anchors.cancellation.cancelledSeats)
export const supportTotal=sum(supportRows,'tickets'),supportMinutes=sum(supportRows,'minutes')
export const support=supportRows.map(r=>({...r,share:ratio(r.tickets,supportTotal)}))
export const kpis=[
 ['Chỗ hoàn thành','completed','seat','Chỗ đã tham gia và được ghi nhận; hủy/no-show/pending không tính.','service-month','Synthetic bổ sung'],
 ['Đơn được tạo','bookings','booking','Đơn được tạo thành công. Một đơn có thể nhiều chỗ; chưa phải hoàn thành dịch vụ.','booking-created month','Synthetic bổ sung'],
 ['Studios có chỗ hoàn thành','completedStudios','studio','Distinct studios có ít nhất một chỗ hoàn thành trong tháng. Tổng registered studios chưa biết.','service-month','Synthetic bổ sung'],
 ['Chỗ hủy','cancelled','seat','Chỗ hủy trong cohort service-date đã đến hạn. Không chia seats cho booking count.','service-month','P2-B tháng mới nhất; tháng trước synthetic bổ sung']
].map(([label,key,unit,definition,period,source])=>({label,key,value:latest[key],change:relativeChange(latest[key],previous[key]),unit,definition,period,source}))
export const evidenceCards=[
 {id:'P2-A',title:'Studios chưa tới mở bán',value:number(onboardingTotal)+' studios',
 observation:number(anchors.onboarding.awaitingApproval)+' chưa duyệt hồ sơ; '+number(anchors.onboarding.approvedWithoutCalendar)+' đã duyệt nhưng chưa có lịch. Một số studios không rõ bước tiếp theo.',
 scope:'Snapshot sau ba tháng · nhóm chưa hoàn tất onboarding',method:'Quan sát vận hành trong thẻ P2-A',
 limit:'Chưa biết H03 tự điền hồ sơ giải quyết bao nhiêu trường hợp; chưa có evidence nhóm này đã có nhu cầu đặt chỗ. Tổng registered studios chưa biết.'},
 {id:'P2-B',title:'Chỗ hủy và cập nhật lịch',value:number(anchors.cancellation.cancelledSeats)+' chỗ hủy',
 observation:number(anchors.cancellation.lateUpdateRelatedSeats)+' chỗ liên quan cập nhật lịch hoặc số chỗ muộn ('+percent(lateUpdateShare)+' số chỗ hủy). Nhân viên nhận câu hỏi về đổi buổi và tìm vé.',
 scope:'Tháng gần nhất · seat đã hủy; câu hỏi nhân viên chưa có số lượng trong thẻ',method:'Quan sát vận hành trong thẻ P2-B',
 limit:'Liên quan không chứng minh nguyên nhân phần mềm và không cho biết chỗ có thể phục hồi. Chưa biết yêu cầu nào đủ điều kiện H12: đổi một lần, cùng hoạt động/giá, còn chỗ, trước ít nhất 24 giờ.'},
 {id:'P2-C',title:'Nhu cầu được nói ra khác hành vi',value:number(anchors.studioReport.opened)+'/'+number(anchors.studioReport.tracked)+' studios',
 observation:percent(reportOpenRate)+' tập studios theo dõi mở H04 tháng gần nhất. Interview trước đó nhắc báo cáo là nhu cầu quan trọng; studios vẫn dùng báo cáo email.',
 scope:'Tháng gần nhất · 72 studios đo H04, không phải tổng active/registered',method:'Quan sát sử dụng và interview trong P2-C; sample size interview chưa có',
 limit:'Chưa phân biệt khó tìm, khó dùng, thiếu giá trị hay email đủ đáp ứng. H04 của studio khác analytics workshop này. Không cộng 48 và 72 thành tổng studios.'}
]
