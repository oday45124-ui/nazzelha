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

    if (url === "") {
        showResult(
            "⚠️ أدخل الرابط أولًا",
            "ضع رابط الملف في المربع ثم اضغط تحليل الرابط."
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

    } catch (error) {
        showResult(
            "❌ الرابط غير صحيح",
            "تأكد من أن الرابط كامل ويبدأ بـ https://"
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
                download
                target="_blank"
                rel="noopener noreferrer"
                class="download-button"
            >
                ⬇️ تنزيل الملف
            </a>
        </div>

        <p class="small-text">
            يعمل هذا الزر مع الروابط المباشرة للملفات التي يسمح صاحبها بتنزيلها.
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
}/* زر تنزيل الملف */
.download-action {
    margin-top: 20px;
    text-align: center;
}

.download-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    min-width: 190px;
    background: linear-gradient(135deg, #00e676, #00bfa5);
    color: #06110d;
    text-decoration: none;
    font-size: 17px;
    font-weight: bold;
    border-radius: 14px;
    box-shadow: 0 8px 25px rgba(0, 230, 118, 0.25);
    transition: 0.25s ease;
}

.download-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 230, 118, 0.4);
}

.download-button:active {
    transform: scale(0.96);
        }
