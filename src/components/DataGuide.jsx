import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { metricGroups } from '../lib/guide'

const basics = [
  ['Count và Rate', 'Count đếm sự kiện hoặc đối tượng. Rate chia một nhóm cho một tổng thể. Luôn hỏi: denominator là ai hoặc cái gì?'],
  ['% và percentage point (pp)', '18,1% → 24,2% là tăng 6,1pp; mức tăng tương đối là 6,1 / 18,1 ≈ 33,7%. Không dùng hai cách nói thay cho nhau.'],
  ['Window và unique users', 'Rolling 30 ngày là window dịch chuyển, có chồng lấn. Unique users đếm mỗi người một lần trong phạm vi đo; booking events có thể đếm một người nhiều lần.'],
  ['Average và Median', 'Average = tổng / số đối tượng. Median là giá trị ở giữa khi sắp xếp. Cả hai đều có thể che giấu nhóm khác biệt; nên xem thêm phân bố.'],
  ['Target và baseline', 'Baseline là mốc so sánh. Target là kỳ vọng. Các target của Hẹn là giả định workshop; không tự động trở thành objective của mọi phase.'],
  ['Observation và Interpretation', '“Cancellation tăng” là observation. “Do studio quá tải” là interpretation cần kiểm chứng. Hai chỉ số cùng tăng chưa chứng minh causation.'],
]
const dimensions = [
  ['Reach', 'Quy mô nhóm có thể được tác động.', 'Số người thực sự gặp vấn đề và được initiative tác động trong thời gian dự kiến.'],
  ['Impact / Value', 'Conversion, retention, revenue, cancellation, manual work.', 'Mức cải thiện kỳ vọng và quan hệ từ initiative đến outcome.'],
  ['Confidence', 'Analytics, support, interviews và sales feedback.', 'Độ tin cậy phép đo, evidence về nguyên nhân và hiệu quả giải pháp.'],
  ['Urgency / Cost of Delay', 'Xu hướng xấu đi và workload phát sinh.', 'Thiệt hại theo thời gian, deadline hoặc cơ hội có thời hạn.'],
  ['Effort / Feasibility', 'Manual work cho thấy vận hành hiện tại.', 'Engineering estimate, dependency và constraints. Chi phí vận hành không phải effort xây feature.'],
]
const tradeoffs = [
  ['Booking tăng, cancellation cũng tăng', 'Tăng trưởng tạo thêm completed services hay workload?', 'Kiểm tra completed bookings, đặt lại, refund và nhóm khách/studio.'],
  ['Reminder adoption tăng, no-show vẫn tăng', 'Có đủ evidence kết luận reminder không hiệu quả?', 'Kiểm tra cùng cohort/window, selection bias và nhóm có/không reminder.'],
  ['Active studios tăng, onboarding vẫn chậm', 'Nên mở rộng supply hay khai thác studio hiện có?', 'Xét demand, công suất, nguyên nhân chờ và objective của phase.'],
  ['GMV tăng và tập trung vào studio lớn', 'Khai thác nhóm chủ lực hay giảm concentration risk?', 'Xét contribution, khả năng rời platform và chiến lược tăng trưởng.'],
  ['Tickets và booking đều tăng', 'Chất lượng giảm hay platform đang lớn hơn?', 'Chuẩn hóa theo cùng window, severity, tickets/100 bookings và handling time.'],
]
function Table({ heads, rows }) {
  return <div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-slate-100"><tr>{heads.map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} className="border-t border-slate-200">{row.map((cell, j) => <td key={j} className="px-4 py-3 align-top leading-6">{cell}</td>)}</tr>)}</tbody></table></div>
}
function Section({ id, title, description, children }) {
  return <section id={id} className="scroll-mt-36 space-y-4"><div><h2 className="text-xl font-semibold text-slate-950">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{description}</p></div>{children}</section>
}
export default function DataGuide() {
  return <div className="space-y-10 text-slate-700">
    <div className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8"><p className="text-xs uppercase tracking-widest text-blue-300">Product Prioritization Workshop</p><h1 className="mt-3 text-3xl font-semibold">Hướng dẫn đọc dữ liệu & lựa chọn priority</h1><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">Đọc đúng số liệu → hiểu vấn đề → đánh giá evidence → lựa chọn priority trong context. Hẹn kết nối khách hàng với studio. Toàn bộ số liệu, feedback và target trên dashboard là synthetic data phục vụ đào tạo.</p><p className="mt-3 text-sm leading-7 text-slate-300">Dùng trang này để tra cứu và kiểm tra lập luận. Khi thảo luận từng phase, chỉ sử dụng dữ kiện đã được facilitator cung cấp ở phase đó. Trang không xếp hạng initiatives hoặc đưa ra đáp án ưu tiên.</p></div>
    <nav aria-label="Guide sections" className="flex flex-wrap gap-2">{[['basics','Đọc đúng dữ liệu'],['metrics','Tra cứu chỉ số'],['funnel-guide','Ví dụ funnel'],['dimensions','Nối với priority'],['tradeoffs','Trade-off'],['practice','Áp dụng trong workshop']].map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-lg border bg-white px-3 py-2 text-sm hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">{label}</a>)}</nav>
    <Section id="basics" title="1. Đọc đúng trước khi diễn giải" description="Trước buổi học: dành 5–10 phút cho các khái niệm và ví dụ funnel.">
      <div className="grid gap-4 md:grid-cols-2">{basics.map(([name, text]) => <Card key={name}><CardHeader><CardTitle>{name}</CardTitle></CardHeader><CardContent className="text-sm leading-7">{text}</CardContent></Card>)}</div>
    </Section>
    <Section id="metrics" title="2. Tra cứu chỉ số của Hẹn" description="Mỗi thẻ đi từ định nghĩa đến giới hạn và câu hỏi phân tích. Công thức cần cùng scope và window; nội dung chưa được source định nghĩa được đánh dấu rõ.">
      <p className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-7">Nguồn giá trị: dataset hardcoded trong dashboard (src/lib/data.js) và các annotations trong src/App.jsx. W12 so với W4 kiểm chứng được cho booking count và cancellation. Các delta khác chỉ là summary inputs; không có raw baseline để tự tính lại.</p>
      {metricGroups.map(group => <div key={group.title} className="space-y-3"><h3 className="font-semibold text-slate-900">{group.title}</h3>{group.metrics.map(m => <details key={m.name} className="group rounded-xl border border-slate-200 bg-white"><summary className="cursor-pointer rounded-xl px-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"><span className="ml-2 font-semibold text-slate-900">{m.name}</span><span className="ml-3 text-sm text-blue-700">{m.value}</span></summary><dl className="grid gap-3 border-t border-slate-100 px-5 py-4 text-sm sm:grid-cols-[160px_1fr]">{[['Đo điều gì?',m.meaning],['Cách tính / phạm vi',m.formula],['Giới hạn kết luận',m.limit],['Dimension tham khảo',m.dimension],['Câu hỏi cho team',m.question]].map(([label,text]) => <div key={label} className="contents"><dt className="font-medium text-slate-900">{label}</dt><dd className="m-0 leading-7">{text}</dd></div>)}</dl></details>)}</div>)}
    </Section>
    <Section id="funnel-guide" title="3. Cùng đọc một funnel" description="Q3: 100.000 Visit → 63.000 Studio view → 25.830 Select slot → 18.598 Booking completed.">
      <Table heads={['Phép đọc','Kết quả','Ý nghĩa']} rows={[
        ['Visit → Booking completed','18,6%','Conversion toàn funnel; mỗi người chỉ được đếm một lần trong phạm vi đo.'],
        ['Studio view → Select slot','41% chuyển tiếp / 59% drop-off','Denominator là 63.000 studio viewers.'],
        ['Drop từ Studio view → Select slot so với Visit','37,17pp (làm tròn 37,2pp)','37.170 / 100.000; khác denominator của 59%.'],
        ['18.598 và 18.420 có mâu thuẫn?','Không nhất thiết','Unique users trong 90 ngày khác booking events trong rolling 30 ngày.'],
      ]}/><Card><CardContent className="p-5 text-sm leading-7"><strong>Observation:</strong> 59% studio viewers không chọn slot.<br/><strong>Interpretations:</strong> giá chưa phù hợp, thiếu lịch trống, thông tin chưa rõ hoặc khách chỉ tham khảo.<br/><strong>Evidence tiếp theo:</strong> segmentation theo studio, thiết bị, traffic source; lịch khả dụng; interviews hoặc usability tests.<br/><strong>Câu hỏi:</strong> evidence nào giúp phân biệt các cách giải thích? Đừng nhảy từ drop-off sang lựa chọn feature.</CardContent></Card>
    </Section>
    <Section id="dimensions" title="4. Dùng dữ liệu để đánh giá priority" description="Dashboard chỉ cung cấp một phần input. Kết hợp context của phase, initiative cards, constraints và dependency; chọn framework phù hợp rồi mới chấm điểm.">
      <Table heads={['Dimension','Dashboard hỗ trợ','Input cần bổ sung']} rows={dimensions}/>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7"><strong>Evidence về vấn đề ≠ evidence về giải pháp.</strong> Cancellation tăng xác nhận một tín hiệu cần điều tra; chưa xác nhận reminders, reschedule hay AI sẽ tạo impact lớn nhất. Analytics “High” không làm mọi giả thuyết giải pháp trở thành Confidence cao. Interviews 7/10 managers không đại diện cho toàn bộ studio; sales feedback về AI vẫn là giả thuyết.</div>
    </Section>
    <Section id="tradeoffs" title="5. Luyện cách xử lý trade-off" description="Nhiều lựa chọn có thể hợp lý. Team cần làm rõ objective, evidence, giả định và điều chấp nhận trì hoãn."><Table heads={['Hai tín hiệu','Câu hỏi thảo luận','Hướng kiểm tra lập luận']} rows={tradeoffs}/></Section>
    <Section id="practice" title="6. Áp dụng trong workshop" description="Tra cứu khi cần; không phải đọc hết trước khi bắt đầu thảo luận.">
      <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>Flow của team</CardTitle></CardHeader><CardContent><ol className="list-decimal space-y-3 pl-5 text-sm leading-7"><li>Đọc context phase: mục tiêu, thời gian, nguồn lực và constraints.</li><li>Chọn observation liên quan; ghi scope, window, denominator và nguồn.</li><li>Đưa ra interpretations; nêu giả định và evidence còn thiếu.</li><li>Chọn dimensions; đánh giá initiatives bằng cùng quy tắc.</li><li>Trình bày priority, trade-off và điều kiện xem xét lại.</li><li>Khi có dữ kiện mới: re-prioritize; giải thích dimension hoặc trọng số nào thay đổi.</li></ol></CardContent></Card><Card><CardHeader><CardTitle>Những lỗi cần tránh</CardTitle></CardHeader><CardContent><ul className="list-disc space-y-3 pl-5 text-sm leading-7"><li>Chọn ngay chỉ số xấu nhất làm objective.</li><li>Nhầm % với pp hoặc so sánh khác window.</li><li>Lấy booking events làm denominator của user funnel.</li><li>Gán causation từ correlation.</li><li>Dùng feedback nhỏ như đại diện toàn bộ thị trường.</li><li>Chấm Confidence giải pháp bằng độ chắc chắn của problem data.</li><li>Coi adoption là outcome hoặc manual workload là engineering effort.</li></ul></CardContent></Card></div>
      <Card><CardHeader><CardTitle>Mẫu lập luận khi trình bày</CardTitle><CardDescription>Điền bằng evidence của phase hiện tại; giữ rõ phần còn là giả định.</CardDescription></CardHeader><CardContent className="space-y-3 text-sm leading-7"><p>Trong <strong>[context]</strong>, team ưu tiên <strong>[initiative]</strong> để cải thiện <strong>[outcome]</strong> cho <strong>[nhóm đối tượng]</strong>.</p><p>Evidence chính là <strong>[dữ kiện + nguồn + scope/window]</strong>. Team giả định <strong>[nguyên nhân hoặc hiệu quả giải pháp]</strong>.</p><p>Team sử dụng <strong>[dimensions / framework và lý do]</strong>. Confidence là <strong>[mức + lý do]</strong>; input còn thiếu là <strong>[dữ liệu]</strong>.</p><p>Trade-off chấp nhận là <strong>[điều bị trì hoãn]</strong>. Team xem xét lại khi <strong>[evidence hoặc context thay đổi]</strong>.</p></CardContent></Card>
      <p className="rounded-xl bg-slate-100 p-5 text-sm leading-7"><strong>Checklist trước khi đề xuất:</strong> Đo gì? Trên ai? Trong thời gian nào? So với mốc nào? Bao nhiêu người thực sự bị tác động? Evidence mạnh đến đâu? Có cách giải thích khác? Thiếu dữ kiện gì? Vì sao lựa chọn phù hợp với context hiện tại?</p>
    </Section>
  </div>
}
