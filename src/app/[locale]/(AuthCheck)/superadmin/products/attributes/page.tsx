"use client";

import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type AttributeValue = {
  id: string;
  value: string;
};

type Attribute = {
  id: string;
  name: string;
  values: AttributeValue[];
};

type AttributeCategory = {
  id: string;
  name: string;
  attributes: Attribute[];
};

export default function ProductAttributesAdmin() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<AttributeCategory[]>([
    {
      id: "1",
      name: "Teknik Özellikler",
      attributes: [
        {
          id: "1-1",
          name: "İşlemci",
          values: [
            { id: "1-1-1", value: "Intel i5" },
            { id: "1-1-2", value: "Intel i7" },
            { id: "1-1-3", value: "AMD Ryzen 5" },
          ],
        },
        {
          id: "1-2",
          name: "RAM",
          values: [
            { id: "1-2-1", value: "8GB" },
            { id: "1-2-2", value: "16GB" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Fiziksel Özellikler",
      attributes: [
        {
          id: "2-1",
          name: "Renk",
          values: [
            { id: "2-1-1", value: "Siyah" },
            { id: "2-1-2", value: "Beyaz" },
            { id: "2-1-3", value: "Gümüş" },
          ],
        },
      ],
    },
  ]);

  // Yeni kategori ekleme
  const addCategory = () => {
    const newId = Date.now().toString();
    setCategories([
      ...categories,
      {
        id: newId,
        name: "",
        attributes: [],
      },
    ]);
  };

  // Kategori silme
  const removeCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  // Kategori adını güncelleme
  const updateCategoryName = (categoryId: string, name: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId ? { ...category, name } : category
      )
    );
  };

  // Özellik ekleme
  const addAttribute = (categoryId: string) => {
    const newId = `${categoryId}-${Date.now()}`;
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              attributes: [
                ...category.attributes,
                { id: newId, name: "", values: [] },
              ],
            }
          : category
      )
    );
  };

  // Özellik silme
  const removeAttribute = (categoryId: string, attributeId: string) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              attributes: category.attributes.filter(
                (attr) => attr.id !== attributeId
              ),
            }
          : category
      )
    );
  };

  // Özellik adını güncelleme
  const updateAttributeName = (
    categoryId: string,
    attributeId: string,
    name: string
  ) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              attributes: category.attributes.map((attr) =>
                attr.id === attributeId ? { ...attr, name } : attr
              ),
            }
          : category
      )
    );
  };

  // Değer ekleme
  const addAttributeValue = (categoryId: string, attributeId: string) => {
    const newId = `${attributeId}-${Date.now()}`;
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              attributes: category.attributes.map((attr) =>
                attr.id === attributeId
                  ? {
                      ...attr,
                      values: [...attr.values, { id: newId, value: "" }],
                    }
                  : attr
              ),
            }
          : category
      )
    );
  };

  // Değer silme
  const removeAttributeValue = (
    categoryId: string,
    attributeId: string,
    valueId: string
  ) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              attributes: category.attributes.map((attr) =>
                attr.id === attributeId
                  ? {
                      ...attr,
                      values: attr.values.filter((val) => val.id !== valueId),
                    }
                  : attr
              ),
            }
          : category
      )
    );
  };

  // Değer güncelleme
  const updateAttributeValue = (
    categoryId: string,
    attributeId: string,
    valueId: string,
    value: string
  ) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              attributes: category.attributes.map((attr) =>
                attr.id === attributeId
                  ? {
                      ...attr,
                      values: attr.values.map((val) =>
                        val.id === valueId ? { ...val, value } : val
                      ),
                    }
                  : attr
              ),
            }
          : category
      )
    );
  };

  // Kaydetme işlemi
  const saveAttributes = () => {
    // Burada API'ye kaydetme işlemi yapılabilir
    toast({
      title: "Öznitelikler kaydedildi",
      description: `${categories.length} kategori ve öznitelikleri başarıyla kaydedildi.`,
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Ürün Öznitelikleri Yönetimi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ürün Öznitelikleri</CardTitle>
              <CardDescription>
                Ürünleriniz için kategori ve özellik şeklinde öznitelikler
                tanımlayın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Accordion type="multiple" className="w-full">
                  {categories.map((category) => (
                    <AccordionItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        <AccordionTrigger className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between w-full gap-2">
                            <Input
                              placeholder="Kategori Adı"
                              value={category.name}
                              onChange={(e) =>
                                updateCategoryName(category.id, e.target.value)
                              }
                              onClick={(e) => e.stopPropagation()}
                              className="lg:w-64"
                            />
                            <Badge className="text-secondary">
                              {category.attributes.length} özellik
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCategory(category.id);
                          }}
                          className="mr-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <AccordionContent>
                        <div className="pl-4 space-y-4 mt-2">
                          {category.attributes.map((attribute) => (
                            <div
                              key={attribute.id}
                              className="border rounded-md p-4"
                            >
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1">
                                  <Label htmlFor={`attr-${attribute.id}`}>
                                    Özellik Adı
                                  </Label>
                                  <Input
                                    id={`attr-${attribute.id}`}
                                    placeholder="Örn: Renk, Boyut, Malzeme"
                                    value={attribute.name}
                                    onChange={(e) =>
                                      updateAttributeName(
                                        category.id,
                                        attribute.id,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() =>
                                    removeAttribute(category.id, attribute.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <Label>Olası Değerler</Label>
                                {attribute.values.map((val) => (
                                  <div
                                    key={val.id}
                                    className="flex items-center gap-4"
                                  >
                                    <Input
                                      placeholder="Değer"
                                      value={val.value}
                                      onChange={(e) =>
                                        updateAttributeValue(
                                          category.id,
                                          attribute.id,
                                          val.id,
                                          e.target.value
                                        )
                                      }
                                      className="flex-1"
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() =>
                                        removeAttributeValue(
                                          category.id,
                                          attribute.id,
                                          val.id
                                        )
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  addAttributeValue(category.id, attribute.id)
                                }
                                className="mt-2"
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Değer Ekle
                              </Button>
                            </div>
                          ))}

                          <Button
                            variant="outline"
                            onClick={() => addAttribute(category.id)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Özellik Ekle
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={addCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Kategori Ekle
              </Button>
              <Button onClick={saveAttributes}>
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Önizleme</CardTitle>
              <CardDescription>
                Tanımladığınız özniteliklerin önizlemesi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div key={category.id} className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">
                        {category.name || "İsimsiz Kategori"}
                      </h3>
                      <Separator className="my-2" />

                      {category.attributes.length > 0 ? (
                        <div className="space-y-3">
                          {category.attributes.map((attribute) => (
                            <div key={attribute.id}>
                              <span className="font-medium text-sm">
                                {attribute.name || "İsimsiz Özellik"}:{" "}
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {attribute.values.map((val, i) => (
                                  <Badge
                                    key={val.id}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {val.value || "Değer " + (i + 1)}
                                  </Badge>
                                ))}
                                {attribute.values.length === 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    Henüz değer eklenmedi
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Bu kategoride henüz özellik yok.
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Henüz kategori eklenmedi.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
