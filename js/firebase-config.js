// ================= CẤU HÌNH FIREBASE DÙNG CHUNG =================
const firebaseConfig = {
    apiKey: "AIzaSyC0bD7rkP2C1NS_pKanobfZN23Y3-1WznI",
    authDomain: "phantruchuynhtruong.firebaseapp.com",
    databaseURL: "https://phantruchuynhtruong-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "phantruchuynhtruong",
    storageBucket: "phantruchuynhtruong.firebasestorage.app",
    messagingSenderId: "105589587705",
    appId: "1:105589587705:web:e5673f9dad38c130b56c28",
    measurementId: "G-YENZE6ZNSW"
};

// Kiểm tra nếu ứng dụng chưa được khởi tạo thì mới khởi tạo
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Xuất biến db ra toàn cục (global) để các file JS khác có thể sử dụng
const db = firebase.database();