import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory } from "@/types/AdminTypes/category";
import { CategoryNavigation } from "./navigation";
import { CreateCategoryForm } from "./CategoryForm";

import { getCategories } from "@/app/actions";
import ImageView from "@/components/shared/ImageView";
import { CreateSubcategoryForm } from "./SubCategoryForm";

export default async function CreateCategory() {
  const { data } = await getCategories();
  const categories: ICategory[] = data?.content || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
           Kategori Yönetimi
          </h1>
          <p className="text-muted-foreground mt-2">
           Ana kategori veya alt kategori oluşturun.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kategoriler</CardTitle>
                <CardDescription>
                  Tüm kategorilerin listesi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryNavigation categories={categories} />
              </CardContent>
            </Card>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="category" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="category">Ana Kategori Oluştur</TabsTrigger>
                <TabsTrigger value="subcategory">
                 Alt Kategori Oluştur
                </TabsTrigger>
              </TabsList>

              <TabsContent value="category">
                <CreateCategoryForm />
              </TabsContent>

              <TabsContent value="subcategory">
                <CreateSubcategoryForm categories={categories} />
              </TabsContent>
            </Tabs>

   
          </div>
        </div>
      </div>
    </div>
  );
}
