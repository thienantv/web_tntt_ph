// ================= ĐIỀN API KEY IMGBB CỦA BẠN VÀO ĐÂY =================
const IMGBB_API_KEY = "94248040acc23e1662ae76c2c0724b6a"; 
const GOOGLE_CLIENT_ID = "262126423881-einke9pok3r8at0d9hrnli04klf68s9q.apps.googleusercontent.com";
const ADMIN_EMAILS = ["htam00521@gmail.com", "yinsnhuw29@gmail.com"]; 

let currentUser = JSON.parse(localStorage.getItem("ht_user_session")) || { role: "viewer" };
let newsData = [];
let editingPostId = null;
let currentViewingPostId = null; 
let replyingToParentId = null; 

// ================= BIẾN PHÂN TRANG =================
let currentPage = 1;
const postsPerPage = 6; // Số lượng bài viết hiển thị trên 1 trang (bạn có thể đổi số này)

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

// Bấm vào link thì đóng menu
document.querySelectorAll(".cls-nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navMenu").classList.remove("show");
        document.getElementById("menuOverlay").classList.remove("show");
        const btn = document.getElementById("mobileMenuBtn");
        btn.querySelector("i").className = "fa-solid fa-bars";
    });
});

window.onload = function() {
    xacDinhQuyenTruyCap();

    db.ref("tinTucSuKien").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
            newsData = Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse();
        } else {
            newsData = [];
        }
        renderNews();

        if (currentViewingPostId) capNhatLikeVaComment(currentViewingPostId);

        const urlParams = new URLSearchParams(window.location.search);
        const postIdFromUrl = urlParams.get('id');
        if (postIdFromUrl && !currentViewingPostId) {
            setTimeout(() => {
                const postExists = newsData.find(p => p.id === postIdFromUrl);
                if(postExists) xemChiTietBaiViet(postIdFromUrl);
            }, 500);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });
};

function xacDinhQuyenTruyCap() {
    const btnGoToLogin = document.getElementById("btnGoToLogin");
    const userInfoNav = document.getElementById("userInfoNav");
    const btnDangBai = document.getElementById("btnDangBai");
    
    // Nếu có email tức là đã đăng nhập
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
            badge.className = "badge"; // Reset class
            if (currentUser.role === "admin") {
                badge.classList.add("bg-danger"); 
                badge.innerText = "Admin";
                if(btnDangBai) btnDangBai.style.display = "inline-flex";
            } else {
                badge.classList.add("bg-secondary"); 
                badge.innerText = "Người xem";
                if(btnDangBai) btnDangBai.style.display = "none";
            }
        }
    } else {
        // Chưa đăng nhập: Hiện nút "Đăng nhập", ẩn thông tin User
        if(btnGoToLogin) btnGoToLogin.classList.remove("d-none");
        if(userInfoNav) {
            userInfoNav.classList.remove("d-flex");
            userInfoNav.classList.add("d-none");
        }
        if(btnDangBai) btnDangBai.style.display = "none";
    }
}

function xuLyDangXuat() {
    currentUser = { role: "viewer" };
    localStorage.removeItem("ht_user_session");
    alert("Đã đăng xuất!");
    window.location.reload(); 
}

// ================= XỬ LÝ PHÂN TRANG VÀ BÀI VIẾT =================
function renderNews() {
    const grid = document.getElementById("newsGrid");
    grid.innerHTML = "";

    if(newsData.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center text-muted py-5" style="background: rgba(255,255,255,0.8); border-radius: 20px;">Hiện tại chưa có bài viết hay thông báo nào.</div>`;
        document.getElementById("paginationControls").innerHTML = "";
        return;
    }

    // Tính toán phân trang
    const totalPages = Math.ceil(newsData.length / postsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    // Cắt lấy dữ liệu của trang hiện tại
    const paginatedData = newsData.slice(startIndex, endIndex);

    paginatedData.forEach(item => {
        let actionsHtml = "";
        if (currentUser.role === 'admin') {
            actionsHtml = `
                <div class="news-footer-actions">
                    <button class="btn-edit-news" onclick="moModalSuaBai('${item.id}', event)"><i class="fa-solid fa-pen me-1"></i> Sửa</button>
                    <button class="btn-delete-news" onclick="xoaBaiViet('${item.id}', event)"><i class="fa-solid fa-trash me-1"></i> Xóa</button>
                </div>
            `;
        }

        let cleanExcerpt = item.content.replace(/<[^>]*>?/gm, '');
        
        const countLikes = Object.keys(item.likes || {}).length;
        let countComments = 0;
        const commentsObj = item.comments || {};
        Object.keys(commentsObj).forEach(k => {
            countComments++;
            if (commentsObj[k].replies) countComments += Object.keys(commentsObj[k].replies).length;
        });

        grid.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="news-card" onclick="xemChiTietBaiViet('${item.id}')">
                    <img src="${item.imgUrl || '/img/logo_app.jpg'}" class="news-img" alt="Hình ảnh bài viết" onerror="this.src='/img/logo_app.jpg'">
                    <div class="news-body">
                        <h3 class="news-title">${item.title}</h3>
                        <div class="news-date"><i class="fa-solid fa-clock text-primary"></i> ${item.timestamp}</div>
                        <div class="news-stats">
                            <i class="fa-solid fa-heart text-danger me-1"></i> ${countLikes} 
                            <i class="fa-solid fa-comment text-primary ms-3 me-1"></i> ${countComments}
                        </div>
                        <div class="news-excerpt">${cleanExcerpt}</div>
                        <div class="news-footer">
                            <button class="btn-readmore">Đọc tiếp <i class="fa-solid fa-arrow-right ms-1"></i></button>
                            ${actionsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    renderPagination(totalPages);
}

// Xử lý tạo nút bấm phân trang đồng bộ giao diện
function renderPagination(totalPages) {
    const container = document.getElementById("paginationControls");
    container.innerHTML = "";

    // Gắn class container thiết kế mới
    container.className = "pagination-container";

    // Nếu chỉ có 1 trang thì không hiện nút phân trang
    if (totalPages <= 1) return;

    let html = "";
    
    // Nút Previous
    html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : `onclick="changePage(${currentPage - 1})"`}>
                <i class="fa-solid fa-chevron-left"></i>
             </button>`;

    // Các trang số
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<button class="page-btn active">${i}</button>`;
        } else {
            html += `<button class="page-btn" onclick="changePage(${i})">${i}</button>`;
        }
    }

    // Nút Next
    html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : `onclick="changePage(${currentPage + 1})"`}>
                <i class="fa-solid fa-chevron-right"></i>
             </button>`;

    container.innerHTML = html;
}

// Sự kiện khi bấm chuyển trang
function changePage(page) {
    const totalPages = Math.ceil(newsData.length / postsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderNews();
        
        // Vuốt màn hình mượt mà lên vị trí tiêu đề danh sách tin tức
        const topOfGrid = document.getElementById("danhSachTinTucTitle").offsetTop - 120;
        window.scrollTo({ top: topOfGrid, behavior: 'smooth' });
    }
}

// ================= TẢI ẢNH LÊN IMGBB =================
async function taiAnhLen(inputElement, type) {
    if (IMGBB_API_KEY === "DÁN_MÃ_API_CỦA_BẠN_VÀO_ĐÂY") {
        alert("Bạn chưa điền mã API ImgBB vào mã nguồn.");
        inputElement.value = ""; return;
    }
    
    const files = inputElement.files;
    if(!files || files.length === 0) return;

    if(type === 'bia') {
        document.getElementById("loadingBia").style.display = "block";
        const formData = new FormData(); 
        formData.append("image", files[0]);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
            const data = await response.json();
            if(data.success) document.getElementById("inputNewsImg").value = data.data.url;
            else alert("Tải ảnh thất bại: " + data.error.message); 
        } catch (err) { alert("Lỗi kết nối mạng: " + err.message); } 
        finally {
            document.getElementById("loadingBia").style.display = "none";
            inputElement.value = ""; 
        }
    } 
    else if (type === 'chen') {
        const loadingEl = document.getElementById("loadingChen");
        loadingEl.style.display = "inline-block";
        
        const isMultiple = files.length > 1;
        let captionHtml = "";
        
        if (!isMultiple) {
            let caption = prompt("Nhập chú thích cho hình ảnh này (để trống nếu không cần):");
            if (caption && caption.trim() !== "") captionHtml = `<figcaption>${caption.trim()}</figcaption>`; 
        }

        let textarea = document.getElementById("inputNewsContent");
        let combinedHtml = "\n";

        for (let i = 0; i < files.length; i++) {
            loadingEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-1"></i>Đang tải ${i+1}/${files.length}...`;
            const formData = new FormData(); 
            formData.append("image", files[i]);
            
            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
                const data = await response.json();
                if(data.success) {
                    combinedHtml += `<figure class="article-figure"><img src="${data.data.url}" alt="Ảnh chi tiết">${captionHtml}</figure>\n`;
                } else alert(`Tải ảnh thứ ${i+1} thất bại: ` + data.error.message); 
            } catch (err) { alert("Lỗi kết nối mạng: " + err.message); }
        }

        if (combinedHtml.trim() !== "\n" && combinedHtml.trim() !== "") {
            let startPos = textarea.selectionStart;
            let endPos = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, startPos) + combinedHtml + textarea.value.substring(endPos, textarea.value.length);
            textarea.focus();
        }

        loadingEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-1"></i>Đang tải...`;
        loadingEl.style.display = "none";
        inputElement.value = "";
    }
}

// ================= XỬ LÝ CHÈN LINK VIDEO TỰ ĐỘNG =================
function chenVideo() {
    let url = prompt("Dán link video vào đây (Hỗ trợ Facebook, YouTube, Google Drive):");
    if (!url || url.trim() === "") return;
    url = url.trim();
    
    let embedCode = "";
    
    if (url.startsWith("<iframe") || url.startsWith("<div")) {
        embedCode = `\n<div class="video-container" style="padding-bottom:0; height:auto;">\n${url}\n</div>\n`;
    } else if (url.includes("facebook.com") || url.includes("fb.watch")) {
        let encodedUrl = encodeURIComponent(url);
        embedCode = `\n<div class="video-container" style="padding-bottom:0; height: 400px; max-height: 70vh;">
            <iframe src="https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false" width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>\n`;
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let videoId = "";
        if (url.includes("v=")) videoId = url.split("v=")[1].split("&")[0];
        else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1].split("?")[0];
        if (videoId) embedCode = `\n<div class="video-container"><iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe></div>\n`;
    } else if (url.endsWith(".mp4") || url.includes(".mp4?")) {
        embedCode = `\n<div class="video-container" style="padding-bottom: 0; height: auto;"><video controls style="width:100%; border-radius:14px;"><source src="${url}" type="video/mp4">Trình duyệt không hỗ trợ xem video.</video></div>\n`;
    } else if (url.includes("drive.google.com/file/d/")) {
        let fileId = url.split("/d/")[1].split("/")[0];
        embedCode = `\n<div class="video-container"><iframe src="https://drive.google.com/file/d/${fileId}/preview" allowfullscreen></iframe></div>\n`;
    } else {
        let proceed = confirm("Hệ thống không nhận diện được link. Bạn có muốn chèn như một link liên kết bình thường không?");
        if(proceed) embedCode = `\n<a href="${url}" target="_blank" style="color: #0284c7; font-weight: bold; text-decoration: underline;">👉 Bấm vào đây để xem nội dung</a>\n`;
        else return;
    }

    if (embedCode !== "") {
        let textarea = document.getElementById("inputNewsContent");
        let startPos = textarea.selectionStart;
        let endPos = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, startPos) + embedCode + textarea.value.substring(endPos, textarea.value.length);
        textarea.focus();
    }
}

// ================= TÍNH NĂNG LIKE & DANH SÁCH LIKE =================
function toggleLike() {
    if (!currentUser.email) return alert("Vui lòng đăng nhập để thả tim bài viết!");
    
    const encodedEmail = currentUser.email.replace(/\./g, ',');
    const post = newsData.find(p => p.id === currentViewingPostId);
    const isLiked = post && post.likes && post.likes[encodedEmail];
    
    if (isLiked) db.ref(`tinTucSuKien/${currentViewingPostId}/likes/${encodedEmail}`).remove();
    else db.ref(`tinTucSuKien/${currentViewingPostId}/likes/${encodedEmail}`).set({ name: currentUser.name, picture: currentUser.picture });
}

function moDanhSachLike() {
    const post = newsData.find(p => p.id === currentViewingPostId);
    if (!post) return;
    
    const likes = post.likes || {};
    const keys = Object.keys(likes);
    const container = document.getElementById("danhSachLikeContent");
    container.innerHTML = "";
    
    if (keys.length === 0) {
        container.innerHTML = `<div class="text-center text-muted py-3" style="font-size: 14px; font-style: italic;">Chưa có ai thả tim.</div>`;
    } else {
        keys.forEach(k => {
            const likeData = likes[k];
            let name = typeof likeData === 'object' ? likeData.name : "Người dùng ẩn danh";
            let pic = typeof likeData === 'object' ? likeData.picture : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
            container.innerHTML += `
                <div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                    <img src="${pic}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                    <span style="font-weight: 700; font-size: 14.5px; color: #1e293b;">${name}</span>
                </div>
            `;
        });
    }
    document.getElementById("modalDanhSachLike").classList.add("active");
}

function moKhungTraLoi(parentId, authorName) {
    replyingToParentId = parentId;
    document.getElementById("replyingIndicator").style.display = "inline-block";
    document.getElementById("replyingToName").innerText = authorName;
    const txtComment = document.getElementById("txtComment");
    txtComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
    txtComment.focus();
}

function huyTraLoi() {
    replyingToParentId = null;
    document.getElementById("replyingIndicator").style.display = "none";
    document.getElementById("txtComment").value = "";
    document.getElementById("txtComment").style.height = '40px';
}

function guiBinhLuan() {
    if (!currentUser.email) return alert("Vui lòng đăng nhập để bình luận!");
    const textarea = document.getElementById("txtComment");
    const text = textarea.value.trim();
    if (!text) return;

    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} - ${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;

    const payload = {
        name: currentUser.name, email: currentUser.email, picture: currentUser.picture,
        text: text, timestamp: timeString, timeValue: now.getTime(), isHidden: false
    };

    if (replyingToParentId) {
        db.ref(`tinTucSuKien/${currentViewingPostId}/comments/${replyingToParentId}/replies`).push(payload).then(() => huyTraLoi());
    } else {
        db.ref(`tinTucSuKien/${currentViewingPostId}/comments`).push(payload).then(() => {
            textarea.value = ""; textarea.style.height = '40px';
            setTimeout(() => {
                const cl = document.querySelector(".article-content-wrapper");
                cl.scrollTop = cl.scrollHeight;
            }, 150);
        });
    }
}

function toggleAnBinhLuan(commentId, currentStatus, parentId = null) {
    let path = `tinTucSuKien/${currentViewingPostId}/comments/${commentId}`;
    if (parentId) path = `tinTucSuKien/${currentViewingPostId}/comments/${parentId}/replies/${commentId}`;
    db.ref(path).update({ isHidden: !currentStatus });
}

function xoaBinhLuan(commentId, parentId = null) {
    if(confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
        let path = `tinTucSuKien/${currentViewingPostId}/comments/${commentId}`;
        if (parentId) path = `tinTucSuKien/${currentViewingPostId}/comments/${parentId}/replies/${commentId}`;
        db.ref(path).remove();
    }
}

function capNhatLikeVaComment(id) {
    const post = newsData.find(p => p.id === id);
    if (!post) return;

    const likes = post.likes || {};
    const likeKeys = Object.keys(likes);
    const countLikes = likeKeys.length;
    
    const btnLikePost = document.getElementById("btnLikePost");
    const likeIcon = document.getElementById("likeIcon");
    
    if (currentUser.email && likes[currentUser.email.replace(/\./g, ',')]) {
        likeIcon.className = "fa-solid fa-heart"; btnLikePost.classList.add("liked");
    } else {
        likeIcon.className = "fa-regular fa-heart"; btnLikePost.classList.remove("liked");
    }

    document.getElementById("likeCountText").innerText = countLikes > 0 ? `${countLikes} lượt thích` : `Hãy là người đầu tiên thích`;

    let previewHtml = "";
    let limit = Math.min(countLikes, 3);
    for(let i=0; i<limit; i++) {
        let lData = likes[likeKeys[i]];
        let pic = (typeof lData === 'object' && lData.picture) ? lData.picture : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        previewHtml += `<img src="${pic}" style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid #fff; margin-left: ${i>0 ? '-10px' : '0'}; object-fit: cover;">`;
    }
    document.getElementById("likeAvatarsPreview").innerHTML = previewHtml;

    const commentsObj = post.comments || {};
    const commentsArr = Object.keys(commentsObj).map(k => ({ id: k, ...commentsObj[k] })).sort((a,b) => a.timeValue - b.timeValue);
    
    let totalComments = 0;
    const cl = document.getElementById("commentsList");
    cl.innerHTML = "";

    if (commentsArr.length === 0) {
        cl.innerHTML = `<div style="text-align: center; color: #94a3b8; font-size: 13px; font-style: italic; margin-bottom:10px;">Chưa có bình luận nào. Hãy là người đầu tiên!</div>`;
    } else {
        commentsArr.forEach(c => {
            totalComments++;
            let cText = c.text.replace(/\n/g, '<br>');
            let isHiddenBadge = ""; let actionsHtml = "";

            if (c.isHidden) {
                if (currentUser.role === 'admin') isHiddenBadge = `<span class="badge bg-secondary ms-2" style="font-size: 10px;">Đã ẩn</span>`;
                else cText = `<i style="color: #94a3b8;">Bình luận này đã bị ẩn bởi Quản trị viên.</i>`;
            }

            if (currentUser.email && (!c.isHidden || currentUser.role === 'admin')) {
                actionsHtml += `<button class="btn-cmt-action" onclick="moKhungTraLoi('${c.id}', '${c.name}')">Phản hồi</button>`;
            }
            if (currentUser.role === 'admin') {
                let actionText = c.isHidden ? "Hiện" : "Ẩn";
                actionsHtml += `<button class="btn-cmt-action text-warning" onclick="toggleAnBinhLuan('${c.id}', ${c.isHidden})">${actionText}</button>`;
            }
            if (currentUser.role === 'admin' || (currentUser.email === c.email)) {
                actionsHtml += `<button class="btn-cmt-action text-danger" onclick="xoaBinhLuan('${c.id}')">Xóa</button>`;
            }

            let htmlBuilder = `
                <div style="display: flex; gap: 10px; margin-bottom: ${c.replies ? '10px' : '15px'};">
                    <img src="${c.picture || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                    <div style="flex-grow: 1;">
                        <div class="comment-bubble">
                            <div class="comment-name">${c.name} ${isHiddenBadge}</div>
                            <div class="comment-text">${cText}</div>
                        </div>
                        <div style="margin-top: 4px; margin-left: 12px; display: flex; align-items: center;">
                            <span class="comment-time me-3">${c.timestamp}</span>
                            ${actionsHtml}
                        </div>
                    </div>
                </div>
            `;

            if (c.replies) {
                const repArr = Object.keys(c.replies).map(k => ({ id: k, ...c.replies[k] })).sort((a,b) => a.timeValue - b.timeValue);
                repArr.forEach(r => {
                    totalComments++;
                    let rText = r.text.replace(/\n/g, '<br>');
                    let rHiddenBadge = ""; let rActionsHtml = "";

                    if (r.isHidden) {
                        if (currentUser.role === 'admin') rHiddenBadge = `<span class="badge bg-secondary ms-2" style="font-size: 10px;">Đã ẩn</span>`;
                        else rText = `<i style="color: #94a3b8;">Bình luận này đã bị ẩn.</i>`;
                    }

                    if (currentUser.email && (!r.isHidden || currentUser.role === 'admin')) {
                        rActionsHtml += `<button class="btn-cmt-action" onclick="moKhungTraLoi('${c.id}', '${r.name}')">Phản hồi</button>`;
                    }
                    if (currentUser.role === 'admin') {
                        let actionText = r.isHidden ? "Hiện" : "Ẩn";
                        rActionsHtml += `<button class="btn-cmt-action text-warning" onclick="toggleAnBinhLuan('${r.id}', ${r.isHidden}, '${c.id}')">${actionText}</button>`;
                    }
                    if (currentUser.role === 'admin' || (currentUser.email === r.email)) {
                        rActionsHtml += `<button class="btn-cmt-action text-danger" onclick="xoaBinhLuan('${r.id}', '${c.id}')">Xóa</button>`;
                    }

                    htmlBuilder += `
                        <div style="display: flex; gap: 8px; margin-bottom: 10px; margin-left: 46px;">
                            <img src="${r.picture || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                            <div style="flex-grow: 1;">
                                <div class="comment-bubble" style="background: #e2e8f0;">
                                    <div class="comment-name" style="font-size: 12px;">${r.name} ${rHiddenBadge}</div>
                                    <div class="comment-text" style="font-size: 13.5px;">${rText}</div>
                                </div>
                                <div style="margin-top: 4px; margin-left: 12px; display: flex; align-items: center;">
                                    <span class="comment-time me-3">${r.timestamp}</span>
                                    ${rActionsHtml}
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            cl.innerHTML += htmlBuilder;
        });
    }

    document.getElementById("commentCount").innerText = totalComments;

    if (currentUser.email) {
        document.getElementById("commentInputArea").style.display = "flex";
        document.getElementById("loginToCommentMsg").style.display = "none";
        document.getElementById("myCommentAvatar").src = currentUser.picture;
    } else {
        document.getElementById("commentInputArea").style.display = "none";
        document.getElementById("loginToCommentMsg").style.display = "block";
    }
}

// ================= XEM CHI TIẾT BÀI VIẾT =================
function xemChiTietBaiViet(id) {
    currentViewingPostId = id; 
    huyTraLoi(); 
    
    const item = newsData.find(n => n.id === id);
    if(!item) return;

    document.getElementById("detailNewsTitle").innerText = item.title;
    document.getElementById("detailNewsDate").innerText = item.timestamp;
    
    const imgElement = document.getElementById("detailNewsImg");
    imgElement.src = item.imgUrl || '/img/logo_app.jpg';
    if(!item.imgUrl) { imgElement.style.display = "none"; } 
    else { imgElement.style.display = "block"; }

    const albumWrapper = document.getElementById("detailNewsAlbumWrapper");
    if(item.albumUrl && item.albumUrl.trim() !== "") {
        albumWrapper.style.display = "inline-block";
        document.getElementById("detailNewsAlbumLink").href = item.albumUrl;
    } else {
        albumWrapper.style.display = "none";
    }

    let contentHtml = item.content.replace(/\n/g, '<br>');
    contentHtml = contentHtml.replace(/(?:<br>\s*)+<figure/g, '<figure');
    contentHtml = contentHtml.replace(/<\/figure>\s*(?:<br>\s*)+/g, '</figure>');
    contentHtml = contentHtml.replace(/(?:<br>\s*)+<div class="video-container/g, '<div class="video-container');
    contentHtml = contentHtml.replace(/<\/div>\s*(?:<br>\s*)+/g, '</div>');
    
    document.getElementById("detailNewsContent").innerHTML = contentHtml;
    capNhatLikeVaComment(id);

    document.getElementById("modalXemTin").classList.add("active");
    document.body.style.overflow = "hidden"; 

    setTimeout(() => {
        const allImages = document.querySelectorAll("#detailNewsImg, #detailNewsContent img");
        allImages.forEach(img => {
            img.onclick = function(e) { e.stopPropagation(); moLightbox(this.src); };
        });
    }, 100);
}

function dongModal(id) { 
    document.getElementById(id).classList.remove("active"); 
    if (id === 'modalXemTin') {
        currentViewingPostId = null; 
        document.body.style.overflow = "auto";
    }
}

function moModalDangBai() {
    editingPostId = null; 
    document.getElementById("modalTitleText").innerHTML = `<i class="fa-solid fa-pen-to-square me-2"></i>Tạo Bài Viết Mới`;
    document.getElementById("inputNewsTitle").value = "";
    
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} - ${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
    document.getElementById("inputNewsTime").value = timeString;

    document.getElementById("inputNewsImg").value = "";
    document.getElementById("inputNewsAlbum").value = "";
    document.getElementById("inputNewsContent").value = "";
    document.getElementById("modalDangBai").classList.add("active");
}

function moModalSuaBai(id, event) {
    event.stopPropagation(); 
    const post = newsData.find(p => p.id === id);
    if (!post) return;

    editingPostId = id;
    document.getElementById("modalTitleText").innerHTML = `<i class="fa-solid fa-pen-to-square me-2"></i>Cập Nhật Bài Viết`;
    document.getElementById("inputNewsTitle").value = post.title || "";
    document.getElementById("inputNewsTime").value = post.timestamp || "";
    document.getElementById("inputNewsImg").value = post.imgUrl || "";
    document.getElementById("inputNewsAlbum").value = post.albumUrl || "";
    document.getElementById("inputNewsContent").value = post.content || "";
    document.getElementById("modalDangBai").classList.add("active");
}

function luuBaiViet() {
    const title = document.getElementById("inputNewsTitle").value.trim();
    const timeString = document.getElementById("inputNewsTime").value.trim();
    const imgUrl = document.getElementById("inputNewsImg").value.trim();
    const albumUrl = document.getElementById("inputNewsAlbum").value.trim();
    const content = document.getElementById("inputNewsContent").value.trim();

    if(!title || !content || !timeString) return alert("Vui lòng nhập đầy đủ Tiêu đề, Thời gian hiển thị và Nội dung bài viết!");

    const post = { title, imgUrl, albumUrl, content, timestamp: timeString };

    if (editingPostId) {
        db.ref("tinTucSuKien/" + editingPostId).update(post).then(() => {
            alert("Cập nhật bài viết thành công!"); dongModal('modalDangBai');
        }).catch(err => alert("Lỗi cập nhật: " + err.message));
    } else {
        db.ref("tinTucSuKien").push(post).then(() => {
            alert("Đã đăng bài viết thành công lên hệ thống!"); dongModal('modalDangBai');
        }).catch(err => alert("Lỗi hệ thống: " + err.message));
    }
}

function xoaBaiViet(id, event) {
    event.stopPropagation();
    if(confirm("Cảnh báo: Bạn có chắc chắn muốn xóa bài viết này không? Không thể khôi phục lại được đâu nhé!")) {
        db.ref("tinTucSuKien/" + id).remove().then(() => { alert("Đã xóa bài viết thành công!"); });
    }
}

function moLightbox(src) {
    document.getElementById("lightboxImg").src = src;
    document.getElementById("imageLightbox").classList.add("active");
}

function dongLightbox() { document.getElementById("imageLightbox").classList.remove("active"); }

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

