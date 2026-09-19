const button = document.getElementById("analyzeBtn");
const input = document.getElementById("videoUrl");
const result = document.getElementById("result");

button.addEventListener("click", analyzeUrl);

function analyzeUrl() {
    const url = input.value.trim();

    if (url === "") {
        showResult(
            "⚠️ أدخل الرابط أولًا",
            "ضع رابط الملف أو الفيديو في المربع ثم اضغط تحليل الرابط."
        );
        return;
    }

    try {
        const parsedUrl = new URL(url);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            throw new Error("Invalid protocol");
        }

    } catch (error) {
        showResult(
            "❌ الرابط غير صحيح",
            "تأكد من نسخ رابط كامل يبدأ بـ https://"
        );
        return;
    }

    showResult(
        "✅ تم تحليل الرابط",
        `
        <p>الرابط صالح من ناحية الصيغة.</p>
        <p>
        في المرحلة القادمة سنربط الموقع بخادم حقيقي
        لمعالجة الملفات المسموح بتنزيلها.
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