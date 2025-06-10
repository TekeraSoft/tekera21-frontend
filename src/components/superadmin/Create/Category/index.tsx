import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategoryData } from "../../../../../types/AdminTypes/category";
import { CategoryNavigation } from "./navigation";
import { CreateCategoryForm } from "./CategoryForm";
import { CreateSubcategoryForm } from "./SubCategoryForm";
import { getCategories } from "@/app/actions";

export default async function CreateCategory() {
  const data: ICategoryData = await getCategories();
  const categories = data?.content || [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Category Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage categories with images using server-side actions
            and FormData.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
                <CardDescription>
                  Browse through your categories and subcategories
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
                <TabsTrigger value="category">Create Category</TabsTrigger>
                <TabsTrigger value="subcategory">
                  Create Subcategory
                </TabsTrigger>
              </TabsList>

              <TabsContent value="category">
                <CreateCategoryForm />
              </TabsContent>

              <TabsContent value="subcategory">
                <CreateSubcategoryForm categories={categories} />
              </TabsContent>
            </Tabs>

            {/* Categories Overview */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Categories Overview</CardTitle>
                <CardDescription>
                  Current categories and their subcategories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories?.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        {category.image && (
                          <img
                            src={category.image || "/placeholder.svg"}
                            alt=""
                            className="h-8 w-8 rounded object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.subCategories?.length} subcategories
                          </p>
                        </div>
                      </div>
                      {category.subCategories?.length > 0 && (
                        <div className="ml-11 space-y-1">
                          {category?.subCategories?.map((sub) => (
                            <div
                              key={sub.id}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              {sub.image && (
                                <img
                                  src={sub.image || "/placeholder.svg"}
                                  alt=""
                                  className="h-4 w-4 rounded object-cover"
                                />
                              )}
                              <span>{sub.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
