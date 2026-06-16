// home.js - Lấy danh sách truyện mới cập nhật từ trang chủ FoxTruyen

async function home(page) {
    // Tạo URL trang: trang 1 = trang chủ, trang 2+ = /truyen-moi-cap-nhat/trang-X.html
    const url = page <= 1
        ? "https://foxtruyen2.com/truyen-moi-cap-nhat.html"
        : `https://foxtruyen2.com/truyen-moi-cap-nhat/trang-${page}.html`;

    // Tải HTML của trang đó về
    const res = await fetch(url);
    const html = await res.text();

    // Dùng DOMParser để đọc HTML như trình duyệt
    const doc = new DOMParser().parseFromString(html, "text/html");

    const items = [];

    // Tìm tất cả các khung truyện trên trang
    // Dựa trên cấu trúc HTML của FoxTruyen: mỗi truyện là 1 thẻ <div class="item">
    const cards = doc.querySelectorAll(".item");

    cards.forEach(card => {
        // Lấy thẻ <a> chứa link truyện
        const link = card.querySelector("a");
        // Lấy thẻ <img> chứa ảnh bìa
        const img = card.querySelector("img");
        // Lấy tên truyện từ thẻ <h3> hoặc <p>
        const title = card.querySelector("h3, .title, p");

        // Chỉ thêm vào danh sách nếu có đủ thông tin
        if (link && title) {
            items.push({
                name: title.textContent.trim(),       // Tên truyện
                path: link.getAttribute("href"),       // Link đến trang chi tiết
                cover: img ? img.getAttribute("src") : "", // Ảnh bìa
            });
        }
    });

    return items; // Trả về danh sách cho VBook hiển thị
}
