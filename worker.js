export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    const requestUrl = new URL(request.url);
    const target = requestUrl.searchParams.get("url");

    if (!target) {
      return new Response(
        JSON.stringify({
          error: "ضع رابط الملف في ?url="
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...corsHeaders
          }
        }
      );
    }

    let targetUrl;

    try {
      targetUrl = new URL(target);
    } catch {
      return new Response(
        JSON.stringify({
          error: "الرابط غير صحيح"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...corsHeaders
          }
        }
      );
    }

    if (!["http:", "https:"].includes(targetUrl.protocol)) {
      return new Response(
        JSON.stringify({
          error: "نوع الرابط غير مسموح"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...corsHeaders
          }
        }
      );
    }

    try {
      const response = await fetch(targetUrl.toString(), {
        method: "GET",
        redirect: "follow"
      });

      if (!response.ok) {
        return new Response(
          JSON.stringify({
            error: "تعذر الوصول إلى الملف"
          }),
          {
            status: 502,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              ...corsHeaders
            }
          }
        );
      }

      const headers = new Headers(response.headers);

      headers.set(
        "Content-Disposition",
        'attachment; filename="nazzelha-download"'
      );

      headers.set(
        "Access-Control-Allow-Origin",
        "*"
      );

      return new Response(response.body, {
        status: response.status,
        headers
      });

    } catch {
      return new Response(
        JSON.stringify({
          error: "حدث خطأ أثناء جلب الملف"
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...corsHeaders
          }
        }
      );
    }
  }
};
