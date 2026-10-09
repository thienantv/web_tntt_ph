const GOOGLE_CLIENT_ID = "262126423881-einke9pok3r8at0d9hrnli04klf68s9q.apps.googleusercontent.com";
const ADMIN_EMAILS = ["htam00521@gmail.com", "yinsnhuw29@gmail.com"]; 

// Khởi tạo nút Google khi load trang
window.onload = function() {
    if (window.google) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleBtnContainer"),
            { theme: "outline", size: "large", shape: "pill", width: "100%" }
        );
    }
};

// Hàm xử lý sau khi Google trả dữ liệu về
function handleCredentialResponse(response) {
    try {
        const payload = jwt_decode(response.credential);
        const email = payload.email.toLowerCase().trim();
        
        let role = "viewer";
        if (ADMIN_EMAILS.includes(email)) role = "admin";

        // Lưu thông tin người dùng vào Local Storage
        const currentUser = { name: payload.name, email: email, picture: payload.picture, role: role };
        localStorage.setItem("ht_user_session", JSON.stringify(currentUser));
        
        alert(`Đăng nhập thành công! Chào mừng ${payload.name}`);
        // Chuyển hướng về trang chủ
        window.location.href = "trangchu.html";
    } catch (e) { 
        console.error(e); 
        alert("Lỗi đăng nhập!");
    }
}

// Xử lý ẩn/hiện mật khẩu
function anHienMatKhau() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// Chặn đăng nhập form cứng (vì chưa nối DB email/pass)
function xuLyDangNhap(event) {
    event.preventDefault(); 
    alert("Tính năng Đăng nhập bằng tên tài khoản đang nâng cấp. Vui lòng đăng nhập bằng Google!");
}