// genre.js - Lấy danh sách thể loại và truyện theo thể loại

// Hàm này trả về danh sách TẤT CẢ thể loại để VBook hiển thị menu
async function getGenres() {
    return [
        { name: "Action",       path: "https://foxtruyen2.com/the-loai/action-37.html" },
        { name: "Adventure",    path: "https://foxtruyen2.com/the-loai/adventure-38.html" },
        { name: "Comedy",       path: "https://foxtruyen2.com/the-loai/comedy-41.html" },
        { name: "Drama",        path: "https://foxtruyen2.com/the-loai/drama-45.html" },
        { name: "Fantasy",      path: "https://foxtruyen2.com/the-loai/fantasy-46.html" },
        { name: "Horror",       path: "https://foxtruyen2.com/the-loai/horror-49.html" },
        { name: "Huyền Huyễn",  path: "https://foxtruyen2.com/the-loai/huyen-huyen-50.html" },
        { name: "Isekai",       path: "https://foxtruyen2.com/the-loai/isekai-51.html" },
        { name: "Manga",        path: "https://foxtruyen2.com/the-loai/manga-81.html" },
        { name: "Manhua",       path: "https://foxtruyen2.com/the-loai/manhua-54.html" },
        { name: "Manhwa",       path: "https://foxtruyen2.com/the-loai/manhwa-55.html" },
        { name: "Ngôn Tình",    path: "https://foxtruyen2.com/the-loai/ngon-tinh-58.html" },
        { name: "Romance",      path: "https://foxtruyen2.com/the-loai/romance-61.html" },
        { name: "Shounen",      path: "https://foxtruyen2.com/the-loai/shounen-67.html" },
        { name: "Xuyên Không",  path: "https://foxtruyen2.com/the-loai/xuyen-khong-75.html" },
    ];
}

// Hàm này lấy truyện trong 1 thể loại cụ thể theo trang
async function genre(path, page) {
    // Nếu là trang 2+, thêm /trang-X.html vào URL thể loại
    const pageUrl = page <= 1
        ? path
        : path.replace(".html", "") + `/trang-${page}.html`;

    const res = await fetch(pageUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const items = [];
    const cards = doc.querySelectorAll(".item");

    cards.forEach(card => {
        const link = card.querySelector("a");
        const img = card.querySelector("img");
        const title = card.querySelector("h3, .title, p");

        if (link && title) {
            items.push({
                name: title.textContent.trim(),
                path: link.getAttribute("href"),
                cover: img ? img.getAttribute("src") : "",
            });
        }
    });

    return items;
}
