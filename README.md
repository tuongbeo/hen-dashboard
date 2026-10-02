# Hẹn Analytics — evidence surface Buổi 2

React + Vite + Tailwind CSS + local shadcn/ui-style Card primitives + Recharts. Synthetic data hardcoded, không backend/database/API. Không khởi tạo lại project.

## Case contract

Hẹn là B2B2C software: mỗi studio làm gốm, vẽ, cắm hoa hoặc thủ công có trang đặt chỗ riêng mang thương hiệu studio. Không phải marketplace tìm kiếm nhiều nhà cung cấp.

- Parent outcome: tăng chỗ hoàn thành từ studios đã đăng ký và nhu cầu hiện có.
- Một booking có nhiều seats; một customer có nhiều bookings. Studio/customer/booking/seat là các đơn vị khác nhau.
- Completed seat = khách tham gia và được ghi nhận. Hủy/no-show/pending không phải completed. Booking created chỉ là tạo đơn.
- Buổi 1: pilot 12 studios/8 tuần. Buổi 2: shared state sau ba tháng, không phải kết quả MVP từng team; total studios sau ba tháng chưa được cung cấp.
- Baseline: H01/H02/H04/H05/H08 basic đã chạy. H03/H07/H10 nâng cao/H12/H19 chưa có. H05 basic chưa reminder, H12 chưa self-service reschedule.
- 20 CU mới / 6 tuần, không tăng staffing vận hành hoặc acquisition budget. CU không quy đổi giờ/tuần; thẻ Phase 2 là scope mới.
- Hẹn thu 8% giá trị completed seats. Giá 300.000 ₫ là tham chiếu; revenue không phải GMV/profit.

## Nguồn đối chiếu và visibility

Đã đối chiếu nội dung hiện hành:
- Hen_Doc_Truoc_Workshop.pdf — 18.09.2026.
- Hen_Phase_2_Participant_Pack.pdf — 17.09.2026.
- Hen_Facilitator_Guide.pdf — bản cập nhật chương trình bốn buổi 02.10.2026.
- Case contract trong yêu cầu chỉnh sửa là căn cứ; không khôi phục snapshot dashboard cũ.

Dashboard và Hướng dẫn chỉ hiển thị dữ liệu, đơn vị, window, metric definitions và giới hạn. P2-A/B/C là ba vùng ngang cấp; không có priority badge, host confidence labels, scores hoặc mapping dimensions. Không hiển thị evidence tương lai.

Facilitator tab giữ password gate hiện có, không hardcode lại password. Notes cập nhật 115-minute runbook: baseline → đọc evidence → bottleneck → debate → converge → portfolio → reveal dimensions → logic 0.1 → mapping → debrief. Mapping chỉ ở facilitator mode, reveal sau activity, không biến cancellation thành đáp án chung.

Client-side UI gate **không phải authentication bảo mật**. Notes là static asset trong public repo, có thể đọc/bypass. Không có dữ liệu nhạy cảm hoặc secret trong notes. Password digest và gate không đổi.

## Canonical dataset và dictionary

Input hardcoded trong src/lib/data.js; derive KPI/chart/rate/delta/revenue từ các aggregates đó. Không hardcode một snapshot hiển thị khác. src/lib/dictionary.js là dictionary render trên student guide.

### Anchors gốc

| Nguồn | Input | Population / period | Giới hạn |
|---|---|---|---|
| P2-A | 28 chưa duyệt + 20 đã duyệt chưa lịch = 48 studios | Snapshot sau ba tháng; studios chưa onboarding | Chưa biết demand, total registered hoặc H03 giải quyết bao nhiêu |
| P2-B | 180 cancelled seats, 90 liên quan cập nhật lịch/số chỗ muộn | Tháng gần nhất; seats hủy | 90/180 = 50% liên quan, không phải 90 recoverable; chưa biết root cause/eligibility H12 |
| P2-B | Có câu hỏi đổi buổi và tìm vé | Qua nhân viên; không có counts gốc | Không suy ra mọi yêu cầu tự phục vụ được |
| P2-C | 9/72 mở H04; interview nói cần report; email vẫn dùng | Tháng gần nhất; 72 studios được theo dõi | Không phải total active/registered; không cộng 48+72; chưa biết vì sao ít mở |

H04 là report/dashboard của studio, không phải analytics workshop này.

### Synthetic bổ sung — không gán cho PDF

Ngày tháng 07–09/2026 chỉ là convention minh họa Tháng 1–3 sau ba tháng; không phải dates của tài liệu gốc. Cả ba tháng là calendar months không chồng lấn, không phải rolling/weekly snapshots.

| Canonical inputs | Population, unit, period | Aggregation | Limitation |
|---|---|---|---|
| serviceRows | Confirmed booked seats có scheduled service date trong từng tháng, tất cả đã đến hạn tại cutoff | Price buckets; completed/cancelled/noShow/pending loại trừ nhau | Pending = đã đến hạn chưa phân loại; không gồm future seats. Tháng 3 cancelled derive từ 180 P2-B; tháng trước synthetic |
| periods.completedStudios | Distinct studio có ≥1 completed seat trong service-month | Count aggregate: 26/32/37 | Không có raw studio IDs, total registered hoặc activation rate; không cộng qua tháng |
| creationRows | Booking events, seats, booked VND, unique customers theo booking-created month | Counts/values aggregate; repeatCustomers có booking trước đầu tháng | Không reconcile seats tạo tháng này với service-month; không phải retention cohort 30d |
| creationRows funnel | journey_id trong một studio-page session, entry theo tháng, follow-up 7 ngày | Visit → calendar → slot → created theo thứ tự; cùng cohort; max 1 booking/journey | Synthetic giả định tất cả creations thuộc cohort, được tạo cùng tháng entry. Không có creations ngoài cohort/sang tháng sau; không áp giả định này cho data thật |
| supportRows | Tickets theo ngày tạo trong Tháng 3; một primary category mỗi ticket | Counts + total active handling minutes từng category | Counts/minutes đều bổ sung. Chưa có unique customers/bookings hoặc eligibility; không có ticket rate hoặc monetary cost |

### Các giá trị kiểm chứng

| Service-month | Completed | Cancelled | No-show | Pending | Booked seats | Completed-service value | Revenue 8% |
|---|---:|---:|---:|---:|---:|---:|---:|
| Tháng 1 | 910 | 120 | 60 | 30 | 1.120 | 263.200.000 ₫ | 21.056.000 ₫ |
| Tháng 2 | 1.070 | 160 | 65 | 25 | 1.320 | 313.100.000 ₫ | 25.048.000 ₫ |
| Tháng 3 | 1.180 | 180 | 70 | 20 | 1.450 | 365.200.000 ₫ | 29.216.000 ₫ |

Giá theo bucket: Tháng 1 250k/320k; Tháng 2 250k/330k; Tháng 3 280k/340k. Completed-service value = sum completed × price từng bucket; revenue = 8% value này. Không lấy booked GMV làm fee base.

Tháng 3 booking-created: 510 bookings, 1.520 seats, 467.000.000 ₫ booked GMV, 350 unique customers, 96 khách có booking trước đầu tháng. Funnel cùng journey cohort: 4.000 → 2.600 → 900 → 510. Đây là populations khác service-month.

Support bổ sung: 200 tickets, tổng active handling time 3.800 phút; đổi buổi 62, tìm vé 48, hồ sơ 30, lịch/số chỗ 28, báo cáo 12, payment 20. Không có claim counts này từ P2-B.

### Formulas và unknown

- Rate = count / đúng population ×100. Status rates dùng booked seats cohort service-date, không dùng booking count.
- Funnel: từ đầu = step / Visit; chuyển tiếp = step / previous step.
- KPI delta = (current − previous) / previous ×100; so tháng không chồng lấn và cùng convention của metric.
- pp = rate current − rate previous; không thay thế % change.
- Repeat context = customers có booking trước đầu tháng / unique customers tạo đơn tháng này.
- Ratio/delta với denominator 0 trả null → Chưa đo; 0 quan sát thật vẫn là 0.
- Chưa biết: total registered/active, overlap P2-A/C, demand 48 studios, phần 90 có thể phục hồi, nguyên nhân software/quy trình, H12 eligibility, lý do ít mở H04.
- Chưa đo: full cost-to-serve bằng tiền, unique booking/customer support denominator. Không coi handling minutes là chi phí tiền.
- Không cấp target thị trường, uplift feature hoặc expected impact/priority score.

## Source structure

- src/App.jsx: executive completed-seat overview, equal evidence panels, trend, studio-page funnel, post-booking cohort, studios/customer context, business, support.
- src/lib/data.js: anchors, canonical aggregates và derived metrics.
- src/lib/dictionary.js: unit/window/population/aggregation/source/limitation.
- src/components/DataGuide.jsx: student definitions only.
- src/components/FacilitatorGuide.jsx: Buổi 2 notes và late reveal.
- src/components/FacilitatorGate.jsx, src/lib/facilitatorAccess.js: existing temporary gate unchanged.
- tests/data.test.js: contract, anchors, cohorts, rates, fees, baseline and unknowns.
- tests/browser/dashboard.spec.js: desktop/mobile rendered text and accessibility attributes, charts/tooltips, tabs/guide, console/overflow and hidden notes.

## Development, build và test plan

Node 22.12+; .node-version chọn Node 22.

~~~bash
npm install
npm run test:data
npm run build
npx playwright install chromium
npm run test:e2e
~~~

Browser plugin not available; use project Playwright workflow. Desktop 1440×1000, mobile 390×1000. Valid-password browser flow chạy khi HEN_FACILITATOR_PASSWORD được đặt từ ngoài repo; không commit password. Không có env thì chỉ kiểm tra locked/wrong-password flow. CI chạy install, data tests, build, Chromium tests; upload dashboard-qa screenshots và dist.

## Cloudflare Pages

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | npm run build |
| Output directory | dist |
| Root | Repository root |
| Environment variables | Không cần |
| Production branch | main |

Workers & Pages → Create application → Pages → Import Git repository; chọn tuongbeo/hen-dashboard, branch main, settings trên; Save and Deploy. Custom domains → Set up a domain để gắn domain. Main pushes kích hoạt deploy nếu project đã kết nối. Không cần Worker, Functions, API hoặc database.

Không tuyên bố đã deploy production chỉ từ build/CI; cần kiểm tra Cloudflare deployment riêng.
