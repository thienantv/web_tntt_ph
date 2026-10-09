// Dữ liệu danh sách và tuẫn lễ được giữ nguyên
const ADMIN_EMAILS = ["htam00521@gmail.com", "yinsnhuw29@gmail.com"]; 
const hardcodedGroupEmails = { 1: { groupName: "Nhóm 1", leaderName: "Hiếu Nghĩa", leaderEmails: ["nghia1132009852009@gmail.com", "nguyenxhuyvu70@gmail.com", "ltam54127@gmail.com"] }, 2: { groupName: "Nhóm 2", leaderName: "Ngọc Trâm", leaderEmails: ["ngoctramtv2006@gmail.com", "haut7238@gmail.com"] }, 3: { groupName: "Nhóm 3", leaderName: "Minh Vũ", leaderEmails: ["ngminhvu2000@gmail.com", "pherokhoa0707@gmail.com"] }, 4: { groupName: "Nhóm 4", leaderName: "Thịnh Đạt", leaderEmails: ["tranbuithinhdatph@gmail.com", "diemthy352026@gmail.com"] } };
const danhSachTuanPhungVu = [ { id: 1, name: " CN I Mùa Vọng", dates: "30/11 - 06/12/2025", season: "Mùa Vọng" }, { id: 2, name: " CN II Mùa Vọng", dates: "07/12 - 13/12/2025", season: "Mùa Vọng" }, { id: 3, name: " CN III Mùa Vọng", dates: "14/12 - 20/12/2025", season: "Mùa Vọng" }, { id: 4, name: " CN IV Mùa Vọng & Lễ Giáng Sinh", dates: "21/12 - 27/12/2025", season: "Mùa Vọng & Giáng Sinh" }, { id: 5, name: " CN Lễ Thánh Gia Thất", dates: "28/12/2025 - 03/01/2026", season: "Mùa Giáng Sinh" }, { id: 6, name: " CN Lễ Chúa Hiển Linh", dates: "04/01 - 10/01/2026", season: "Mùa Giáng Sinh" }, { id: 7, name: " CN Chúa Giêsu Chịu Phép Rửa", dates: "11/01 - 17/01/2026", season: "Kết thúc Mùa Giáng Sinh" }, { id: 8, name: " CN II Thường Niên", dates: "18/01 - 24/01/2026", season: "Mùa Thường Niên" }, { id: 9, name: " CN III Thường Niên", dates: "25/01 - 31/01/2026", season: "Mùa Thường Niên" }, { id: 10, name: " CN IV Thường Niên", dates: "01/02 - 07/02/2026", season: "Mùa Thường Niên" }, { id: 11, name: " CN V Thường Niên", dates: "08/02 - 14/02/2026", season: "Mùa Thường Niên" }, { id: 12, name: " CN VI Thường Niên & Tết Bính Ngọ", dates: "15/02 - 21/02/2026", season: "Tết Bính Ngọ" }, { id: 13, name: " Thứ Sáu LỄ TRO", dates: "20/02 - 21/02/2026", season: "Mùa Chay" }, { id: 14, name: " CN I Mùa Chay", dates: "22/02 - 28/02/2026", season: "Mùa Chay" }, { id: 15, name: " CN II Mùa Chay", dates: "01/03 - 07/03/2026", season: "Mùa Chay" }, { id: 16, name: " CN III Mùa Chay", dates: "08/03 - 14/03/2026", season: "Mùa Chay" }, { id: 17, name: " CN IV Mùa Chay (Chúa Nhật Hồng)", dates: "15/03 - 21/03/2026", season: "Mùa Chay" }, { id: 18, name: " CN V Mùa Chay", dates: "22/03 - 28/03/2026", season: "Mùa Chay" }, { id: 19, name: " TUẦN THÁNH & TAM NHẬT VƯỢT QUA", dates: "29/03 - 04/04/2026", season: "Tuần Thánh" }, { id: 20, name: " ĐẠI LỄ CHÚA PHỤC SINH (Bát Nhật)", dates: "05/04 - 11/04/2026", season: "Mùa Phục Sinh" }, { id: 21, name: " CN II Phục Sinh (Lòng Thương Xót)", dates: "12/04 - 18/04/2026", season: "Mùa Phục Sinh" }, { id: 22, name: " CN III Phục Sinh", dates: "19/04 - 25/04/2026", season: "Mùa Phục Sinh" }, { id: 23, name: " CN IV Phục Sinh (Chúa Chiên Lành)", dates: "26/04 - 02/05/2026", season: "Mùa Phục Sinh" }, { id: 24, name: " CN V Phục Sinh", dates: "03/05 - 09/05/2026", season: "Mùa Phục Sinh" }, { id: 25, name: " CN VI Phục Sinh", dates: "10/05 - 16/05/2026", season: "Mùa Phục Sinh" }, { id: 26, name: " CN VII Phục Sinh (Chúa Thăng Thiên)", dates: "17/05 - 23/05/2026", season: "Mùa Phục Sinh" }, { id: 27, name: " CHÚA THÁNH THẦN HIỆN XUỐNG", dates: "24/05 - 30/05/2026", season: "Đại Lễ Hiện Xuống" }, { id: 28, name: " CN IX Thường Niên (Lễ Chúa Ba Ngôi)", dates: "31/05 - 06/06/2026", season: "Mùa Thường Niên" }, { id: 29, name: " CN X Thường Niên (Mình Máu Thánh Chúa)", dates: "07/06 - 13/06/2026", season: "Mùa Thường Niên" }, { id: 30, name: " CN XI Thường Niên", dates: "14/06 - 20/06/2026", season: "Mùa Thường Niên" }, { id: 31, name: " CN XII Thường Niên", dates: "21/06 - 27/06/2026", season: "Mùa Thường Niên" }, { id: 32, name: " CN XIII Thường Niên (Thánh Phêrô & Phaolô)", dates: "28/06 - 04/07/2026", season: "Mùa Thường Niên" }, { id: 33, name: " CN XIV Thường Niên", dates: "05/07 - 11/07/2026", season: "Mùa Thường Niên" }, { id: 34, name: " CN XV Thường Niên", dates: "12/07 - 18/07/2026", season: "Mùa Thường Niên" }, { id: 35, name: " CN XVI Thường Niên", dates: "19/07 - 25/07/2026", season: "Mùa Thường Niên" }, { id: 36, name: " CN XVII Thường Niên", dates: "26/07 - 01/08/2026", season: "Mùa Thường Niên" }, { id: 37, name: " CN XVIII Thường Niên", dates: "02/08 - 08/08/2026", season: "Mùa Thường Niên" }, { id: 38, name: " CN XIX Thường Niên (Chầu lượt Phước Hảo)", dates: "09/08 - 15/08/2026", season: "Mùa Thường Niên" }, { id: 39, name: " CN XX Thường Niên", dates: "16/08 - 22/08/2026", season: "Mùa Thường Niên" }, { id: 40, name: " CN XXI Thường Niên", dates: "23/08 - 29/08/2026", season: "Mùa Thường Niên" }, { id: 41, name: " CN XXII Thường Niên", dates: "30/08 - 05/09/2026", season: "Mùa Thường Niên" }, { id: 42, name: " CN XXIII Thường Niên", dates: "06/09 - 12/09/2026", season: "Mùa Thường Niên" }, { id: 43, name: " CN XXIV Thường Niên", dates: "13/09 - 19/09/2026", season: "Mùa Thường Niên" }, { id: 44, name: " CN XXV Thường Niên", dates: "20/09 - 26/09/2026", season: "Mùa Thường Niên" }, { id: 45, name: " CN XXVI Thường Niên", dates: "27/09 - 03/10/2026", season: "Mùa Thường Niên" }, { id: 46, name: " CN XXVII Thường Niên (Đức Mẹ Mân Côi)", dates: "04/10 - 10/10/2026", season: "Tháng Mân Côi" }, { id: 47, name: " CN XXVIII Thường Niên", dates: "11/10 - 17/10/2026", season: "Mùa Thường Niên" }, { id: 48, name: " CN XXIX Thường Niên (Khánh Nhật Truyền Giáo)", dates: "18/10 - 24/10/2026", season: "Mùa Thường Niên" }, { id: 49, name: " CN XXX Thường Niên", dates: "25/10 - 31/10/2026", season: "Mùa Thường Niên" }, { id: 50, name: " CN XXXI TN (Lễ Các Thánh & Các Đẳng)", dates: "01/11 - 07/11/2026", season: "Tháng Các Linh Hồn" }, { id: 51, name: " CN XXXII Thường Niên", dates: "08/11 - 14/11/2026", season: "Mùa Thường Niên" }, { id: 52, name: " CN XXXIII TN (Các Thánh Tử Đạo VN)", dates: "15/11 - 21/11/2026", season: "Mùa Thường Niên" }, { id: 53, name: " CN XXXIV TN - ĐỨC GIÊSU KITÔ VUA VŨ TRỤ", dates: "22/11 - 28/11/2026", season: "Kết Thúc Năm Phụng Vụ A" } ];
const danhSachGoc = [ { thanhHoTen: "Patriciô Nguyễn Thiên Ân", chucVu: "Trưởng Huynh Trưởng - Ban Điều Hành", cap: "Huynh Trưởng Cấp 2", ngaySinh: "21/01/2004", sdt: "0395800581", hinhAnhUrl: "thienan" }, { thanhHoTen: "Phêrô Lê Huỳnh Hiếu Tâm", chucVu: "Phó Huynh Trưởng, Thủ Quỹ - Ban Điều Hành", cap: "Huynh Trưởng Cấp 2", ngaySinh: "25/02/2005", sdt: "0921786312", hinhAnhUrl: "hieutam" }, { thanhHoTen: "Maria Nguyễn Thị Kiều Vy", chucVu: "Trưởng Ban Sinh Hoạt - Ban Điều Hành", cap: "Huynh Trưởng Cấp 2", ngaySinh: "30/03/2007", sdt: "0834577510", hinhAnhUrl: "kieuvy" }, { thanhHoTen: "Anê Nguyễn Bình Phương Nam", chucVu: "Trưởng Ban Y Tế - Ban Điều Hành", cap: "Huynh Trưởng Cấp 1", ngaySinh: "21/06/2008", sdt: "0343351327", hinhAnhUrl: "phuongnam" }, { thanhHoTen: "Maria Sơn Nguyễn Yến Như", chucVu: "Trưởng Ban Phụng Vụ - Ban Điều Hành", cap: "Huynh Trưởng Cấp 1", ngaySinh: "20/09/2010", sdt: "0366548104", hinhAnhUrl: "yennhu" }, { thanhHoTen: "Đôminicô Huỳnh Lê Hiếu Nghĩa", chucVu: "Trưởng Ban Kỹ Thuật, Lao Động - Ban Điều Hành", cap: "Huynh Trưởng Cấp 2", ngaySinh: "08/05/2009", sdt: "0346328816", hinhAnhUrl: "hieunghia" }, { thanhHoTen: "Phêrô Đoàn Minh Phát", chucVu: "Trưởng Ban Truyền Thông - Ban Điều Hành", cap: "Huynh Trưởng Cấp 2", ngaySinh: "16/03/2009", sdt: "0364521171", hinhAnhUrl: "minhphat" }, { thanhHoTen: "Matta Trương Thị Diễm Hương", chucVu: "Thư Ký - Ban Điều Hành", cap: "Huynh Trưởng Cấp 2", ngaySinh: "16/06/2009", sdt: "0349356330", hinhAnhUrl: "diemhuong" }, { thanhHoTen: "Phêrô Trần Bùi Thịnh Đạt", chucVu: "Trưởng ngành Ấu", cap: "Huynh Trưởng Cấp 2", ngaySinh: "06/04/2010", sdt: "0343481454", hinhAnhUrl: "thinhdat" }, { thanhHoTen: "Têrêsa Nguyễn Lâm Phương Hà", chucVu: "Trưởng ngành Ấu", cap: "Huynh Trưởng Cấp 2", ngaySinh: "10/02/2010", sdt: "0338595144", hinhAnhUrl: "phuongha" }, { thanhHoTen: "Têrêsa Trần Thanh Uyên", chucVu: "Trưởng ngành Ấu", cap: "Huynh Trưởng Cấp 2", ngaySinh: "12/09/2009", sdt: "0357667730", hinhAnhUrl: "thanhuyen" }, { thanhHoTen: "Maria Nguyễn Bảo Thy", chucVu: "Trưởng ngành Ấu", cap: "Huynh Trưởng Cấp 2", ngaySinh: "09/11/2008", sdt: "0349735441", hinhAnhUrl: "baothy" }, { thanhHoTen: "Maria Lê Nguyễn Hồng Châu", chucVu: "Trưởng ngành Thiếu", cap: "Huynh Trưởng Cấp 2", ngaySinh: "12/09/2009", sdt: "0385966649", hinhAnhUrl: "hongchau" }, { thanhHoTen: "Maria Diệp Thanh Thoảng", chucVu: "Trưởng ngành Thiếu", cap: "Huynh Trưởng Cấp 2", ngaySinh: "25/07/2008", sdt: "0948673652", hinhAnhUrl: "thanhthoang" }, { thanhHoTen: "Phêrô Nguyễn Minh Vũ", chucVu: "Trưởng ngành Thiếu", cap: "Huynh Trưởng Cấp 2", ngaySinh: "02/03/2009", sdt: "0382961153", hinhAnhUrl: "minhvu" }, { thanhHoTen: "Matta Lê Thị Ngọc Trâm", chucVu: "Trưởng ngành Nghĩa", cap: "Huynh Trưởng Cấp 2", ngaySinh: "21/10/2006", sdt: "0337383298", hinhAnhUrl: "ngoctram" }, { thanhHoTen: "Anê Nguyễn Thị Hồng Yến", chucVu: "Trưởng ngành Nghĩa", cap: "Huynh Trưởng Cấp 2", ngaySinh: "23/02/2007", sdt: "0792394746", hinhAnhUrl: "hongyen" }, { thanhHoTen: "Maria Nguyễn Lâm Cẩm Hướng", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "02/07/2007", sdt: "0396462484", hinhAnhUrl: "camhuong" }, { thanhHoTen: "Phêrô Nguyễn Duy Tân", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "29/01/2008", sdt: "0896416291", hinhAnhUrl: "duytan" }, { thanhHoTen: "Phêrô Trần Tấn Tài", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "16/05/2008", sdt: "0396191605", hinhAnhUrl: "tantai" }, { thanhHoTen: "Phêrô Nguyễn Lê Tiến Khoa", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "07/07/2008", sdt: "0972756505", hinhAnhUrl: "tienkhoa" }, { thanhHoTen: "Giuse Nguyễn Phúc Khang", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "03/11/2008", sdt: "0368902575", hinhAnhUrl: "phuckhang" }, { thanhHoTen: "Maria Hứa Thanh Thảo", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "22/06/2009", sdt: "0972546881", hinhAnhUrl: "huathao2" }, { thanhHoTen: "Phanxica Lê Hoàng Gia Hân", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "11/03/2009", sdt: "0799320036", hinhAnhUrl: "giahan" }, { thanhHoTen: "Anna Nguyễn Thị Hoàng Uyên", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "02/01/2010", sdt: "0345204809", hinhAnhUrl: "hoanguyen" }, { thanhHoTen: "Giuse Nguyễn Nhất Tâm", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "24/02/2010", sdt: "0983525538", hinhAnhUrl: "nhattam" }, { thanhHoTen: "Maria Trương Anh Phong Nhi", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "05/04/2010", sdt: "0363673929", hinhAnhUrl: "phongnhi1" }, { thanhHoTen: "Phêrô Nguyễn Huy Vũ", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "12/05/2010", sdt: "0987974107", hinhAnhUrl: "huyvu" }, { thanhHoTen: "Maria Sơn Thị Thảo Vy", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "04/06/2010", sdt: "0374246153", hinhAnhUrl: "sonvy" }, { thanhHoTen: "Raymonđô Trương Công Hậu", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "28/07/2010", sdt: "0358319506", hinhAnhUrl: "conghau" }, { thanhHoTen: "Rôsalima Nguyễn Thủy Hải Huỳnh", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "01/01/2011", sdt: "0773913619", hinhAnhUrl: "haihuynh" }, { thanhHoTen: "Matta Nguyễn Yến Lan", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "02/01/2011", sdt: "0769640742", hinhAnhUrl: "yenlan" }, { thanhHoTen: "Anna Nguyễn Thị Tường Lam", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "30/01/2011", sdt: "0382530494", hinhAnhUrl: "tuonglam" }, { thanhHoTen: "Phêrô Lê Minh Tiến", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "19/02/2011", sdt: "0966908232", hinhAnhUrl: "minhtien" }, { thanhHoTen: "Matta Nguyễn Ngọc Hương Giang", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "17/03/2011", sdt: "0332183247", hinhAnhUrl: "huonggiang" }, { thanhHoTen: "Phêrô Lê Huỳnh Sĩ Nguyên", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "06/11/2011", sdt: "0949344205", hinhAnhUrl: "singuyen" }, { thanhHoTen: "Gioan Baotixita Lê Thái Hào", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "30/10/2011", sdt: "0704964207", hinhAnhUrl: "thaihao" }, { thanhHoTen: "Maria Trần Huỳnh Trâm", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "30/10/2011", sdt: "0704964207", hinhAnhUrl: "huynhtram" }, { thanhHoTen: "Giuse Lựu Huỳnh Lâm Ngọc Tân", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "15/04/2011", sdt: "0765993928", hinhAnhUrl: "ngoctan" }, { thanhHoTen: "Maria Madalena Nguyễn Lê Thảo Vy", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "10/05/2011", sdt: "0963981148", hinhAnhUrl: "nguyenthaovy" }, { thanhHoTen: "Maria Nguyễn Như Thùy", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "15/07/2011", sdt: "0395382387", hinhAnhUrl: "nhuthuy" }, { thanhHoTen: "Maria Nguyễn Kiều Duyên", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "03/08/2011", sdt: "0797852698", hinhAnhUrl: "kieuduyen" }, { thanhHoTen: "Maria Nguyễn Ngô Ngọc Hân", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "08/08/2011", sdt: "0932471359", hinhAnhUrl: "ngochan" }, { thanhHoTen: "Đôminicô Lương Nguyễn Khang", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "12/09/2011", sdt: "0785801705", hinhAnhUrl: "nguyenkhang" }, { thanhHoTen: "Maria Nguyễn Huỳnh An Dy", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "19/10/2011", sdt: "0909107132", hinhAnhUrl: "andy" }, { thanhHoTen: "Phêrô Nguyễn Nhất Trung", chucVu: "HT", cap: "Huynh Trưởng Cấp 1", ngaySinh: "27/10/2011", sdt: "0369902728", hinhAnhUrl: "nhattrung" }, { thanhHoTen: "Tađêô Nguyễn Quang Lạc", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "07/01/2012", sdt: "0966265200", hinhAnhUrl: "quanglac" }, { thanhHoTen: "Philipphe Nguyễn Duy Lữ", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "18/01/2012", sdt: "0326271470", hinhAnhUrl: "duylu" }, { thanhHoTen: "Matta Nguyễn Phương Thảo My", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "07/02/2012", sdt: "0338158231", hinhAnhUrl: "thaomy" }, { thanhHoTen: "Giuse Nguyễn Thái Sơn", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "13/03/2012", sdt: "0365656063", hinhAnhUrl: "thaison" }, { thanhHoTen: "Đôminicô Trần Bùi Đạt Phú", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "10/05/2012", sdt: "0345344063", hinhAnhUrl: "datphu" }, { thanhHoTen: "Giuse Nguyễn Lâm Hồng Hải", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "30/06/2012", sdt: "0326395940", hinhAnhUrl: "honghai" }, { thanhHoTen: "Antôn Lê Hoàng Gia Huy", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "01/07/2012", sdt: "0355749059", hinhAnhUrl: "giahuy" }, { thanhHoTen: "Maria Trần Thị Kiều Trang", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "04/09/2012", sdt: "0385627732", hinhAnhUrl: "kieutrang" }, { thanhHoTen: "Maria Nguyễn Ngọc Trâm Anh", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "22/09/2012", sdt: "0586075828", hinhAnhUrl: "tramanh" }, { thanhHoTen: "Maria Lê Ngọc Huyền Trân", chucVu: "Dự Trưởng", cap: "Dự Trưởng", ngaySinh: "11/10/2012", sdt: "0907037009", hinhAnhUrl: "huyentran" }, { thanhHoTen: "Phêrô Nguyễn Duy Nguyễn", chucVu: "HT", cap: "Huynh Trưởng Cấp 2", ngaySinh: "17/03/2008", sdt: "0814657029", hinhAnhUrl: "duynguyen" } ];
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

// ================= BIẾN TOÀN CỤC & AUTH & GIAO DIỆN =================
let currentUser = JSON.parse(localStorage.getItem("ht_user_session")) || { name: "Khách", email: "", picture: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", role: "viewer", leaderOfGroup: null };
let currentViewMode = 'grid'; // 'grid' hoặc 'table'
let currentFilteredList = danhSachGoc; // Lưu trữ mảng kết quả đang lọc

let currentPage = 1;
const itemsPerPage = 12; // Số HT trên mỗi trang
let htChartInstance = null;

window.onload = function () {
    khoiTaoDanhSachTuanPhungVu(); 
    xacDinhQuyenTruyCap();
    khoiTaoBoLocNamSinh();
    renderStatistics(); // Gọi hàm vẽ biểu đồ và thẻ thống kê
    hienThiDanhSach(danhSachGoc); 
};

// Hàm xử lý dữ liệu và vẽ biểu đồ
function renderStatistics() {
    let total = danhSachGoc.length;
    let cap1 = 0, cap2 = 0, dt = 0;

    danhSachGoc.forEach(ht => {
        if(ht.cap === "Huynh Trưởng Cấp 1") cap1++;
        else if(ht.cap === "Huynh Trưởng Cấp 2") cap2++;
        else if(ht.cap === "Dự Trưởng") dt++;
    });

    // Cập nhật số liệu lên các Thẻ
    document.getElementById("statTotal").innerText = total;
    document.getElementById("statCap1").innerText = cap1;
    document.getElementById("statCap2").innerText = cap2;
    document.getElementById("statDT").innerText = dt;

    // Vẽ biểu đồ Donut Chart
    const ctx = document.getElementById('htChart').getContext('2d');
    if(htChartInstance) htChartInstance.destroy();
    
    htChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cấp 1', 'Cấp 2', 'Dự Trưởng'],
            datasets: [{
                data: [cap1, cap2, dt],
                backgroundColor: ['#22c55e', '#ef4444', '#94a3b8'], 
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%', // Làm vòng khuyên dày hơn một chút
            layout: {
                padding: 10 // Ép biểu đồ lùi vào trong, tạo viền vô hình để thu nhỏ hình tròn
            },
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: {family: 'Nunito', weight: 'bold'} } }
            }
        }
    });
}

// ================= TỰ ĐỘNG LẤY NĂM SINH VÀO COMBOBOX LỌC =================
function khoiTaoBoLocNamSinh() {
    const filterNamSinh = document.getElementById("filterNamSinh");
    let years = new Set();
    
    // Lấy các năm sinh tồn tại trong danh sách
    danhSachGoc.forEach(ht => {
        if (ht.ngaySinh && ht.ngaySinh.includes("/")) {
            const parts = ht.ngaySinh.split("/");
            if (parts.length === 3) {
                years.add(parts[2]);
            }
        }
    });

    // Sắp xếp năm sinh từ lớn đến bé
    const sortedYears = Array.from(years).sort((a, b) => b - a);

    sortedYears.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = `Năm sinh ${year}`;
        filterNamSinh.appendChild(option);
    });
}

function xacDinhQuyenTruyCap() {
    // Check nếu có email -> Tìm xem phải leader không
    if(currentUser.email) {
        if(currentUser.role !== "admin") {
            let foundLeader = false;
            for (let g = 1; g <= 4; g++) { 
                const emails = hardcodedGroupEmails[g].leaderEmails || []; 
                if (emails.some(e => e.toLowerCase().trim() === currentUser.email)) { 
                    currentUser.role = "leader"; 
                    currentUser.leaderOfGroup = g; 
                    foundLeader = true;
                    break; 
                } 
            }
            if(!foundLeader) {
                currentUser.role = "viewer";
                currentUser.leaderOfGroup = null;
            }
        }
    }

    const btnGoToLogin = document.getElementById("btnGoToLogin");
    const userInfoNav = document.getElementById("userInfoNav");
    const adminManageBtn = document.getElementById("adminManageBtn");

    if (currentUser && currentUser.email) {
        if(btnGoToLogin) btnGoToLogin.classList.add("d-none");
        if(userInfoNav) {
            userInfoNav.classList.remove("d-none");
            userInfoNav.classList.add("d-flex");
        }
        
        if(document.getElementById("userNameDisplay")) document.getElementById("userNameDisplay").innerText = currentUser.name;
        if(document.getElementById("userAvatarMini")) document.getElementById("userAvatarMini").src = currentUser.picture;
        
        const badge = document.getElementById("roleBadge");
        if(badge) {
            badge.className = "badge"; 
            if (currentUser.role === "admin") {
                badge.classList.add("bg-danger"); 
                badge.innerText = "Admin";
                if(adminManageBtn) adminManageBtn.style.display = "inline-flex";
            } else if (currentUser.role === "leader") {
                badge.classList.add("bg-warning"); 
                badge.classList.add("text-dark"); 
                badge.innerText = `Leader Nhóm ${currentUser.leaderOfGroup}`;
                if(adminManageBtn) adminManageBtn.style.display = "none";
            } else {
                badge.classList.add("bg-secondary"); 
                badge.innerText = "Người xem";
                if(adminManageBtn) adminManageBtn.style.display = "none";
            }
        }
    } else {
        if(btnGoToLogin) btnGoToLogin.classList.remove("d-none");
        if(userInfoNav) {
            userInfoNav.classList.remove("d-flex");
            userInfoNav.classList.add("d-none");
        }
        if(adminManageBtn) adminManageBtn.style.display = "none";
    }

    hienThiPhienTruc();
}

function xuLyDangXuat() {
    currentUser = { role: "viewer" };
    localStorage.removeItem("ht_user_session");
    alert("Đã đăng xuất!");
    window.location.reload(); 
}

// ================= SỰ KIỆN VUỐT ẨN/HIỆN THANH MENU =================
let lastScrollTop = 0;
const navbar = document.getElementById("mainHeader");
const mobileMenu = document.getElementById("navMenu"); 

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (mobileMenu && mobileMenu.classList.contains("show")) return; 

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add("header-hidden");
    } else {
        navbar.classList.remove("header-hidden");
    }
    lastScrollTop = scrollTop;
});

// ================= ĐÓNG/MỞ MENU MOBILE =================
function toggleMobileMenu() {
    const menu = document.getElementById("navMenu");
    const btn = document.getElementById("mobileMenuBtn");
    const icon = btn.querySelector("i");
    const overlay = document.getElementById("menuOverlay");

    menu.classList.toggle("show"); 
    overlay.classList.toggle("show"); 

    if (menu.classList.contains("show")) { 
        icon.className = "fa-solid fa-xmark"; 
    } else { 
        icon.className = "fa-solid fa-bars"; 
    }
}

document.querySelectorAll(".cls-nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navMenu").classList.remove("show");
        document.getElementById("menuOverlay").classList.remove("show");
        const btn = document.getElementById("mobileMenuBtn");
        if(btn) btn.querySelector("i").className = "fa-solid fa-bars";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "") currentPath = "trangchu.html"; 
    const navLinks = document.querySelectorAll(".cls-nav-link");
    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === currentPath) {
            link.classList.add("active");
        }
    });
});

// ================= LOGIC TÌM KIẾM VÀ LỌC DANH SÁCH =================
// Hàm gộp chung 3 bộ lọc: Ô tìm kiếm, Combobox Cấp bậc, Combobox Năm sinh
function applyFilters() {
    const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    const filterCapVal = document.getElementById("filterCap").value;
    const filterNamSinhVal = document.getElementById("filterNamSinh").value;

    currentFilteredList = danhSachGoc.filter(ht => {
        let matchKeyword = true;
        if (keyword !== "") {
            matchKeyword = (ht.thanhHoTen && ht.thanhHoTen.toLowerCase().includes(keyword)) || 
                           (ht.chucVu && ht.chucVu.toLowerCase().includes(keyword)) || 
                           (ht.cap && ht.cap.toLowerCase().includes(keyword)) || 
                           (ht.sdt && ht.sdt.includes(keyword));
        }

        let matchCap = true;
        if (filterCapVal !== "all") matchCap = (ht.cap === filterCapVal);

        let matchNam = true;
        if (filterNamSinhVal !== "all") {
            let birthYear = "";
            if (ht.ngaySinh && ht.ngaySinh.includes("/")) birthYear = ht.ngaySinh.split("/")[2];
            matchNam = (birthYear === filterNamSinhVal);
        }

        return matchKeyword && matchCap && matchNam;
    });

    currentPage = 1; // Reset về trang 1 khi lọc
    hienThiDanhSach(currentFilteredList);
}

// Bắt sự kiện gõ phím vào ô tìm kiếm
document.getElementById("searchInput").addEventListener("input", applyFilters);


// ================= HIỂN THỊ DANH SÁCH HT (CHUYỂN ĐỔI GRID/TABLE) =================
function chuyenCheDoXem(mode) {
    currentViewMode = mode;
    
    // Nổi bật nút bấm
    document.getElementById("btnViewGrid").classList.remove("active");
    document.getElementById("btnViewTable").classList.remove("active");
    if(mode === 'grid') document.getElementById("btnViewGrid").classList.add("active");
    else document.getElementById("btnViewTable").classList.add("active");

    hienThiDanhSach(currentFilteredList);
}

// Hàm render theo màu badge cấp
function getBadgeClass(cap) {
    if(cap === "Huynh Trưởng Cấp 2") return "badge-cap2";
    if(cap === "Huynh Trưởng Cấp 1") return "badge-cap1";
    if(cap === "Dự Trưởng") return "badge-dt";
    return "bg-secondary"; // Mặc định
}

function getRowClass(cap) {
    if(cap === "Huynh Trưởng Cấp 2") return "row-cap2";
    if(cap === "Huynh Trưởng Cấp 1") return "row-cap1";
    if(cap === "Dự Trưởng") return "row-dt";
    return "";
}

function hienThiDanhSach(list) {
    const gridContainer = document.getElementById("htGrid");
    const tableContainer = document.getElementById("htTableContainer");
    const tbody = document.getElementById("htTableBody");
    const msgEmpty = document.getElementById("noResultMessage");

    gridContainer.innerHTML = "";
    tbody.innerHTML = "";

    if (list.length === 0) {
        gridContainer.classList.add("d-none");
        tableContainer.classList.add("d-none");
        msgEmpty.classList.remove("d-none");
        document.getElementById("paginationControls").innerHTML = "";
        return;
    } else {
        msgEmpty.classList.add("d-none");
    }

    // Logic Phân Trang
    const totalPages = Math.ceil(list.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedList = list.slice(startIdx, endIdx);

    const prepareImageTag = (ht, isTable = false) => {
        let avatarSrc = defaultAvatar;
        let isLocalName = false;
        if (ht.hinhAnhUrl) {
            if (ht.hinhAnhUrl.startsWith("http://") || ht.hinhAnhUrl.startsWith("https://")) avatarSrc = ht.hinhAnhUrl;
            else { avatarSrc = `/img/${ht.hinhAnhUrl}.jpg`; isLocalName = true; }
        }
        const imgClass = isTable ? "tb-avatar" : "avatar";
        return `<img class="${imgClass}" src="${avatarSrc}" alt="${ht.thanhHoTen}" 
                onerror="if(!${isLocalName}){this.src='${defaultAvatar}'; return;} 
                         const exts = ['.png', '.jpeg', '.webp', '.JPG', '.PNG', '.JPEG']; 
                         let step = parseInt(this.getAttribute('data-step') || '0');
                         if(step < exts.length){ this.setAttribute('data-step', step+1); this.src='/img/${ht.hinhAnhUrl}'+exts[step]; } 
                         else { this.src='${defaultAvatar}'; this.onerror=null; }" data-step="0">`;
    };

    if (currentViewMode === 'grid') {
        gridContainer.classList.remove("d-none");
        tableContainer.classList.add("d-none");

        paginatedList.forEach((ht, index) => {
            const actualIndex = startIdx + index + 1; // Số thứ tự thực tế
            const card = document.createElement("div");
            card.className = "ht-card";
            card.innerHTML = `
                <div class="badge-stt">${actualIndex}</div>
                ${prepareImageTag(ht)}
                <div class="name">${ht.thanhHoTen}</div>
                <div class="chuc-vu">${ht.chucVu}</div>
                <div class="cap ${getBadgeClass(ht.cap)}">${ht.cap}</div>
                <div class="info-row"><i class="fa-solid fa-cake-candles"></i> ${ht.ngaySinh}</div>
                <div class="info-row"><i class="fa-solid fa-phone"></i> ${ht.sdt}</div>
            `;
            card.addEventListener("click", () => moModalChiTietHT(ht, card.querySelector('img').src));
            gridContainer.appendChild(card);
        });

    } else {
        gridContainer.classList.add("d-none");
        tableContainer.classList.remove("d-none");

        paginatedList.forEach((ht, index) => {
            const actualIndex = startIdx + index + 1;
            const tr = document.createElement("tr");
            tr.className = getRowClass(ht.cap);
            tr.innerHTML = `
                <td style="text-align: center;">${actualIndex}</td>
                <td><div class="d-flex align-items-center gap-3">${prepareImageTag(ht, true)} <span class="tb-name">${ht.thanhHoTen}</span></div></td>
                <td class="tb-chucvu">${ht.chucVu}</td>
                <td><span class="cap ${getBadgeClass(ht.cap)}" style="margin:0;">${ht.cap}</span></td>
                <td style="text-align: center; color: #475569; font-weight: 600;">${ht.ngaySinh}</td>
                <td style="text-align: right; color: #0284c7; font-weight: bold;">${ht.sdt}</td>
            `;
            tr.addEventListener("click", () => moModalChiTietHT(ht, tr.querySelector('img').src));
            tbody.appendChild(tr);
        });
    }

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const container = document.getElementById("paginationControls");
    container.innerHTML = "";
    if (totalPages <= 1) return;

    let html = `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : `onclick="changePage(${currentPage - 1})"`}><i class="fa-solid fa-chevron-left"></i></button>`;

    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) html += `<button class="page-btn active">${i}</button>`;
        else html += `<button class="page-btn" onclick="changePage(${i})">${i}</button>`;
    }

    html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : `onclick="changePage(${currentPage + 1})"`}><i class="fa-solid fa-chevron-right"></i></button>`;
    container.innerHTML = html;
}

function changePage(page) {
    const totalPages = Math.ceil(currentFilteredList.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        hienThiDanhSach(currentFilteredList);
        
        // Cuộn lên mượt mà
        const topOfGrid = document.querySelector(".toolbar-container").offsetTop - 100;
        window.scrollTo({ top: topOfGrid, behavior: 'smooth' });
    }
}

// ================= LOGIC TRANG LỊCH TRỰC (GIỮ NGUYÊN) =================
function taoKhungCaTrucMau() { return [ { category: "Trực Máy", slots: [ { time: "CN lễ 3", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 2", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 3", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 4", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 5", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 6", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 7", persons: ["Chưa phân công"], dones: [false] } ] }, { category: "Đọc Sách", slots: [ { time: "CN lễ nhì", persons: ["Chưa phân công"], dones: [false] }, { time: "CN lễ 3", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 4", persons: ["Chưa phân công"], dones: [false] } ] }, { category: "Giúp Lễ", slots: [ { time: "CN", persons: ["Chưa phân công"], dones: [false] }, { time: "Thứ 4", persons: ["Chưa phân công"], dones: [false] } ] } ]; }

function tinhNhomTrucChoTuan(weekId) { const shift = (weekId - 39) % 4; let groupNumber = 3 + shift; while (groupNumber < 1) groupNumber += 4; while (groupNumber > 4) groupNumber -= 4; return groupNumber; }

let dutyHistoryData = {}; let groupsData = {};
for (let g = 1; g <= 4; g++) { groupsData[g] = { groupName: hardcodedGroupEmails[g].groupName, leaderName: hardcodedGroupEmails[g].leaderName, leaderEmails: hardcodedGroupEmails[g].leaderEmails || [], members: [] }; }

db.ref("groupsData").on("value", (snapshot) => { const data = snapshot.val(); if (data) { for (let g = 1; g <= 4; g++) { if (data[g]) { groupsData[g].groupName = data[g].groupName || hardcodedGroupEmails[g].groupName; groupsData[g].leaderName = data[g].leaderName || hardcodedGroupEmails[g].leaderName; groupsData[g].members = data[g].members || []; } } } hienThiPhienTruc(); });
db.ref("dutyHistory").on("value", (snapshot) => { const data = snapshot.val(); if (data) { dutyHistoryData = data; } hienThiPhienTruc(); });

let currentSelectedWeek = 39; let currentAssignedGroup = 3;
let currentEditingSlot = { catIdx: null, slotIdx: null, selectedMembers: [] };

function timIdTuanHienTai() { const now = new Date(); let targetDate = new Date(now); if (now.getDay() === 6 && now.getHours() >= 6) { targetDate.setDate(targetDate.getDate() + 1); } targetDate.setHours(0, 0, 0, 0); for (let item of danhSachTuanPhungVu) { const parts = item.dates.split("-").map(p => p.trim()); if (parts.length === 2) { const endMatch = parts[1].match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/); if (endMatch) { const endYear = parseInt(endMatch[3]); const endMonth = parseInt(endMatch[2]) - 1; const endDay = parseInt(endMatch[1]); const endDate = new Date(endYear, endMonth, endDay, 23, 59, 59); let startYear = endYear; const startParts = parts[0].split("/"); let startMonth = parseInt(startParts[1]) - 1; let startDay = parseInt(startParts[0]); if (startParts.length === 3) { startYear = parseInt(startParts[2]); } else if (startMonth > endMonth) { startYear = endYear - 1; } const startDate = new Date(startYear, startMonth, startDay, 0, 0, 0); if (targetDate >= startDate && targetDate <= endDate) { return item.id; } } } } return 39; }

function khoiTaoDanhSachTuanPhungVu() { currentSelectedWeek = timIdTuanHienTai(); currentAssignedGroup = tinhNhomTrucChoTuan(currentSelectedWeek); const select = document.getElementById("liturgicalWeekSelect"); select.innerHTML = ""; danhSachTuanPhungVu.forEach(w => { const opt = document.createElement("option"); opt.value = w.id; opt.innerText = `${w.name} (${w.dates})`; select.appendChild(opt); }); select.value = currentSelectedWeek; capNhatThongTinTuanHienTai(); }
function capNhatThongTinTuanHienTai() { currentAssignedGroup = tinhNhomTrucChoTuan(currentSelectedWeek); const currentWeekObj = danhSachTuanPhungVu.find(w => w.id === currentSelectedWeek); if (currentWeekObj) { document.getElementById("weekDateRangeDisplay").value = `📅 ${currentWeekObj.dates} (${currentWeekObj.season})`; } document.getElementById("currentGroupDisplay").value = `Nhóm ${currentAssignedGroup} Trực`; }

function chuyenTuan() { currentSelectedWeek = parseInt(document.getElementById("liturgicalWeekSelect").value); capNhatThongTinTuanHienTai(); hienThiPhienTruc(); }
function layDuLieuPhienTruc() { const dutyKey = `lit_w${currentSelectedWeek}_g${currentAssignedGroup}`; if (!dutyHistoryData[dutyKey]) { dutyHistoryData[dutyKey] = taoKhungCaTrucMau(); } return dutyHistoryData[dutyKey]; }

function hienThiPhienTruc() { const container = document.getElementById("dutyContent"); container.innerHTML = ""; const schedule = layDuLieuPhienTruc(); const groupInfo = groupsData[currentAssignedGroup] || { groupName: `Nhóm ${currentAssignedGroup}`, leaderName: "Chưa đặt", members: [] }; const currentWeekObj = danhSachTuanPhungVu.find(w => w.id === currentSelectedWeek); const headerDiv = document.createElement("div"); headerDiv.className = "duty-header-info"; headerDiv.innerHTML = ` <div class="liturgical-title"> <i class="fa-solid fa-cross"></i> ${currentWeekObj ? currentWeekObj.name.toUpperCase() : ''} </div> <div> <span class="group-duty-title"> <i class="fa-solid fa-users"></i> PHÂN CÔNG: ${groupInfo.groupName.toUpperCase()} </span> </div> <div style="color: #64748b; font-size: 14px;"> <div><strong>Nhóm Trưởng:</strong> ${groupInfo.leaderName}</div> <div><strong>Thời gian:</strong> ${currentWeekObj ? currentWeekObj.dates : ''} | <strong>Mùa:</strong> ${currentWeekObj ? currentWeekObj.season : ''}</div> </div> `; container.appendChild(headerDiv); const coQuyenSua = (currentUser.role === "admin") || (currentUser.role === "leader" && currentUser.leaderOfGroup === currentAssignedGroup); const isAdmin = (currentUser.role === "admin"); schedule.forEach((cat, cIdx) => { const groupDiv = document.createElement("div"); groupDiv.className = "duty-group"; groupDiv.innerHTML = `<div class="duty-title"><i class="fa-solid fa-layer-group"></i> ${cat.category}</div>`; cat.slots.forEach((slot, sIdx) => { let personList = []; let doneList = []; if (Array.isArray(slot.persons)) { personList = slot.persons; doneList = Array.isArray(slot.dones) ? slot.dones : personList.map(() => false); } else if (slot.person) { personList = slot.person.split(" - ").map(p => p.trim()); doneList = [slot.done || false, false]; } else { personList = ["Chưa phân công"]; doneList = [false]; } let personsHTML = ""; if (personList.length === 1 && personList[0] === "Chưa phân công") { personsHTML = `<span style="color: #94a3b8; font-style: italic;">Chưa phân công</span>`; } else { personsHTML = personList.map((pName, pIdx) => { const isDone = doneList[pIdx] || false; return ` <label class="person-check-badge"> <input type="checkbox" ${isDone ? "checked" : ""} ${!isAdmin ? "disabled title='Chỉ Admin mới có quyền xác nhận hoàn thành'" : ""} onchange="toggleIndividualCheck(${cIdx}, ${sIdx}, ${pIdx})"> <span style="${isDone ? 'text-decoration: line-through; opacity: 0.5; color:#94a3b8;' : 'color:#1e293b; font-weight:600;'}">${pName}</span> </label> `; }).join(""); } let actionBtn = ""; if (coQuyenSua) { actionBtn = `<button class="duty-action-btn" onclick="moModalChonNguoiTruc(${cIdx}, ${sIdx})"><i class="fa-solid fa-hand-pointer"></i> Phân công</button>`; } const item = document.createElement("div"); item.className = "duty-item"; item.innerHTML = ` <span class="duty-label-time">${slot.time}:</span> <div class="duty-persons-container">${personsHTML}</div> ${actionBtn} `; groupDiv.appendChild(item); }); container.appendChild(groupDiv); }); }

function toggleIndividualCheck(cIdx, sIdx, pIdx) { if (currentUser.role !== "admin") { alert("Chỉ Admin mới có quyền xác nhận hoàn thành ca trực!"); hienThiPhienTruc(); return; } const dutyKey = `lit_w${currentSelectedWeek}_g${currentAssignedGroup}`; const slot = dutyHistoryData[dutyKey][cIdx].slots[sIdx]; if (!Array.isArray(slot.dones)) slot.dones = [false, false]; slot.dones[pIdx] = !slot.dones[pIdx]; db.ref(`dutyHistory/${dutyKey}`).set(dutyHistoryData[dutyKey]); }

function moModalChonNguoiTruc(cIdx, sIdx) { currentEditingSlot = { catIdx: cIdx, slotIdx: sIdx, selectedMembers: [] }; const dutyKey = `lit_w${currentSelectedWeek}_g${currentAssignedGroup}`; const slotData = dutyHistoryData[dutyKey][cIdx].slots[sIdx]; const catName = dutyHistoryData[dutyKey][cIdx].category; document.getElementById("pickModalTitle").innerText = `Phân công: ${catName} (${slotData.time})`; const container = document.getElementById("memberPickListContainer"); container.innerHTML = ""; const membersOfThisGroup = groupsData[currentAssignedGroup].members || []; let currentPersons = []; if (Array.isArray(slotData.persons)) currentPersons = slotData.persons; else if (slotData.person) currentPersons = slotData.person.split(" - ").map(p => p.trim()); if (membersOfThisGroup.length === 0) { container.innerHTML = `<div style="text-align:center; color:#999; padding:20px;">Nhóm này chưa có thành viên (Admin chưa chia trên web).</div>`; } else { membersOfThisGroup.forEach(memName => { const item = document.createElement("div"); item.className = "member-pick-item"; item.innerHTML = `<span><i class="fa-solid fa-user me-2"></i>${memName}</span><i class="fa-regular fa-circle-check check-icon" style="color:#cbd5e1;"></i>`; if (currentPersons.includes(memName)) { item.classList.add("selected"); item.querySelector(".check-icon").className = "fa-solid fa-circle-check check-icon"; item.querySelector(".check-icon").style.color = "#0284c7"; currentEditingSlot.selectedMembers.push(memName); } item.onclick = function () { if (currentEditingSlot.selectedMembers.includes(memName)) { currentEditingSlot.selectedMembers = currentEditingSlot.selectedMembers.filter(m => m !== memName); item.classList.remove("selected"); item.querySelector(".check-icon").className = "fa-regular fa-circle-check check-icon"; item.querySelector(".check-icon").style.color = "#cbd5e1"; } else { currentEditingSlot.selectedMembers.push(memName); item.classList.add("selected"); item.querySelector(".check-icon").className = "fa-solid fa-circle-check check-icon"; item.querySelector(".check-icon").style.color = "#0284c7"; } capNhatResultInput(); }; container.appendChild(item); }); } capNhatResultInput(); document.getElementById("modalDutyPick").classList.add("active"); }
function capNhatResultInput() { document.getElementById("selectedPersonResult").value = currentEditingSlot.selectedMembers.join(" - ") || "Chưa phân công"; }

function luuPhanCongCaTruc() { const dutyKey = `lit_w${currentSelectedWeek}_g${currentAssignedGroup}`; const selected = currentEditingSlot.selectedMembers; if (selected.length === 0) { dutyHistoryData[dutyKey][currentEditingSlot.catIdx].slots[currentEditingSlot.slotIdx].persons = ["Chưa phân công"]; dutyHistoryData[dutyKey][currentEditingSlot.catIdx].slots[currentEditingSlot.slotIdx].dones = [false]; } else { dutyHistoryData[dutyKey][currentEditingSlot.catIdx].slots[currentEditingSlot.slotIdx].persons = selected; dutyHistoryData[dutyKey][currentEditingSlot.catIdx].slots[currentEditingSlot.slotIdx].dones = selected.map(() => false); } db.ref(`dutyHistory/${dutyKey}`).set(dutyHistoryData[dutyKey]); dongModalById("modalDutyPick"); }

function moModalAdminChiaNhom() { taiThongTinNhomAdmin(); document.getElementById("modalAdminGroups").classList.add("active"); }
function taiThongTinNhomAdmin() { const g = document.getElementById("adminSelectGroupTab").value; const currentGroup = groupsData[g] || { groupName: `Nhóm ${g}`, leaderName: "", members: [] }; document.getElementById("adminGroupNameInput").value = currentGroup.groupName || `Nhóm ${g}`; document.getElementById("adminLeaderNameInput").value = currentGroup.leaderName || ""; const listContainer = document.getElementById("adminHTCheckList"); listContainer.innerHTML = ""; danhSachGoc.forEach(ht => { if (!ht.thanhHoTen) return; const parts = ht.thanhHoTen.split(" "); const shortName = parts.length > 2 ? `${parts[parts.length - 2]} ${parts[parts.length - 1]}` : ht.thanhHoTen; const isChecked = currentGroup.members && (currentGroup.members.includes(shortName) || currentGroup.members.includes(ht.thanhHoTen)); const item = document.createElement("label"); item.className = "admin-assign-item"; item.innerHTML = `<input type="checkbox" value="${shortName}" ${isChecked ? "checked" : ""}> <span>${ht.thanhHoTen} (${ht.chucVu})</span>`; listContainer.appendChild(item); }); }
function luuThongTinNhomAdmin() { const g = document.getElementById("adminSelectGroupTab").value; const groupName = document.getElementById("adminGroupNameInput").value.trim() || `Nhóm ${g}`; const leaderName = document.getElementById("adminLeaderNameInput").value.trim() || "Chưa có tên"; const checkboxes = document.querySelectorAll("#adminHTCheckList input[type='checkbox']:checked"); const members = Array.from(checkboxes).map(cb => cb.value); const updatedGroup = { groupName: groupName, leaderName: leaderName, members: members }; db.ref(`groupsData/${g}`).set(updatedGroup).then(() => { alert(`Đã lưu danh sách thành viên cho ${groupName} lên Firebase Cloud thành công!`); dongModalById("modalAdminGroups"); }).catch(err => alert("Lỗi lưu Firebase: " + err.message)); }

function moModalChiTietHT(ht, currentImgSrc) { document.getElementById("modalImg").src = currentImgSrc; document.getElementById("modalTen").innerText = ht.thanhHoTen; document.getElementById("modalMaHT").innerText = ht.maHT || (ht.hinhAnhUrl ? ht.hinhAnhUrl.toUpperCase() : "Chưa có"); document.getElementById("modalChucVu").innerText = ht.chucVu || "HT"; document.getElementById("modalCap").innerText = ht.cap || "Huynh Trưởng"; document.getElementById("modalNgaySinh").innerText = ht.ngaySinh || "Chưa cập nhật"; document.getElementById("modalSDT").innerText = ht.sdt || "Chưa cập nhật"; document.getElementById("modalDetail").classList.add("active"); document.body.style.overflow = "hidden"; }

function chuyenTab(tabId, btnElement) { 
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active")); 
    document.querySelectorAll(".view-section").forEach(s => s.classList.remove("active")); 
    btnElement.classList.add("active");
    document.getElementById(tabId).classList.add("active"); 
    if(tabId === 'tab-truc') hienThiPhienTruc(); 
}
function dongModalById(id) { const el = document.getElementById(id); if (el) el.classList.remove("active"); document.body.style.overflow = "auto"; }

// ================= TỰ ĐỘNG ĐÁNH DẤU TRANG HIỆN TẠI (ACTIVE MENU) CHỐNG LỖI =================
document.addEventListener("DOMContentLoaded", function () {
    // Lấy tên file của trang web hiện tại, bỏ qua các tham số (?id=...) hoặc hash (#)
    let currentPath = window.location.pathname.split("/").pop().split("?")[0].split("#")[0];
    
    // Mặc định nếu truy cập domain gốc hoặc file index thì coi như là trangchu.html
    if (currentPath === "" || currentPath === "index.html") {
        currentPath = "trangchu.html"; 
    }

    const navLinks = document.querySelectorAll(".cls-nav-link");
    
    navLinks.forEach(link => {
        // Gỡ tất cả active bị gán cứng
        link.classList.remove("active");
        
        let href = link.getAttribute("href");
        
        // So sánh linh hoạt kể cả khi server ẩn đuôi .html
        if (href === currentPath || href.replace('.html', '') === currentPath.replace('.html', '')) {
            link.classList.add("active");
        }
    });
});

// ================= FIX LỖI XOAY MÀN HÌNH (NGANG <-> DỌC) =================
// Tự động chuyển về dạng Card khi màn hình bị thu hẹp (xoay dọc)
window.addEventListener('resize', function() {
    // Nếu kích thước màn hình <= 768px (Điện thoại dọc) VÀ đang ở chế độ bảng
    if (window.innerWidth <= 768 && currentViewMode !== 'grid') {
        chuyenCheDoXem('grid'); // Ép vẽ lại sang dạng Card
    }
});