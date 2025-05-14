"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SellerUserRoleSelector } from "./SellerUserRoleSelector";

// Form şeması
const formSchema = z.object({
  roles: z.array(z.string()).min(1, { message: "En az bir rol seçilmelidir" }),
});

type FormValues = z.infer<typeof formSchema>;

interface UserEditDialogProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedUser: any) => void;
}

export function SellerUserEditDialog({
  user,
  open,
  onOpenChange,
  onSave,
}: UserEditDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: user?.roles || [],
    },
  });

  // Kullanıcı değiştiğinde form değerlerini güncelle
  useEffect(() => {
    if (user) {
      form.reset({
        roles: user.roles,
      });
    }
  }, [user, form]);

  const onSubmit = (data: FormValues) => {
    // Kullanıcıyı güncelle
    const updatedUser = {
      ...user,
      roles: data.roles,
    };

    onSave(updatedUser);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Kullanıcı Rollerini Düzenle</DialogTitle>
          <DialogDescription>
            {user?.name} kullanıcısının rollerini düzenleyin.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <div className="font-medium">Kullanıcı Bilgileri</div>
              <div className="text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">İsim:</span> {user?.name}
                </div>
                <div>
                  <span className="font-medium">E-posta:</span> {user?.email}
                </div>
                <div>
                  <span className="font-medium">Telefon:</span> {user?.phone}
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roller</FormLabel>
                  <FormControl>
                    <SellerUserRoleSelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                İptal
              </Button>
              <Button type="submit">Değişiklikleri Kaydet</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
