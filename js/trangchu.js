// Biến toàn cục lấy thông tin user từ LocalStorage
let currentUser = JSON.parse(localStorage.getItem("ht_user_session")) || { role: "viewer" };
let allNewsData = [];

// ================= SỰ KIỆN VUỐT ẨN/HIỆN THANH MENU =================
let lastScrollTop = 0;
const navbar = document.getElementById("mainHeader");
const mobileMenu = document.getElementById("navMenu"); 

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (mobileMenu && mobileMenu.classList.contains("show")) {
        return; 
    }

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

// Bấm vào link thì tự động đóng menu mobile
document.querySelectorAll(".cls-nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navMenu").classList.remove("show");
        document.getElementById("menuOverlay").classList.remove("show");
        const btn = document.getElementById("mobileMenuBtn");
        if(btn) btn.querySelector("i").className = "fa-solid fa-bars";
    });
});

// Hiệu ứng chuyển động khi kéo trang (Fade In)
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
});

// ================= KHỞI CHẠY TRANG & LOAD DỮ LIỆU =================
window.onload = function() {
    // 1. Cập nhật giao diện menu dựa theo trạng thái đăng nhập
    xacDinhQuyenTruyCap();

    // 2. Tải dữ liệu tin tức từ Firebase (Biến db đã được cấu hình từ file firebase-config.js)
    db.ref("tinTucSuKien").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
            allNewsData = Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse();
        } else {
            allNewsData = [];
        }
        hienThiTinNoiBat();
    });
};

// ================= XỬ LÝ QUYỀN TRUY CẬP VÀ HIỂN THỊ MENU =================
function xacDinhQuyenTruyCap() {
    const btnGoToLogin = document.getElementById("btnGoToLogin");
    const userInfoNav = document.getElementById("userInfoNav");
    const btnManageFeatured = document.getElementById("btnManageFeatured");
    
    if (currentUser && currentUser.email) {
        // Đã đăng nhập: Ẩn nút Login, Hiện khung Avatar
        if(btnGoToLogin) btnGoToLogin.classList.add("d-none");
        if(userInfoNav) {
            userInfoNav.classList.remove("d-none");
            userInfoNav.classList.add("d-flex");
        }
        
        if(document.getElementById("userNameDisplay")) document.getElementById("userNameDisplay").innerText = currentUser.name;
        if(document.getElementById("userAvatarMini")) document.getElementById("userAvatarMini").src = currentUser.picture;
        
        const badge = document.getElementById("roleBadge");
        if(badge) {
            badge.className = "badge"; // Reset class
            if (currentUser.role === "admin") {
                badge.classList.add("bg-danger"); 
                badge.innerText = "Admin";
                if(btnManageFeatured) btnManageFeatured.style.display = "inline-block";
            } else {
                badge.classList.add("bg-secondary"); 
                badge.innerText = "Người xem";
                if(btnManageFeatured) btnManageFeatured.style.display = "none";
            }
        }
    } else {
        // Chưa đăng nhập: Hiện nút Login, Ẩn khung Avatar
        if(btnGoToLogin) btnGoToLogin.classList.remove("d-none");
        if(userInfoNav) {
            userInfoNav.classList.remove("d-flex");
            userInfoNav.classList.add("d-none");
        }
        if(btnManageFeatured) btnManageFeatured.style.display = "none";
    }
}

function xuLyDangXuat() {
    currentUser = { role: "viewer" };
    localStorage.removeItem("ht_user_session");
    alert("Đã đăng xuất!");
    window.location.reload(); 
}

// ================= XỬ LÝ BÀI VIẾT NỔI BẬT =================
function hienThiTinNoiBat() {
    const grid = document.getElementById("featuredNewsGrid");
    grid.innerHTML = "";

    if (allNewsData.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center text-muted" style="font-style:italic;">Hiện chưa có bài viết nào.</div>`;
        return;
    }

    let featuredPosts = allNewsData.filter(post => post.isFeatured === true);

    if (featuredPosts.length === 0) {
        featuredPosts = allNewsData.slice(0, 3);
    } else {
        featuredPosts = featuredPosts.slice(0, 3);
    }

    featuredPosts.forEach(item => {
        let contentText = item.content || ""; 
        let cleanExcerpt = contentText.replace(/<[^>]*>?/gm, '');
        
        grid.innerHTML += `
            <div class="col-md-6 col-lg-4" style="animation: fadeUpCustom 0.8s ease-out forwards; opacity: 0;">
                <a href="tintuc.html?id=${item.id}" class="news-card-index">
                    <img src="${item.imgUrl || '/img/logo_app.jpg'}" class="news-img-index" onerror="this.src='/img/logo_app.jpg'">
                    <div class="news-body-index">
                        <h3 class="news-title-index">${item.title}</h3>
                        <div class="news-date-index"><i class="fa-solid fa-clock text-primary"></i> ${item.timestamp}</div>
                        <div class="news-excerpt-index">${cleanExcerpt}</div>
                    </div>
                </a>
            </div>
        `;
    });
}

// ================= CHỨC NĂNG CÀI ĐẶT BÀI NỔI BẬT =================
function moModalCaiDat() {
    const listDiv = document.getElementById("adminPostList");
    listDiv.innerHTML = "";

    allNewsData.forEach(item => {
        const isChecked = item.isFeatured ? "checked" : "";
        listDiv.innerHTML += `
            <label class="post-list-item">
                <input type="checkbox" class="form-check-input chk-featured" value="${item.id}" ${isChecked} onchange="kiemTraSoLuongChon(this)">
                <img src="${item.imgUrl || '/img/logo_app.jpg'}" onerror="this.src='/img/logo_app.jpg'">
                <div>
                    <strong>${item.title}</strong>
                    <span>${item.timestamp}</span>
                </div>
            </label>
        `;
    });

    document.getElementById("modalFeatured").classList.add("active");
}

function dongModalCaiDat() {
    document.getElementById("modalFeatured").classList.remove("active");
}

function kiemTraSoLuongChon(checkbox) {
    const checkedBoxes = document.querySelectorAll(".chk-featured:checked");
    if (checkedBoxes.length > 3) {
        alert("Bạn chỉ được chọn tối đa 3 bài viết nổi bật!");
        checkbox.checked = false;
    }
}

function luuCaiDatNoiBat() {
    const checkboxes = document.querySelectorAll(".chk-featured");
    
    checkboxes.forEach(chk => {
        const postId = chk.value;
        const isFeatured = chk.checked;
        db.ref(`tinTucSuKien/${postId}`).update({ isFeatured: isFeatured });
    });

    alert("Đã cập nhật danh sách bài viết nổi bật thành công!");
    dongModalCaiDat();
}

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