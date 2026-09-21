const button = document.getElementById("analyzeBtn");
const input = document.getElementById("videoUrl");
const result = document.getElementById("result");

const workerUrl =
    "https://nazzelha-download.oday45124.workers.dev";

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
            "<p>ضع رابط الملف ثم اضغط تحليل الرابط.</p>"
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
            throw new Error();
        }
    } catch {
        showResult(
            "❌ الرابط غير صحيح",
            "<p>تأكد أن الرابط يبدأ بـ https://</p>"
        );
        return;
    }

    const downloadUrl =
        workerUrl + "/?url=" + encodeURIComponent(parsedUrl.href);

    showResult(
        "✅ الرابط جاهز",
        `
        <p>تم التحقق من الرابط بنجاح.</p>

        <div class="download-action">
            <a
                href="${downloadUrl}"
                class="download-button"
                target="_blank"
                rel="noopener noreferrer"
            >
                ⬇️ تنزيل الملف
            </a>
        </div>

        <p class="small-text">
            استخدم فقط الملفات والروابط التي تملك حق تنزيلها.
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
