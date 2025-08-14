export const makeCdnUrl = (url: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "";
    if (url.startsWith("http")) {
        return url;
    }
    if (url.startsWith("/")) {
        return baseUrl + url;
    } else {
        return baseUrl + "/" + url;
    }
};