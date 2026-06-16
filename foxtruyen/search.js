// search.js - Tìm kiếm truyện trên FoxTruyen

async function search(keyword, page) {
    // FoxTruyen dùng URL dạng: /tim-kiem.html?keyword=...&page=...
    const url = `https://foxtruyen2.com/tim-kiem.html?keyword=${encodeURIComponent(keyword)}&page=${page || 1}`;

    const res = await fetch(url);
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
