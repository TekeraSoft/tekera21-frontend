// app/api/download/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const imageUrl = req.nextUrl.searchParams.get("url");
    if (!imageUrl) {
        return new Response("URL missing", { status: 400 });
    }

    const response = await fetch(imageUrl);
    const blob = await response.arrayBuffer();

    return new Response(blob, {
        headers: {
            "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
            "Content-Disposition": 'attachment; filename="download.jpg"', // burada dosya adını dinamikleştirebilirsin
        },
    });
}
