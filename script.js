const button = document.getElementById("analyzeBtn");
const input = document.getElementById("videoUrl");
const result = document.getElementById("result");

button.addEventListener("click", analyzeUrl);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        analyzeUrl();
    }
});

function analyzeUrl() {
    const url = input.value.trim();

    if (!url) {
        showResult(
            "⚠️ أدخل الرابط أولًا",
            "<p>ضع رابط الملف في المربع ثم اضغط تحليل الرابط.</p>"
        );
        return;
    }

    let parsedUrl;

    try {
        parsedUrl = new URL(url);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            throw new Error("Invalid protocol");
        }

    } catch {
        showResult(
            "❌ الرابط غير صحيح",
            "<p>تأكد من أن الرابط يبدأ بـ https://</p>"
        );
        return;
    }

    showResult(
        "✅ تم تحليل الرابط",
        `
        <p>تم التعرف على الرابط بنجاح.</p>

        <div class="download-action">
            <a
                href="${escapeHtml(parsedUrl.href)}"
                target="_blank"
                rel="noopener noreferrer"
                class="download-button"
            >
                ⬇️ فتح الملف
            </a>
        </div>

        <p class="small-text">
            هذا يعمل مع الروابط المباشرة للملفات التي يسمح صاحبها بتنزيلها.
        </p>
        `
    );
}

function showResult(title, message) {
    result.classList.remove("hidden");

    result.innerHTML = `
        <h3>${title}</h3>
        ${message}
    `;

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
