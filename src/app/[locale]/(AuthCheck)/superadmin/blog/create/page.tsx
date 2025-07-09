"use client";

import TopBar from "@/components/superadmin/TopBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const CreateBlogPage = () => {
  const blogFormSchema = z.object({
    title: z
      .string()
      .min(1, "Başlık zorunludur")
      .min(5, "Başlık en az 5 karakter olmalıdır")
      .max(100, "Başlık en fazla 100 karakter olabilir"),
    content: z
      .string()
      .min(1, "İçerik zorunludur")
      .min(50, "İçerik en az 50 karakter olmalıdır"),
    excerpt: z
      .string()
      .max(300, "Özet en fazla 300 karakter olabilir")
      .optional(),
    author: z
      .string()
      .min(1, "Yazar adı zorunludur")
      .min(2, "Yazar adı en az 2 karakter olmalıdır")
      .max(50, "Yazar adı en fazla 50 karakter olabilir"),
    tags: z
      .array(z.object({ value: z.string().min(1) }))
      .max(10, "En fazla 10 etiket ekleyebilirsiniz")
      .optional(),
  });

  type BlogFormData = z.infer<typeof blogFormSchema>;
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      author: "",
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const addTag = () => {
    const newTagInput = document.getElementById("new-tag") as HTMLInputElement;
    const newTagValue = newTagInput?.value.trim();

    if (newTagValue && !fields.some((field) => field.value === newTagValue)) {
      append({ value: newTagValue });
      newTagInput.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      //   const post = blogStore.createPost({
      //     title: data.title,
      //     content: data.content,
      //     excerpt: data.excerpt || data.content.substring(0, 150) + "...",
      //     author: data.author,
      //     tags: data.tags?.map((tag) => tag.value) || [],
      //   });

      toast({
        title: "Başarılı!",
        description: "Blog yazısı başarıyla oluşturuldu.",
      });

      form.reset();
      router.push("/");
    } catch (error) {
      toast({
        title: "Hata",
        description: "Blog yazısı oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Yeni Blog Yazısı Oluştur</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Blog yazısının başlığını girin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Yazar *</FormLabel>
                      <FormControl>
                        <Input placeholder="Yazar adını girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Özet</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Blog yazısının kısa özetini girin (boş bırakılırsa otomatik oluşturulur)"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Boş bırakılırsa içeriğin ilk 150 karakteri kullanılır
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İçerik *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Blog yazısının içeriğini girin (Markdown desteklenir)"
                        rows={15}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Markdown formatını kullanabilirsiniz (# başlık, **kalın**,
                      *italik*, vb.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label>Etiketler</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="new-tag"
                    placeholder="Etiket ekle"
                    onKeyPress={handleKeyPress}
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {fields.map((field, index) => (
                    <Badge
                      key={field.id}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {field.value}
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.tags && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.tags.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting
                    ? "Oluşturuluyor..."
                    : "Blog Yazısını Yayınla"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  İptal
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => form.reset()}
                >
                  Formu Temizle
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateBlogPage;
