// toc.js - Lấy danh sách tất cả chương của một bộ truyện
// "toc" = Table of Contents = Mục lục

async function toc(path) {
    const res = await fetch(path);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const chapters = [];

    // Tìm tất cả các link chương trong trang chi tiết
    // FoxTruyen liệt kê chương dạng <li><a href="...chap-X.html">Chương X</a></li>
    const chapLinks = doc.querySelectorAll(".story-item a, .list-chapter a, [class*='chapter'] a");

    chapLinks.forEach(link => {
        const href = link.getAttribute("href");
        const name = link.textContent.trim();

        // Chỉ lấy những link thực sự dẫn đến chương (có "chap-" trong URL)
        if (href && href.includes("chap-") && name) {
            chapters.push({
                name: name,   // Tên hiển thị, vd: "Chương 1"
                path: href,   // Link đến trang đọc chương đó
            });
        }
    });

    // Đảo ngược để chương mới nhất lên đầu (VBook thường thích thứ tự mới→cũ)
    return chapters.reverse();
}
