export const downloadFile = async (documentUrl: string, documentName: string) => {
    const fileUrl =
        process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
        (documentUrl.startsWith("/") ? documentUrl : `/${documentUrl}`);

    try {
        const response = await fetch(fileUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
            },
        });

        if (!response.ok) {
            throw new Error("Dosya indirilemedi.");
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${documentName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (err) {

        throw new Error("Dosya indirilemedi.");
    }
};