// chap.js - Lấy các ảnh trong một chương để VBook hiển thị
// Đây là file quan trọng nhất với truyện tranh

async function chap(path) {
    // path ví dụ: https://foxtruyen2.com/truyen-tranh/one-piece-36197-chap-1.html
    const res = await fetch(path);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const images = [];

    // FoxTruyen hiển thị ảnh chương trong div có id hoặc class đặc biệt
    // Các ảnh thường nằm trong: #chapter-content, .chapter-content, .reading-detail
    const imgEls = doc.querySelectorAll(
        "#chapter-content img, .chapter-content img, .reading-detail img, [class*='chapter'] img"
    );

    imgEls.forEach(img => {
        // Lấy src ảnh — đôi khi ảnh lazy-load dùng data-src thay vì src
        const src = img.getAttribute("src")
            || img.getAttribute("data-src")
            || img.getAttribute("data-lazy")
            || "";

        // Chỉ thêm nếu src là một URL hợp lệ (bắt đầu bằng http)
        if (src && src.startsWith("http")) {
            images.push({ url: src });
        }
    });

    return images; // VBook nhận mảng ảnh này và hiển thị từng ảnh theo thứ tự
}
