// detail.js - Lấy thông tin chi tiết của một bộ truyện
// VBook gọi hàm này khi người dùng bấm vào 1 truyện

async function detail(path) {
    // path ví dụ: https://foxtruyen2.com/truyen-tranh/one-piece-36197.html
    const res = await fetch(path);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Lấy tên truyện (thẻ h1)
    const name = doc.querySelector("h1")?.textContent.trim() || "";

    // Lấy ảnh bìa
    const cover = doc.querySelector(".story-detail img, .book-detail img, img[itemprop='image']")
        ?.getAttribute("src") || "";

    // Lấy mô tả / tóm tắt truyện
    const description = doc.querySelector(".story-detail-info-detail-content, .detail-content, [itemprop='description']")
        ?.textContent.trim() || "";

    // Lấy tác giả
    const author = doc.querySelector("[itemprop='author'], .author a")
        ?.textContent.trim() || "";

    // Lấy trạng thái (Còn tiếp / Hoàn thành)
    const status = doc.querySelector(".story-detail-info-detail-status, .status")
        ?.textContent.trim() || "";

    // Lấy danh sách thể loại
    const genres = [];
    doc.querySelectorAll(".story-detail-info-detail-type a, .kind a").forEach(el => {
        genres.push(el.textContent.trim());
    });

    return {
        name,
        cover,
        description,
        author,
        status,
        genres,
    };
}
