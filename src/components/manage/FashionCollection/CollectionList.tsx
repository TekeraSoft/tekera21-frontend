"use client";

import { useState } from "react";
import { Search, Filter, Grid, List, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IFashionCollection, IFashionCollectionData } from "@/types/Collection";
import ImageView from "@/components/shared/ImageView";
import { Link } from "@/i18n/navigation";
import { useToast } from "@/hooks/use-toast";
import { deleteCollectionById } from "@/app/actions";

export default function CollectionList({
  collectionsData,
}: {
  collectionsData: IFashionCollectionData;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<IFashionCollection | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const filteredCollections = collectionsData.content.filter((collection) => {
    const matchesSearch =
      collection.collectionName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && collection.isActive) ||
      (selectedFilter === "inactive" && !collection.isActive);

    return matchesSearch && matchesFilter;
  });

  const { toast } = useToast();

  const handleDelete = async () => {
    if (!selectedCollection) {
      toast({
        title: "Error",
        description: "Koleksiyon seçilmedi.",
        variant: "default",
      });
      return;
    }
    const { success } = await deleteCollectionById(selectedCollection.id);

    if (success) {
      setShowDeleteDialog(false);
      toast({
        title: "Success",
        description: "Koleksiyon silindi",
        variant: "default",
      });
      setSelectedCollection(null);
    } else {
      toast({
        title: "Hata!",
        description: "Koleksiyon silinemedi",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Koleksiyonlar</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Koleksiyon ara"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                Tüm koleksiyonlar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("active")}>
                Açık Koleksiyonlar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedFilter("inactive")}>
                Kapalı koleksiyonlar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Toplam {collectionsData.content?.length} adet koleksiyondan{" "}
          {filteredCollections?.length} adeti gösteriliyor
        </p>
      </div>

      {/* Collections Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }
      >
        {filteredCollections.map((collection) => (
          <Card
            key={collection.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className={viewMode === "list" ? "flex" : ""}>
              <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                <div className="relative aspect-video overflow-hidden">
                  <ImageView
                    imageInfo={{
                      name: collection.collectionName,
                      url: collection.image,
                    }}
                    className="object-cover  w-full transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={collection.isActive ? "default" : "secondary"}
                    >
                      {collection.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1">
                        {collection.collectionName}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {collection.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ürün adeti</span>
                      <Badge variant="outline">
                        {collection.products?.length} ürün
                      </Badge>
                    </div>

                    {/* Product Preview */}
                    {collection.products?.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                          Koleksiyon ürünleri:
                        </h4>
                        <div className="space-y-1">
                          {collection.products?.slice(0, 3).map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="truncate">{product.name}</span>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-xs">
                                  {product.productType}
                                </Badge>
                                <span className="text-muted-foreground">
                                  ★ {product.rate}
                                </span>
                              </div>
                            </div>
                          ))}
                          {collection.products?.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{collection.products?.length - 3} more products
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1">
                        <Link href={`/manage/collections/${collection.id}`}>
                          Koleksiyonu düzenle
                        </Link>
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCollection(collection);
                          setShowDeleteDialog(true);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Trash className="text-red-400" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCollections?.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Koleksiyon bulunamadı</h3>
          <p className="text-muted-foreground mb-4">
            Filtreleme ayarlarını gözden geçirin
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
          >
            Filtreleri temizle
          </Button>
        </div>
      )}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz.{" "}
              {selectedCollection?.collectionName || "Bu koleksiyon"} kalıcı
              olarak silinecek ve tüm veriler kaybolacak.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          disabled={collectionsData.page.number === 0}
          variant="outline"
          size="sm"
        >
          <Link href={`?page=${collectionsData.page.number - 1}&pagesize=8`}>
            Previous
          </Link>
        </Button>
        <Button
          disabled={
            collectionsData.page.number + 1 >= collectionsData.page.totalPages
          }
          variant="outline"
          size="sm"
        >
          <Link href={`?page=${collectionsData.page.number + 1}&pagesize=8`}>
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
}
