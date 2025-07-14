"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Play,
  Download,
  Eye,
  Trash2,
  Upload,
  PlusCircle,
  Minus,
  Plus,
} from "lucide-react";
import { deleteFileByUrl, getAllMediaBySellerId } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import ImageView from "./ImageView";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Link } from "@/i18n/navigation";
import { TProductFormData } from "@/types/ProductFormData";
import { useFormContext } from "react-hook-form";
import { SelectIcon } from "@radix-ui/react-select";

interface IData {
  content: string[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export default function MediaGallery({
  sellerId,
  showMediaLibrary,
  variationIndex,
}: {
  sellerId: string;
  showMediaLibrary: boolean;
  variationIndex: number;
}) {
  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [size, setSize] = useState(50);
  const { toast } = useToast();
  const [deletedFileUrl, setDeletedFileUrl] = useState<string | null>(null);

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<TProductFormData>();

  const hasMore = data ? data?.page?.totalPages > data?.page?.number : false;

  const handleDeleteFromGallery = async () => {
    console.log("url", deletedFileUrl);
    if (deletedFileUrl) {
      const { success, message } = await deleteFileByUrl(deletedFileUrl);
      {
        if (success) {
          setMediaFiles((prev) =>
            prev.filter((file) => file !== deletedFileUrl)
          );
          toast({
            title: "Success",
            description: "Dosya silindi.",
            variant: "default",
          });
        } else {
          toast({
            title: "Error",
            description: message || "Dosya silinemedi",
            variant: "destructive",
          });
        }
      }
    } else {
      alert("url yok");
    }
  };

  const handleAddImageUrlToVariant = (newUrl: string) => {
    const currentImages = getValues(`imageUrls.${variationIndex}`) || [];
    setValue(`imageUrls.${variationIndex}`, [...currentImages, newUrl]);
  };

  const handleRemoveImageUrlFromVariant = (removedUrl: string) => {
    const currentImages = getValues(`imageUrls.${variationIndex}`) || [];
    const updatedImages = currentImages.filter((url) => url !== removedUrl);
    setValue(`imageUrls.${variationIndex}`, updatedImages);
  };

  const loadMore = () => {
    if (loading || !hasMore) return;
    getFiles((data?.page.number ?? 0) + 1);
  };

  const handleItemsRendered = ({
    visibleRowStopIndex,
    rowCount,
  }: {
    visibleRowStopIndex: number;
    rowCount: number;
  }) => {
    if (visibleRowStopIndex >= rowCount - 1 && hasMore && !loading) {
      loadMore();
    }
  };

  const getFiles = async (pageCount: number = 0) => {
    setLoading(true);
    const { data, success, message } = await getAllMediaBySellerId(
      sellerId,
      pageCount,
      size
    );

    if (!success) {
      setLoading(false);
      toast({
        title: "Bir hata oluştu",
        description: message || "Medya dosyalarınız getirilemedi.",
      });
      return;
    }

    if (success) {
      setData(data);
      setMediaFiles((prev) => [...prev, ...data.content]);
      setLoading(false);
    }
  };

  const getFileExtension = (url: string): string => {
    const urlParts = url.split(".");
    return urlParts[urlParts.length - 1].toLowerCase();
  };

  const getFileType = (url: string): "image" | "video" | "other" => {
    const ext = getFileExtension(url);
    if (
      ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"].includes(ext)
    )
      return "image";
    if (["mp4", "webm", "ogg", "avi", "mov", "wmv", "flv", "mkv"].includes(ext))
      return "video";
    return "other";
  };

  const groupedMedia = useMemo(() => {
    const images = mediaFiles.filter((url) => getFileType(url) === "image");
    const videos = mediaFiles.filter((url) => getFileType(url) === "video");
    return { images, videos };
  }, [mediaFiles]);

  useEffect(() => {
    if (sellerId.length && mediaFiles.length === 0 && showMediaLibrary) {
      getFiles(0);
    }
  }, [sellerId, showMediaLibrary]);

  const MediaCard = ({
    file,
    type,
  }: {
    file: string;
    type: "image" | "video";
  }) => (
    <Card className="group relative overflow-hidden hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-36 w-36">
          {type === "image" ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <ImageView
                    imageInfo={{ name: file, url: file }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center">
                    {watch(`imageUrls.${variationIndex}`)?.includes(file) ? (
                      <Minus
                        onClick={() => handleRemoveImageUrlFromVariant(file)}
                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100"
                      />
                    ) : (
                      <Plus
                        onClick={() => handleAddImageUrlToVariant(file)}
                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100"
                      />
                    )}
                  </div>
                </div>
              </DialogTrigger>
            </Dialog>
          ) : (
            <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
              <video
                src={file}
                className="w-full h-full object-cover"
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <Badge className="absolute top-2 left-2 bg-red-500">
                {getFileExtension(file).toUpperCase()}
              </Badge>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white opacity-0 group-hover:opacity-100">
            <p className="text-sm truncate">{file}</p>
          </div>
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100">
            <Link
              href={`/api/download?url=${encodeURIComponent(
                `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${file}`
              )}`}
              download={true}
            >
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Download className="w-4 h-4" />
              </Button>
            </Link>

            <Button
              size="sm"
              variant="destructive"
              className="h-8 w-8 p-0"
              onClick={() => setDeletedFileUrl(file)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderGrid = useCallback(
    (type: "image" | "video") => {
      const data = type === "image" ? groupedMedia.images : groupedMedia.videos;
      const columnCount = 5;
      const rowCount = Math.ceil(data?.length / columnCount);

      return (
        <div className="h-[400px]">
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                columnCount={columnCount}
                columnWidth={144}
                height={height}
                rowCount={rowCount}
                rowHeight={144}
                width={width}
                onItemsRendered={({
                  visibleRowStartIndex,
                  visibleRowStopIndex,
                }) => {
                  handleItemsRendered({ visibleRowStopIndex, rowCount });
                }}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const index = rowIndex * columnCount + columnIndex;
                  const file = data[index];
                  if (!file) return null;
                  return (
                    <div style={style} key={file} className="p-1">
                      <MediaCard file={file} type={type} />
                    </div>
                  );
                }}
              </Grid>
            )}
          </AutoSizer>
        </div>
      );
    },
    [groupedMedia]
  );

  return (
    <>
      <AlertDialog
        open={!!deletedFileUrl?.length}
        onOpenChange={() => setDeletedFileUrl(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Bu dosya kalıcı olarak silinecek
              bağlantılı tüm ürünlerden de bu dosya kaldırılacak.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFromGallery}
              className="bg-red-600 hover:bg-red-700"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Medya Galeri</DialogTitle>
        </DialogHeader>

        <div className="w-full mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Medya Galerisi</h1>
              <p className="text-muted-foreground">
                {data?.page.totalElements} dosyadan {mediaFiles.length} yüklendi
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Yeni Dosya Yükle
            </Button>
          </div>

          <Tabs defaultValue="images" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="images" className="flex items-center gap-2">
                Resimler
                <Badge variant="square">{groupedMedia.images.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                Videolar
                <Badge variant="square">{groupedMedia.videos.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="mt-6">
              {renderGrid("image")}
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              {renderGrid("video")}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </>
  );
}
