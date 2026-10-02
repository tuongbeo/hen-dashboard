export const metricGroups = [
  {
    "title": "Executive KPI & growth",
    "metrics": [
      {
        "name": "Monthly bookings",
        "value": "18.420 · +25,3%",
        "meaning": "Số booking events trong 30 ngày gần nhất. Một khách có thể tạo nhiều bookings.",
        "formula": "Đếm bookings trong rolling 30-day window. W12: 18.420; W4: 14.700.",
        "limit": "Volume tăng; chưa cho biết số khách, bookings hoàn tất dịch vụ hay lợi nhuận.",
        "dimension": "Reach / Value",
        "question": "Có bao nhiêu bookings thực sự được initiative tác động?"
      },
      {
        "name": "Booking trend",
        "value": "W1–W12",
        "meaning": "Mỗi điểm là snapshot tổng bookings trong 30 ngày gần nhất tại thời điểm đo.",
        "formula": "Các window chồng lấn; không cộng W1–W12 thành tổng quý.",
        "limit": "Tăng liên tục có thể do acquisition, repeat hoặc seasonality; chưa xác định nguyên nhân.",
        "dimension": "Value / Urgency",
        "question": "Tăng trưởng đến từ nhóm khách và studio nào?"
      },
      {
        "name": "Booking conversion",
        "value": "18,6% · −0,8pp",
        "meaning": "Tỷ lệ entrants hoàn tất booking trong funnel được định nghĩa.",
        "formula": "Booking completed users ÷ Visit users × 100. Funnel Q3: 18.598 ÷ 100.000 ≈ 18,6%.",
        "limit": "Funnel là unique users trong 90 ngày. KPI cùng giá trị không chứng minh cùng window; baseline −0,8pp chưa có raw data.",
        "dimension": "Impact",
        "question": "Người dùng rời ở bước nào, vì sao và có thể tác động bao nhiêu?"
      },
      {
        "name": "Cancellation rate",
        "value": "24,2% · +6,1pp",
        "meaning": "Tỷ lệ bookings bị hủy trong cùng phạm vi đo.",
        "formula": "Cancelled bookings ÷ bookings trong cùng window × 100; 18,1% → 24,2%.",
        "limit": "Tăng 6,1pp, tương đương tăng khoảng 33,7% tương đối. Không đồng nghĩa mất toàn bộ doanh thu.",
        "dimension": "Impact / Urgency",
        "question": "Ai hủy, lúc nào, khách có đặt lại và slot có được lấp không?"
      },
      {
        "name": "Repeat booking · 30d",
        "value": "21,3% · −3,2pp",
        "meaning": "Cho biết hành vi quay lại đặt lịch trong 30 ngày.",
        "formula": "Cần chốt cohort, booking đủ điều kiện và denominator. Dataset chỉ có tỷ lệ tổng hợp.",
        "limit": "Không suy ngược số khách quay lại khi chưa biết cohort; chu kỳ sử dụng dịch vụ có thể dài hơn 30 ngày.",
        "dimension": "Retention / Value",
        "question": "Khách mới và khách cũ khác nhau ra sao?"
      },
      {
        "name": "Active studios",
        "value": "185 / 320 · +14,2%",
        "meaning": "Số studio được phân loại active so với 320 studio onboarded.",
        "formula": "185 ÷ 320 ≈ 57,8%; quy tắc xác định active và baseline tăng trưởng chưa có trong dataset.",
        "limit": "Onboarded không đồng nghĩa active. Con số không phản ánh năng lực hoặc chất lượng từng studio.",
        "dimension": "Reach / Value",
        "question": "Active được định nghĩa bằng booking, đăng nhập hay lịch khả dụng?"
      }
    ]
  },
  {
    "title": "Booking funnel",
    "metrics": [
      {
        "name": "Visit → Studio view",
        "value": "100.000 → 63.000",
        "meaning": "63% entrants xem studio trong funnel Q3.",
        "formula": "63.000 ÷ 100.000 = 63%; drop-off từ Visit là 37%.",
        "limit": "Chưa biết khách rời do discovery, nhu cầu chưa rõ hay traffic không phù hợp.",
        "dimension": "Reach / Impact",
        "question": "Nguồn traffic nào có drop-off cao?"
      },
      {
        "name": "Studio view → Select slot",
        "value": "63.000 → 25.830",
        "meaning": "41% studio viewers chọn slot; 59% không chọn.",
        "formula": "25.830 ÷ 63.000 = 41%. Mất 37.170 users, bằng 37,17pp của toàn bộ entrants.",
        "limit": "59% drop-off không chứng minh UI kém. Có thể do giá, thiếu slot hoặc khách chỉ tham khảo.",
        "dimension": "Impact / Confidence",
        "question": "Có slot phù hợp không? Tách studio, thiết bị và nhóm khách thế nào?"
      },
      {
        "name": "Select slot → Booking completed",
        "value": "25.830 → 18.598",
        "meaning": "Khoảng 72% người chọn slot hoàn tất booking.",
        "formula": "18.598 ÷ 25.830 ≈ 72%; conversion từ Visit ≈ 18,6%.",
        "limit": "Không dùng 18.420 booking events của rolling 30 ngày thay cho 18.598 unique users của Q3.",
        "dimension": "Impact",
        "question": "Rời vì payment, thông tin cần nhập hay thay đổi ý định?"
      }
    ]
  },
  {
    "title": "Cancellation & customer behaviour",
    "metrics": [
      {
        "name": "Cancellation reasons",
        "value": "48% / 21% / 17% / 14%",
        "meaning": "Tỷ trọng lý do trong nhóm cancellation: customer, studio, scheduling conflict, other.",
        "formula": "Số cancellations của từng category ÷ tổng cancellations × 100.",
        "limit": "48% customer cancelled không phải 48% tổng bookings; người hủy chưa chắc là nguyên nhân gốc.",
        "dimension": "Impact / Confidence",
        "question": "Lý do được tự khai hay xác minh? Categories có loại trừ nhau không?"
      },
      {
        "name": "Late cancellation",
        "value": "61% trong 6 giờ trước lịch hẹn",
        "meaning": "Tỷ lệ cancellations xảy ra sát giờ hẹn.",
        "formula": "Late cancellations ÷ tổng cancellations × 100.",
        "limit": "Không phải 61% mọi bookings. Chưa có dữ liệu về slot được lấp lại hoặc thiệt hại.",
        "dimension": "Urgency / Impact",
        "question": "Hủy sát giờ gây mất doanh thu và workload bao nhiêu?"
      },
      {
        "name": "No-show rate",
        "value": "11,3% · +1,9pp",
        "meaning": "Khách không đến lịch hẹn đủ điều kiện.",
        "formula": "No-show appointments ÷ appointments đủ điều kiện × 100; cần chốt cách loại cancelled/rescheduled.",
        "limit": "Dataset chưa có denominator. Không cộng no-show với cancellation nếu chưa biết hai nhóm có trùng không.",
        "dimension": "Impact",
        "question": "Nhóm nào no-show nhiều? Có đo trên lịch đã đến hạn không?"
      },
      {
        "name": "Reminder adoption",
        "value": "42% · +7pp",
        "meaning": "Mức sử dụng reminder trong nhóm đủ điều kiện.",
        "formula": "Reminder users hoặc bookings ÷ eligible users hoặc bookings × 100; đơn vị chưa được chốt.",
        "limit": "Adoption tăng là output sử dụng feature; chưa chứng minh no-show giảm.",
        "dimension": "Confidence / Impact",
        "question": "So sánh nhóm có/không reminder có tương đồng không?"
      },
      {
        "name": "Reschedule usage",
        "value": "9% · +1pp",
        "meaning": "Mức sử dụng chức năng đổi lịch.",
        "formula": "Số đối tượng dùng reschedule ÷ nhóm đủ điều kiện × 100; cần chốt user hay booking.",
        "limit": "Usage thấp có thể do ít nhu cầu, khó tìm chức năng hoặc đổi lịch qua nhân viên.",
        "dimension": "Reach / Impact",
        "question": "Bao nhiêu yêu cầu đổi lịch diễn ra ngoài platform?"
      },
      {
        "name": "Avg. bookings / customer",
        "value": "1,4 · −0,1",
        "meaning": "Số bookings trung bình của mỗi khách trong phạm vi đo.",
        "formula": "Booking events ÷ unique booking customers trong cùng window.",
        "limit": "Trung bình che giấu phân bố; window và raw counts chưa được cung cấp.",
        "dimension": "Retention / Value",
        "question": "Bao nhiêu khách chỉ đặt một lần? Nhóm nào đặt nhiều?"
      }
    ]
  },
  {
    "title": "Studio operations",
    "metrics": [
      {
        "name": "Studio activation",
        "value": "58% · target 75%",
        "meaning": "Tỷ lệ studio đạt activation milestone.",
        "formula": "Activated studios ÷ eligible onboarded studios × 100; milestone chưa được định nghĩa.",
        "limit": "185/320 ≈ 58% nhưng chưa chứng minh activation và active là cùng khái niệm.",
        "dimension": "Reach / Value",
        "question": "Milestone nào thể hiện studio đã nhận được giá trị?"
      },
      {
        "name": "Auto-confirmed / Manual confirmation",
        "value": "54% / 46%",
        "meaning": "Tỷ lệ bookings được xác nhận tự động hoặc thủ công.",
        "formula": "Bookings mỗi loại ÷ tổng bookings thuộc phạm vi confirmation × 100.",
        "limit": "Hai tỷ lệ cộng 100% trong dataset; workload thực tế còn phụ thuộc volume và phút xử lý mỗi booking.",
        "dimension": "Impact / Effort",
        "question": "Manual confirmation có cần thiết cho một số studio không?"
      },
      {
        "name": "Manual reschedule",
        "value": "68% · target 30%",
        "meaning": "Tỷ lệ trường hợp đổi lịch cần xử lý thủ công.",
        "formula": "Manual reschedules ÷ tổng reschedule cases × 100.",
        "limit": "Không phải 68% mọi bookings. Chưa biết số case, thời gian xử lý và exception.",
        "dimension": "Impact / Feasibility",
        "question": "Có bao nhiêu case có thể tự phục vụ mà vẫn đáp ứng nghiệp vụ?"
      },
      {
        "name": "Median onboarding time",
        "value": "6,8 ngày · target <3 ngày",
        "meaning": "Thời gian ở giữa của các studio hoàn tất onboarding.",
        "formula": "Sắp xếp durations và lấy median; cần chốt sự kiện bắt đầu/kết thúc.",
        "limit": "Không phải average; cần xem cả studio chưa hoàn tất và các case chậm nhất.",
        "dimension": "Urgency / Value",
        "question": "Studio chờ ở bước nào? Có thực sự đủ nhu cầu để ưu tiên rút ngắn?"
      }
    ]
  },
  {
    "title": "Business & support",
    "metrics": [
      {
        "name": "GMV",
        "value": "2,8 tỷ ₫ · +22%",
        "meaning": "Tổng giá trị giao dịch theo quy tắc ghi nhận.",
        "formula": "Tổng transaction value đủ điều kiện; dataset chưa chốt treatment của cancellation/refund.",
        "limit": "GMV không phải revenue hay profit; cần kiểm tra thời gian và gross/net basis.",
        "dimension": "Value",
        "question": "Bao nhiêu GMV hoàn tất dịch vụ và được thu tiền?"
      },
      {
        "name": "Revenue",
        "value": "280 triệu ₫ · +19%",
        "meaning": "Doanh thu platform theo quy tắc ghi nhận.",
        "formula": "Tổng doanh thu đủ điều kiện. Revenue/GMV trong snapshot là 10%, chưa chứng minh commission cố định 10%.",
        "limit": "Doanh thu tăng không chứng minh lợi nhuận tăng; chưa có đầy đủ chi phí.",
        "dimension": "Value",
        "question": "Initiative tạo thêm revenue hay chỉ dịch chuyển bookings?"
      },
      {
        "name": "Revenue / active studio",
        "value": "1,51 triệu ₫ · +4%",
        "meaning": "Doanh thu trung bình theo studio active.",
        "formula": "280 triệu ÷ 185 ≈ 1,51 triệu ₫; chỉ có ý nghĩa khi cùng window.",
        "limit": "Average có thể bị kéo lên bởi một số studio lớn.",
        "dimension": "Value / Reach",
        "question": "Median và phân bố theo nhóm studio thế nào?"
      },
      {
        "name": "Cost-to-serve / studio",
        "value": "+18% so với quý trước",
        "meaning": "Mức tăng tương đối của chi phí phục vụ mỗi studio.",
        "formula": "(Chi phí/ studio kỳ này ÷ kỳ trước − 1) × 100.",
        "limit": "+18% là change, không phải số tiền hoặc tỷ trọng chi phí. Chưa có baseline và cost components.",
        "dimension": "Impact / Cost of Delay",
        "question": "Chi phí nào tăng và có thể giảm nhờ initiative?"
      },
      {
        "name": "GMV concentration",
        "value": "63% GMV từ top 20% active studios",
        "meaning": "Mức tập trung giao dịch vào nhóm studio lớn.",
        "formula": "GMV nhóm top 20% ÷ tổng GMV × 100 trong cùng window.",
        "limit": "Có thể là cơ hội khai thác hoặc concentration risk; context quyết định cách đánh giá.",
        "dimension": "Strategic fit / Risk",
        "question": "Nếu một studio lớn rời platform, tác động ra sao?"
      },
      {
        "name": "Support tickets",
        "value": "1.240/tháng · +32%",
        "meaning": "Số tickets, không phải số khách gặp vấn đề.",
        "formula": "Đếm tickets trong tháng; một khách hoặc booking có thể tạo nhiều tickets.",
        "limit": "Cần normalize theo volume; không chia với booking KPI nếu chưa xác nhận cùng window và scope.",
        "dimension": "Reach / Impact",
        "question": "Tickets/100 bookings tăng hay giảm? Tốn bao nhiêu phút mỗi ticket?"
      },
      {
        "name": "Support categories",
        "value": "384 / 223 / 211 / 136 / 286",
        "meaning": "Change/cancel, payment, studio confirmation, login/account, other.",
        "formula": "Category tickets ÷ 1.240 × 100; shares làm tròn là 31/18/17/11/23%.",
        "limit": "Category lớn nhất chưa chắc có impact hoặc chi phí lớn nhất; cần severity và handling time.",
        "dimension": "Impact / Confidence",
        "question": "Nhóm ticket nào có thể phòng ngừa, thay vì chỉ xử lý nhanh hơn?"
      }
    ]
  }
]
